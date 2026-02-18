import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollReveal from "../common/ScrollReveal";
import CaseStudyModal from "../modals/CaseStudyModal";
import type { CaseStudy } from "../modals/CaseStudyModal";
import { projectsData } from "@/data/projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const Projects = () => {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const { t } = useTranslation();

  const projects = projectsData.map((p, i) => ({
    ...p,
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

  return (
    <section id="projects" className="pt-20 sm:pt-28 pb-6 snap-center h-screen">
      <div className="container max-w-4xl grid grid-rows-[auto,1fr] grid-cols-1 h-full">
        <ScrollReveal>
          <h2 className="text-heading text-foreground mb-2">
            {t("projects.heading")}
          </h2>
          <div className="h-1 w-12 rounded-full bg-primary mb-6" />
        </ScrollReveal>
        <ScrollReveal className="flex items-center">
          <div className="flex w-full items-center">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                slidesToScroll: 1,
                dragFree: true,
              }}
              className="w-full"
              orientation="horizontal"
              plugins={[
                Autoplay({
                  delay: 1700,
                  stopOnMouseEnter: true,
                  stopOnInteraction: true,
                }),
              ]}
            >
              <CarouselContent>
                {projects.map((p, i) => (
                  <CarouselItem
                    key={`${p.title}-${i}`}
                    className="sm:basis-1/2 h-full"
                  >
                    <ScrollReveal delay={0.06}>
                      <div className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg h-[calc(100vh-13rem)] sm:h-[calc(100vh-15rem)] hover:-translate-y-1">
                        <img
                          className="h-[45%] w-full bg-muted object-cover"
                          src={p.url}
                          alt={t("projects.previewAlt", { title: p.title })}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="flex flex-1 flex-col p-3 sm:p-5 min-h-0 overflow-hidden">
                          <h3 className="text-body-sm sm:text-body font-semibold text-foreground mb-0.5 sm:mb-1">
                            {p.title}
                          </h3>
                          <p className="text-caption sm:text-body-sm text-muted-foreground mb-2 sm:mb-4 flex-1 line-clamp-3">
                            {p.summary}
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-4">
                            {p.stack.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-[0.625rem] sm:text-caption px-1.5 py-0 sm:px-2.5 sm:py-0.5"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-auto">
                            <Button
                              size="sm"
                              variant="default"
                              className="text-caption sm:text-body-sm"
                              onClick={() => setSelected(p.caseStudy)}
                            >
                              {t("projects.viewDetails")}
                            </Button>
                            <Button size="sm" variant="ghost" asChild>
                              <a href={p.github} aria-label="GitHub">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
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

      <CaseStudyModal
        study={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </section>
  );
};

export default Projects;
