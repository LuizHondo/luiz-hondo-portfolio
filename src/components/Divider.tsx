"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DividerProps {
  words: string[];
  direction?: "left" | "right";
}

const Divider = ({ words, direction = "left" }: DividerProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const xFrom = direction === "left" ? 0 : "-50%";
    const xTo = direction === "left" ? "-50%" : 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        track,
        { x: xFrom },
        {
          x: xTo,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction]);

  // Repeat words enough to fill wide screens
  const repeated = [...words, ...words, ...words, ...words];

  return (
    <div
      className="overflow-hidden py-14"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div ref={trackRef} className="flex items-center gap-8 whitespace-nowrap will-change-transform">
        {repeated.map((word, i) => (
          <span
            key={i}
            className={`font-display font-bold text-4xl md:text-5xl lg:text-6xl uppercase select-none ${i % 5 === 2 ? "divider-word-filled" : "divider-word-outline"
              }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Divider;
