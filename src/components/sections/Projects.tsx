"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "../common/ScrollReveal";
import ProjectShaderCard from "../cards/ProjectShaderCard";
import ProjectModal from "../modals/ProjectModal";
import type { SelectedProject } from "../modals/ProjectModal";
import { projectsData } from "@/data/projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const Projects = () => {
  const [selected, setSelected] = useState<SelectedProject | null>(null);
  const [placeholderSize, setPlaceholderSize] = useState<{ width: number; height: number } | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { t } = useTranslation();

  const projects = projectsData.map((p, i) => ({
    ...p,
    id: String(i),
    title: t(`projects.items.${i}.title`),
    summary: t(`projects.items.${i}.summary`),
    caseStudy: {
      title: t(`projects.items.${i}.caseStudy.title`),
      summary: t(`projects.items.${i}.caseStudy.summary`),
      problem: t(`projects.items.${i}.caseStudy.problem`),
      solution: t(`projects.items.${i}.caseStudy.solution`),
      process: t(`projects.items.${i}.caseStudy.process`),
      stack: p.caseStudyStack,
      github: p.caseStudyGithub,
    },
  }));

  const handleCardClick = (index: number) => {
    const p = projects[index];
    const el = cardRefs.current[p.id];
    if (el) {
      const rect = el.getBoundingClientRect();
      setPlaceholderSize({ width: rect.width, height: rect.height });
    }
    setSelected({
      id: p.id,
      data: projectsData[index],
      title: p.title,
      caseStudy: p.caseStudy,
    });
    // Freeze carousel autoplay
    try {
      (api?.plugins() as { autoplay?: { stop: () => void } })?.autoplay?.stop();
    } catch {
      // autoplay plugin may not be available
    }
  };

  const handleClose = useCallback(() => {
    setSelected(null);
    // Resume carousel autoplay
    try {
      (api?.plugins() as { autoplay?: { play: () => void } })?.autoplay?.play();
    } catch {
      // autoplay plugin may not be available
    }
  }, [api]);

  return (
    <section id="projects" className="min-h-screen snap-start flex flex-col">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col flex-1 justify-center gap-8 sm:gap-10 lg:gap-14">
        <ScrollReveal>
          <h2 className="text-heading text-foreground mb-2">
            {t("projects.heading")}
          </h2>
          <div className="h-1 w-12 rounded-full bg-primary mb-6" />
        </ScrollReveal>
        <ScrollReveal className="flex items-center h-full min-h-0">
          <div className="flex w-full items-center h-full">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                slidesToScroll: 1,
                dragFree: true,
              }}
              className="w-full h-full"
              orientation="horizontal"
              setApi={setApi}
              plugins={[
                Autoplay({
                  delay: 1700,
                  stopOnMouseEnter: true,
                  stopOnInteraction: true,
                }),
              ]}
            >
              <CarouselContent className="h-full">
                {projects.map((p, i) => (
                  <CarouselItem
                    key={`${p.id}-${i}`}
                    className="basis-full sm:basis-1/2"
                  >
                    <ScrollReveal delay={0.06} className="h-full">
                      {selected?.id === p.id ? (
                        // Hidden placeholder to preserve carousel layout
                        <div
                          className="rounded-xl"
                          style={{
                            visibility: "hidden",
                            width: placeholderSize?.width,
                            height: placeholderSize?.height,
                          }}
                        />
                      ) : (
                        <div ref={(el) => { cardRefs.current[p.id] = el; }} className="h-full flex items-center">
                          <ProjectShaderCard
                            id={p.id}
                            title={p.title}
                            summary={p.summary}
                            stack={p.stack}
                            shaderColor={p.shaderColor}
                            onClick={() => handleCardClick(i)}
                          />
                        </div>
                      )}
                    </ScrollReveal>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="-right-8 border-none lg:flex lg:border-solid lg:-right-12" />
              <CarouselPrevious className="-left-8 border-none lg:flex lg:border-solid lg:-left-12" />
            </Carousel>
          </div>
        </ScrollReveal>
      </div>

      <ProjectModal project={selected} onClose={handleClose} />
    </section>
  );
};

export default Projects;
