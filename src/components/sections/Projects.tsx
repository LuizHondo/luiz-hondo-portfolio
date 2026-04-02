"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

// CSS-only browser frame mockup
const ProjectMockup = ({ accentColor = "var(--rust)" }: { accentColor?: string }) => (
  <div
    className="w-full h-full min-h-[280px] md:min-h-[360px] flex flex-col overflow-hidden transition-transform duration-300"
    style={{
      backgroundColor: "var(--gray-dark)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "4px",
    }}
  >
    {/* Title bar */}
    <div
      className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
    </div>
    {/* Content */}
    <div className="flex-1 p-6 flex flex-col gap-3">
      <div className="h-2 rounded-sm w-1/3" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
      <div className="h-2 rounded-sm w-2/3" style={{ backgroundColor: accentColor, opacity: 0.6 }} />
      <div className="h-2 rounded-sm w-full" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
      <div className="h-2 rounded-sm w-4/5" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
      <div className="h-2 rounded-sm w-1/2" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="h-16 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        <div className="h-16 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        <div className="h-16 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
      </div>
      <div className="mt-2 h-2 rounded-sm w-3/4" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
      <div className="h-2 rounded-sm w-1/2" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
    </div>
  </div>
);

interface ProjectCardProps {
  number: string;
  year: string;
  title: string;
  problem: string;
  solution: string;
  tags: string[];
  github: string;
  videoMp4?: string;
  videoWebm?: string;
  videoPoster?: string;
  previewImage?: string;
  accentColor?: string;
}

const ProjectCard = ({
  number,
  year,
  title,
  problem,
  solution,
  tags,
  github,
  videoMp4,
  videoWebm,
  videoPoster,
  previewImage,
  accentColor,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileLike, setIsMobileLike] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)");
    setIsMobileLike(mediaQuery.matches);
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current) cardRef.current.style.backgroundColor = "rgba(255,255,255,0.015)";
    if (titleRef.current) titleRef.current.style.color = "var(--rust)";
    if (mockupRef.current) mockupRef.current.style.transform = "scale(1.03)";
    if (videoRef.current) {
      void videoRef.current.play().catch(() => {
        // Ignore autoplay errors from stricter browser policies.
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.backgroundColor = "transparent";
    if (titleRef.current) titleRef.current.style.color = "var(--white)";
    if (mockupRef.current) mockupRef.current.style.transform = "scale(1)";
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  };

  return (
    <div
      ref={cardRef}
      data-project-card
      className="grid grid-cols-1 md:grid-cols-2 transition-colors duration-300 cursor-default"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", backgroundColor: "transparent" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Info panel */}
      <div className="p-8 md:p-10 flex flex-col justify-between gap-6">
        <div>
          <div
            className="flex items-center gap-3 mb-5 font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--gray-mid)" }}
          >
            <span>{number}</span>
            <span>—</span>
            <span>{year}</span>
          </div>
          <h3
            ref={titleRef}
            className="font-display font-bold mb-5 transition-colors duration-300"
            style={{
              fontSize: "clamp(20px, 2.5vw, 32px)",
              letterSpacing: "-0.02em",
              color: "var(--white)",
            }}
          >
            {title}
          </h3>
          <div className="space-y-3 mb-6">
            <div>
              <span
                className="font-mono text-xs uppercase tracking-widest block mb-1"
                style={{ color: "var(--rust)" }}
              >
                Problema:
              </span>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--concrete)" }}>
                {problem}
              </p>
            </div>
            <div>
              <span
                className="font-mono text-xs uppercase tracking-widest block mb-1"
                style={{ color: "var(--gold)" }}
              >
                Solução:
              </span>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--concrete)" }}>
                {solution}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 transition-colors duration-300"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "var(--gray-mid)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest flex items-center gap-1 transition-colors duration-200"
            style={{ color: "var(--gray-mid)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray-mid)")}
          >
            Ver case →
          </a>
        </div>
      </div>

      {/* Visual panel */}
      <div
        ref={mockupRef}
        className="p-6 md:p-8 flex items-center justify-center transition-transform duration-300"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="w-full relative overflow-hidden" style={{ minHeight: "200px" }}>
          {videoMp4 || videoWebm ? (
            <>
              <video
                ref={videoRef}
                data-project-video
                className="w-full h-full min-h-[280px] md:min-h-[360px] object-cover"
                muted
                playsInline
                loop
                preload="none"
                poster={videoPoster ?? previewImage}
                disablePictureInPicture
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
                {videoMp4 ? <source src={videoMp4} type="video/mp4" /> : null}
              </video>
              <span
                className="absolute top-3 left-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm transition-colors duration-200"
                style={{
                  backgroundColor: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: isVideoPlaying ? "var(--rust)" : "var(--gray-mid)",
                }}
              >
                {isVideoPlaying ? "Playing" : isMobileLike ? "Auto play in center" : "Hover to play"}
              </span>
            </>
          ) : (
            <ProjectMockup accentColor={accentColor} />
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-project-card]");
    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobileLike = window.matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)").matches;
    if (!isMobileLike) return;

    const videos = Array.from(section.querySelectorAll<HTMLVideoElement>("[data-project-video]"));
    if (!videos.length) return;

    const playOnly = (target: HTMLVideoElement | null) => {
      videos.forEach((video) => {
        if (video === target) {
          void video.play().catch(() => {
            // Ignore autoplay errors from stricter browser policies.
          });
          return;
        }

        video.pause();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Keep only centered candidates and prefer the one with higher intersection ratio.
        const centered = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!centered.length) return;

        playOnly(centered[0].target as HTMLVideoElement);
      },
      {
        // "Center band" of viewport where autoplay is active.
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, []);

  const projects = projectsData.map((p, i) => ({
    ...p,
    year: t(`projects.items.${i}.year`),
    title: t(`projects.items.${i}.title`),
    problem: t(`projects.items.${i}.caseStudy.problem`),
    solution: t(`projects.items.${i}.caseStudy.solution`),
  }));

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 lg:py-24"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <span
          className="font-mono text-sm uppercase tracking-widest block mb-4"
          style={{ color: "var(--rust)" }}
        >
          {t("projects.tag", "// 02 — Projetos")}
        </span>
        <h2
          className="font-display font-bold"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em" }}
        >
          {t("projects.heading")}
        </h2>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 lg:px-12"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {projects.map((p, i) => (
          <ProjectCard
            key={i}
            number={String(i + 1).padStart(2, "0")}
            year={p.year}
            title={p.title}
            problem={p.problem}
            solution={p.solution}
            tags={p.stack}
            github={p.github}
            videoMp4={p.videoMp4}
            videoWebm={p.videoWebm}
            videoPoster={p.videoPoster}
            previewImage={p.url}
            accentColor={p.shaderColor}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
