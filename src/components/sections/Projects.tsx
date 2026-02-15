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
    <section
      id="projects"
      className="pt-20 sm:pt-28 pb-10 snap-center min-h-screen"
    >
      <div className="container max-w-4xl grid grid-rows-[auto,1fr] grid-cols-1">
        <ScrollReveal>
          <h2 className="text-heading text-foreground mb-2">
            {t("projects.heading")}
          </h2>
          <div className="h-1 w-12 rounded-full bg-primary mb-10" />
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex h-full sm:min-h-[65vh] min-h-[70vh] items-center ">
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
                  delay: 1000,
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
                      <div className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg h-[55vh] min-h-40 hover:-translate-y-1 mt-10 sm:m-0">
                        <img
                          className="flex h-[50%] sm:h-[30vh] min-h-35
                           items-center justify-center bg-muted object-cover"
                          src={p.url}
                          alt={t("projects.previewAlt", { title: p.title })}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="flex flex-1 flex-col p-5 min-h-20">
                          <h3 className="text-body font-semibold text-foreground b-1">
                            {p.title}
                          </h3>
                          <p className="text-body-sm text-muted-foreground mb-4 flex-1">
                            {p.summary}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {p.stack.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-caption"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="default"
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
