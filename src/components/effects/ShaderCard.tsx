"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface ShaderCardProps {
  color?: string;
  blur?: number;
  opacity?: number;
  scale?: number;
  speed?: number;
  branchIntensity?: number;
  verticalExtent?: number;
  horizontalExtent?: number;
  positionY?: number;
  width?: number;
  height?: number;
  className?: string;
  forceAnimate?: boolean;
  children?: React.ReactNode;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color;
  uniform float u_scale;
  uniform float u_speed;
  uniform float u_branchIntensity;
  uniform float u_verticalExtent;
  uniform float u_horizontalExtent;
  uniform float u_positionY;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv.y += u_positionY;

    vec2 scaled = uv * u_scale;
    float t = u_time * u_speed;

    float n1 = fbm(scaled + vec2(t * 0.3, t * 0.2));
    float n2 = fbm(scaled * u_branchIntensity + vec2(-t * 0.2, t * 0.15) + n1 * 1.5);
    float n3 = fbm(scaled * 0.5 + vec2(t * 0.1, -t * 0.25) + n2 * 1.2);

    float wave = n1 * u_horizontalExtent + n2 * u_verticalExtent + n3 * 0.3;
    wave = smoothstep(0.2, 0.8, wave);

    vec3 dark = u_color * 0.08;
    vec3 mid = u_color * 0.4;
    vec3 bright = u_color;

    vec3 col = mix(dark, mid, wave);
    col = mix(col, bright, pow(wave, 3.0) * 0.6);
    col += u_color * 0.03;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = parseInt(cleaned.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function linkProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/** Build (or rebuild) the full WebGL pipeline on the given canvas. */
function initWebGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl");
  if (!gl) return null;

  const vert = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vert || !frag) return null;

  const program = linkProgram(gl, vert, frag);
  if (!program) return null;

  gl.useProgram(program);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const pos = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  return { gl, program };
}

const ShaderCard = ({
  color = "#5227FF",
  blur = 0,
  opacity = 1,
  scale = 2,
  speed = 1,
  branchIntensity = 2,
  verticalExtent = 0.5,
  horizontalExtent = 0.5,
  positionY = 0,
  width,
  height,
  className,
  forceAnimate = false,
  children,
}: ShaderCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const rafRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const isHoveringRef = useRef(false);
  const [webglSupported, setWebglSupported] = useState(true);

  const renderFrame = useCallback(
    (time: number) => {
      const gl = glRef.current;
      const program = programRef.current;
      const canvas = canvasRef.current;
      if (!gl || !program || !canvas) return;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(program, "u_time"), time);
      const [r, g, b] = hexToRgb(color);
      gl.uniform3f(gl.getUniformLocation(program, "u_color"), r, g, b);
      gl.uniform1f(gl.getUniformLocation(program, "u_scale"), scale);
      gl.uniform1f(gl.getUniformLocation(program, "u_speed"), speed);
      gl.uniform1f(gl.getUniformLocation(program, "u_branchIntensity"), branchIntensity);
      gl.uniform1f(gl.getUniformLocation(program, "u_verticalExtent"), verticalExtent);
      gl.uniform1f(gl.getUniformLocation(program, "u_horizontalExtent"), horizontalExtent);
      gl.uniform1f(gl.getUniformLocation(program, "u_positionY"), positionY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    [color, scale, speed, branchIntensity, verticalExtent, horizontalExtent, positionY],
  );

  const animate = useCallback(() => {
    frameCountRef.current++;
    if (frameCountRef.current % 2 === 0) {
      timeRef.current += 0.016;
      renderFrame(timeRef.current);
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [renderFrame]);

  const startAnimation = useCallback(() => {
    if (rafRef.current) return;
    animate();
  }, [animate]);

  const stopAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  /** (Re-)create the WebGL context and draw the first frame. */
  const setupGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const result = initWebGL(canvas);
    if (!result) return false;

    glRef.current = result.gl;
    programRef.current = result.program;

    // Size the canvas before the first draw
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    renderFrame(timeRef.current);
    return true;
  }, [renderFrame]);

  // Initialize WebGL + handle context loss / restore
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!setupGL()) {
      setWebglSupported(false);
      return;
    }

    const handleLost = (e: Event) => {
      e.preventDefault(); // allows restore
      stopAnimation();
      glRef.current = null;
      programRef.current = null;
    };

    const handleRestored = () => {
      if (setupGL()) {
        // Resume animation if it was running
        if (forceAnimate || isHoveringRef.current) {
          startAnimation();
        }
      }
    };

    canvas.addEventListener("webglcontextlost", handleLost);
    canvas.addEventListener("webglcontextrestored", handleRestored);

    return () => {
      stopAnimation();
      canvas.removeEventListener("webglcontextlost", handleLost);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
      glRef.current = null;
      programRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle forceAnimate
  useEffect(() => {
    if (forceAnimate) {
      startAnimation();
    } else if (!isHoveringRef.current) {
      stopAnimation();
    }
    return () => {
      if (forceAnimate) stopAnimation();
    };
  }, [forceAnimate, startAnimation, stopAnimation]);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !webglSupported) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      if (!rafRef.current) {
        renderFrame(timeRef.current);
      }
    });

    ro.observe(parent);
    return () => ro.disconnect();
  }, [webglSupported, renderFrame]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (!forceAnimate) startAnimation();
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (!forceAnimate) stopAnimation();
  };

  if (!webglSupported) {
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{
          width: width ?? "100%",
          height: height ?? "100%",
          opacity,
          filter: blur ? `blur(${blur}px)` : undefined,
          background: `radial-gradient(ellipse at 50% 50%, ${color} 0%, ${color}33 50%, ${color}0a 100%)`,
        }}
      >
        {children && (
          <div className="absolute inset-0 z-10">{children}</div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        width: width ?? "100%",
        height: height ?? "100%",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{
          opacity,
          filter: blur ? `blur(${blur}px)` : undefined,
        }}
      />
      {children && (
        <div className="absolute inset-0 z-10">{children}</div>
      )}
    </div>
  );
};

export default ShaderCard;
