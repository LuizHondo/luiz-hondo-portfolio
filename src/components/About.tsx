import { Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const timeline = [
  {
    year: "2025 – Present",
    role: "Desenvolvedor Fullstack",
    company: "Freelance / Open Source",
    desc: "Building React & React Native apps, contributing to the community.",
  },
  {
    year: "2024 – 2025",
    role: "Web Development",
    company: "TripleTen Bootcamp",
    desc: "",
  },
  {
    year: "2022 – 2024",
    role: "Análise e Desenvolvimento de Sistemas",
    company: "FIAP - Faculdade de Infomática e Administração Paulista",
    desc: "Developed responsive web apps with React, TypeScript, and Tailwind.",
  },
  {
    year: "2020 – 2022",
    role: "Self-Taught Developer",
    company: "Online Courses & Projects",
    desc: "Learned JavaScript, React, and modern front-end fundamentals.",
  },
];

const About = () => (
  <section id="about" className="py-24 snap-center min-h-screen">
    <div className="container max-w-4xl">
      <ScrollReveal>
        <h2 className="text-heading text-foreground mb-2">About Me</h2>
        <div className="h-1 w-12 rounded-full bg-primary mb-8" />
      </ScrollReveal>

      <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-muted">
              <User className="h-16 w-16 text-muted-foreground" />
            </div>
            <Button variant="outline" className="gap-2 mt-2">
              <Download className="h-4 w-4" />
              Download CV
            </Button>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal delay={0.15}>
            <p className="text-body-lg text-muted-foreground">
              I'm a passionate front-end developer from Brazil who loves
              crafting clean, accessible, and delightful user interfaces. I
              specialize in React, React Native, and TypeScript — with a focus
              on performance and user experience.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h3 className="text-heading-sm text-foreground mb-4 mt-8">
              Experience
            </h3>
          </ScrollReveal>

          <div className="relative border-l-2 border-border pl-6 space-y-8">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={0.25 + i * 0.1}>
                <div className="relative">
                  <div className="absolute -left-9 top-1 h-5 w-5 rounded-full bg-primary" />
                  <p className="text-caption text-primary font-semibold">
                    {item.year}
                  </p>
                  <p className="text-body font-semibold text-foreground">
                    {item.role}
                  </p>
                  <p className="text-body-sm text-muted-foreground">
                    {item.company}
                  </p>
                  <p className="text-body-sm text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
