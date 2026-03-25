"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ExternalLink, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ShaderCard from "@/components/effects/ShaderCard";
import type { ProjectData } from "@/data/projects";

interface SelectedProject {
  id: string;
  data: ProjectData;
  title: string;
  caseStudy: {
    title: string;
    summary: string;
    problem: string;
    solution: string;
    process: string;
    stack: string[];
    github: string;
  };
}

interface ProjectModalProps {
  project: SelectedProject | null;
  onClose: () => void;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Reset reveal state when project changes
  useEffect(() => {
    setImageLoaded(false);
    setRevealed(false);
  }, [project?.id]);

  // Trigger reveal after image loads (with delay for morph to settle)
  useEffect(() => {
    if (!imageLoaded) return;
    const delay = prefersReducedMotion ? 0 : 400;
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [imageLoaded, prefersReducedMotion]);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  // Body scroll lock
  useEffect(() => {
    if (project) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [project]);

  // Escape key handler
  useEffect(() => {
    if (!project) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [project, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
            className="fixed inset-0 z-[999999] cursor-pointer"
            style={{
              background: `radial-gradient(125% 125% at 50% 10%, light-dark(#fff, #0a0a0a) 40%, ${project.data.shaderColor} 100%)`,
            }}
          />

          {/* Modal container */}
          <div className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <motion.div
              layoutId={`project-${project.id}`}
              className="relative rounded-2xl overflow-hidden max-w-3xl w-full max-h-[85vh] shadow-2xl pointer-events-auto flex flex-col"
              style={{ backgroundColor: "light-dark(#fff, #0a0a0a)" }}
              onClick={(e) => e.stopPropagation()}
              transition={springTransition}
            >
              {/* Layered hero: shader + project image reveal */}
              <div className="relative h-48 sm:h-64 shrink-0">
                {/* Layer 1: Shader background */}
                <div className="absolute inset-0">
                  <ShaderCard
                    color={project.data.shaderColor}
                    forceAnimate={true}
                    className="w-full h-full"
                  />
                </div>

                {/* Layer 2: Project image (cross-fades in on open, fades out on close) */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: revealed ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 1.8,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <img
                    src={project.data.url}
                    alt={project.caseStudy.title}
                    onLoad={handleImageLoad}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Gradient overlay + title + close (always on top) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 pt-16">
                  <div className="flex items-end justify-between">
                    <motion.h3
                      layoutId={`title-${project.id}`}
                      className="text-white text-2xl sm:text-3xl font-bold"
                      transition={springTransition}
                    >
                      {project.caseStudy.title}
                    </motion.h3>
                    <motion.button
                      layoutId={`icon-${project.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                      }}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={springTransition}
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Scrollable case study body */}
              <motion.div
                className="p-6 sm:p-8 overflow-y-auto flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0.15,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <div className="space-y-6">
                  {/* Summary */}
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {project.caseStudy.summary}
                  </p>

                  {/* Project thumbnail */}
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img
                      src={project.data.url}
                      alt={project.caseStudy.title}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Problem */}
                  <div>
                    <h4 className="text-body font-semibold text-foreground mb-1">
                      {t("caseStudy.problem")}
                    </h4>
                    <p className="text-body-sm text-muted-foreground">
                      {project.caseStudy.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-body font-semibold text-foreground mb-1">
                      {t("caseStudy.solution")}
                    </h4>
                    <p className="text-body-sm text-muted-foreground">
                      {project.caseStudy.solution}
                    </p>
                  </div>

                  {/* Process */}
                  <div>
                    <h4 className="text-body font-semibold text-foreground mb-1">
                      {t("caseStudy.process")}
                    </h4>
                    <p className="text-body-sm text-muted-foreground">
                      {project.caseStudy.process}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <h4 className="text-body font-semibold text-foreground mb-1">
                      {t("caseStudy.technologies")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.caseStudy.stack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* GitHub link */}
                  <Button variant="outline" className="gap-2" asChild>
                    <a
                      href={project.caseStudy.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t("caseStudy.viewOnGithub")}
                    </a>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export type { SelectedProject };
export default ProjectModal;
