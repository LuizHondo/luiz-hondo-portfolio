import { useState } from "react";
import { ExternalLink, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import CaseStudyModal, { type CaseStudy } from "./CaseStudyModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Project {
  title: string;
  summary: string;
  stack: string[];
  github: string;
  caseStudy: CaseStudy;
}

const projects: Project[] = [
  {
    title: "E-Commerce Mobile App",
    summary: "A full-featured shopping app built with React Native and Expo.",
    stack: ["React Native", "Expo", "TypeScript", "Tailwind"],
    github: "https://github.com",
    caseStudy: {
      title: "E-Commerce Mobile App",
      summary: "A full-featured shopping app built with React Native and Expo.",
      problem:
        "Small businesses lacked affordable, polished mobile shopping experiences.",
      solution:
        "Built a cross-platform e-commerce app with a seamless checkout flow and real-time inventory.",
      process:
        "Started with user research, designed in Figma, iterated through 3 sprints, and launched on both stores.",
      stack: ["React Native", "Expo", "TypeScript", "Zustand", "Stripe"],
      github: "https://github.com",
    },
  },
  {
    title: "Developer Portfolio",
    summary: "A neo-minimalist portfolio site showcasing projects and skills.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    caseStudy: {
      title: "Developer Portfolio",
      summary:
        "A neo-minimalist portfolio site showcasing projects and skills.",
      problem:
        "Needed a fast, beautiful, and accessible way to present my work online.",
      solution:
        "Designed a single-page portfolio with scroll animations, dark mode, and a working contact form.",
      process:
        "Defined design tokens first, built reusable components, polished with motion and accessibility checks.",
      stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Zod"],
      github: "https://github.com",
    },
  },
  {
    title: "Task Manager Dashboard",
    summary: "A clean productivity dashboard with drag-and-drop task boards.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    caseStudy: {
      title: "Task Manager Dashboard",
      summary: "A clean productivity dashboard with drag-and-drop task boards.",
      problem: "Existing tools were bloated and slow for small teams.",
      solution:
        "Built a lightweight Kanban board with real-time sync and keyboard navigation.",
      process:
        "Prototyped in Figma, implemented with React DnD, tested with Vitest.",
      stack: ["React", "TypeScript", "Tailwind CSS", "React DnD", "Supabase"],
      github: "https://github.com",
    },
  },
  {
    title: "Task Manager Dashboard",
    summary: "A clean productivity dashboard with drag-and-drop task boards.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    caseStudy: {
      title: "Task Manager Dashboard",
      summary: "A clean productivity dashboard with drag-and-drop task boards.",
      problem: "Existing tools were bloated and slow for small teams.",
      solution:
        "Built a lightweight Kanban board with real-time sync and keyboard navigation.",
      process:
        "Prototyped in Figma, implemented with React DnD, tested with Vitest.",
      stack: ["React", "TypeScript", "Tailwind CSS", "React DnD", "Supabase"],
      github: "https://github.com",
    },
  },
  {
    title: "Task Manager Dashboard",
    summary: "A clean productivity dashboard with drag-and-drop task boards.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    caseStudy: {
      title: "Task Manager Dashboard",
      summary: "A clean productivity dashboard with drag-and-drop task boards.",
      problem: "Existing tools were bloated and slow for small teams.",
      solution:
        "Built a lightweight Kanban board with real-time sync and keyboard navigation.",
      process:
        "Prototyped in Figma, implemented with React DnD, tested with Vitest.",
      stack: ["React", "TypeScript", "Tailwind CSS", "React DnD", "Supabase"],
      github: "https://github.com",
    },
  },
];

const Projects = () => {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  return (
    <section id="projects" className="py-24 snap-center min-h-screen">
      <div className="container max-w-4xl grid grid-rows-[auto,1fr] grid-cols-1">
        <ScrollReveal>
          <h2 className="text-heading text-foreground mb-2">Projects</h2>
          <div className="h-1 w-12 rounded-full bg-primary mb-10" />
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex h-full">
            <Carousel className="w-full" orientation="horizontal">
              <CarouselContent>
                {projects.map((p, i) => (
                  <CarouselItem
                    key={`${p.title}-${i}`}
                    className="sm:basis-1/2"
                  >
                    <ScrollReveal delay={0.06}>
                      <div className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex h-36 items-center justify-center bg-muted">
                          <FolderOpen className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-body font-semibold text-foreground mb-1">
                            {p.title}
                          </h3>
                          <p className="text-body-sm text-muted-foreground mb-4 flex-1">
                            {p.summary}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {p.stack.map((t) => (
                              <Badge
                                key={t}
                                variant="outline"
                                className="text-caption"
                              >
                                {t}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => setSelected(p.caseStudy)}
                            >
                              View Case Study
                            </Button>
                            <Button size="sm" variant="ghost" asChild>
                              <a
                                href={p.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                              >
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
              <CarouselNext className="hidden lg:flex" />
              <CarouselPrevious className="hidden lg:flex" />
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
