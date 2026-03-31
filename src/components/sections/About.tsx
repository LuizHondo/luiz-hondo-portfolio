"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FACT_CARDS = [
  { labelKey: "about.facts.experience.label", valueKey: "about.facts.experience.value", accent: false },
  { labelKey: "about.facts.projects.label", valueKey: "about.facts.projects.value", accent: false },
  { labelKey: "about.facts.focus.label", valueKey: "about.facts.focus.value", accent: true },
  { labelKey: "about.facts.approach.label", valueKey: "about.facts.approach.value", accent: true },
];

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const parasRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Statement reveal
      if (statementRef.current) {
        gsap.from(statementRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Paragraphs blur-to-clear
      if (parasRef.current) {
        const paras = parasRef.current.querySelectorAll("p");
        gsap.from(paras, {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: parasRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Fact cards reveal
      if (factsRef.current) {
        const cards = factsRef.current.querySelectorAll("[data-fact-card]");
        gsap.from(cards, {
          opacity: 0,
          x: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: factsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const paragraphs = (() => {
    const bio = t("about.bio");
    // Split into ~3 paragraphs by sentence count
    const sentences = bio.match(/[^.!?]+[.!?]+/g) || [bio];
    const third = Math.ceil(sentences.length / 3);
    return [
      sentences.slice(0, third).join(" "),
      sentences.slice(third, third * 2).join(" "),
      sentences.slice(third * 2).join(" "),
    ].filter(Boolean);
  })();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section tag */}
        <span
          className="font-mono text-xs uppercase tracking-widest block mb-12"
          style={{ color: "var(--rust)" }}
        >
          {t("about.tag", "// 01 — Sobre")}
        </span>

        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-28"
        >
          {/* Left: statement + paragraphs */}
          <div>
            <h2
              ref={statementRef}
              className="font-display font-bold mb-10"
              style={{
                fontSize: "clamp(28px, 3.5vw, 48px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              {t("about.statement", "Construo produtos que funcionam de verdade,")}
              {" "}
              <span style={{ color: "var(--gray-mid)" }}>
                {t("about.statementMuted", "e bem executados.")}
              </span>
            </h2>

            <div ref={parasRef} className="space-y-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-body text-base leading-relaxed"
                  style={{ color: "var(--concrete)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right: fact cards */}
          <div ref={factsRef} className="flex flex-col gap-0.5 self-start">
            {FACT_CARDS.map(({ labelKey, valueKey, accent }) => (
              <FactCard
                key={labelKey}
                label={t(labelKey)}
                value={t(valueKey)}
                accent={accent}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface FactCardProps {
  label: string;
  value: string;
  accent: boolean;
}

const FactCard = ({ label, value, accent }: FactCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      data-fact-card
      className="flex items-center justify-between px-6 py-5 transition-colors duration-200"
      style={{ backgroundColor: "var(--gray-dark)", border: "1px solid rgba(255,255,255,0.04)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--gray-dark)";
      }}
    >
      <span
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: "var(--gray-mid)" }}
      >
        {label}
      </span>
      <span
        className="font-display font-bold text-xl"
        style={{ color: accent ? "var(--rust)" : "var(--white)" }}
      >
        {value}
      </span>
    </div>
  );
};

export default About;
