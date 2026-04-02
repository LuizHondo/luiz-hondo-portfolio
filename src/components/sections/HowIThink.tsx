"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowIThink = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLHeadingElement>(null);
  const questionsRef = useRef<HTMLUListElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (tagRef.current) {
        gsap.from(tagRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tagRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      if (introRef.current) {
        gsap.from(introRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      if (questionsRef.current) {
        const items = questionsRef.current.querySelectorAll("li");
        gsap.from(items, {
          opacity: 0,
          x: -20,
          filter: "blur(4px)",
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: questionsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (closingRef.current) {
        gsap.from(closingRef.current, {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const questions = t("howIThink.questions", { returnObjects: true }) as string[];

  return (
    <section
      id="how-i-think"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <span
          ref={tagRef}
          className="font-mono text-sm uppercase tracking-widest block mb-12"
          style={{ color: "var(--rust)" }}
        >
          {t("howIThink.tag")}
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-28">
          <div>
            <h2
              ref={introRef}
              className="font-display font-bold mb-10"
              style={{
                fontSize: "clamp(28px, 3.5vw, 48px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              {t("howIThink.intro")}
            </h2>

            <ul ref={questionsRef} className="space-y-4">
              {questions.map((question, i) => (
                <li
                  key={i}
                  className="font-body text-base leading-relaxed flex items-start gap-3"
                  style={{ color: "var(--concrete)" }}
                >
                  <span style={{ color: "var(--rust)", flexShrink: 0 }}>→</span>
                  {question}
                </li>
              ))}
            </ul>
          </div>

          <div className="self-end">
            <p
              ref={closingRef}
              className="font-body text-base leading-relaxed"
              style={{
                color: "var(--concrete)",
                borderLeft: "2px solid var(--rust)",
                paddingLeft: "1.5rem",
              }}
            >
              {t("howIThink.closing")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIThink;
