import { Code2, Palette, Wrench, TestTube, Smartphone, FileCode } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const categories = [
  {
    title: "Front-End",
    icon: <Smartphone className="h-5 w-5" />,
    skills: ["React", "React Native", "Expo"],
  },
  {
    title: "Languages",
    icon: <FileCode className="h-5 w-5" />,
    skills: ["JavaScript", "TypeScript"],
  },
  {
    title: "Styling",
    icon: <Palette className="h-5 w-5" />,
    skills: ["CSS", "Tailwind CSS"],
  },
  {
    title: "Tools",
    icon: <Wrench className="h-5 w-5" />,
    skills: ["Git", "Figma"],
  },
  {
    title: "Practices",
    icon: <TestTube className="h-5 w-5" />,
    skills: ["Testing", "Best Practices"],
  },
];

const Skills = () => (
  <section id="skills" className="py-24 bg-muted/40">
    <div className="container max-w-4xl">
      <ScrollReveal>
        <h2 className="text-heading text-foreground mb-2">Skills</h2>
        <div className="h-1 w-12 rounded-full bg-primary mb-10" />
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <ScrollReveal key={cat.title} delay={0.1 + i * 0.08}>
            <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  {cat.icon}
                </div>
                <h3 className="text-body font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-background px-3 py-1 text-caption text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
