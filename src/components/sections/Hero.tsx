"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const eyebrow = eyebrowRef.current;
    const ctas = ctasRef.current;
    const meta = metaRef.current;

    if (!section || !title || !subtitle || !eyebrow || !ctas) return;

    // 3.2 Word-by-word reveal
    const wordInners = title.querySelectorAll(".word-inner");

    // 3.3 Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(eyebrow, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(wordInners, { y: "110%" }, { y: "0%", duration: 0.8, stagger: 0.07 }, "-=0.2")
      .fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
      .fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

    if (meta) {
      tl.fromTo(meta, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
    }

    // 3.4 Parallax scroll
    gsap.to(title, {
      y: -80,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(subtitle, {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const titleRaw = t("hero.title");
  const words = titleRaw.split(" ");
  const accentWords = ["produtos", "digitais"];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex flex-col min-h-screen justify-center overflow-hidden"
      style={{ padding: "48px 48px 48px" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="font-mono text-xs uppercase tracking-widest mb-6 block"
          style={{ color: "var(--rust)", letterSpacing: "4px", opacity: 0 }}
        >
          {t("hero.eyebrow", "Full Stack Developer")}
        </span>

        {/* Title with word-by-word reveal */}
        <h1
          ref={titleRef}
          className="font-display font-bold leading-none mb-8"
          style={{ fontSize: "clamp(42px, 7vw, 96px)", letterSpacing: "-0.03em" }}
        >
          {words.map((word, i) => {
            const isAccent = accentWords.some((a) =>
              word.toLowerCase().includes(a)
            );
            return (
              <span key={i} className="word" style={{ marginRight: "0.25em" }}>
                <span
                  className="word-inner"
                  style={isAccent ? { color: "var(--rust)" } : undefined}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-lg mb-10 max-w-xl"
          style={{ color: "var(--concrete)", opacity: 0 }}
        >
          {t("hero.tagline")}
        </p>

        {/* CTAs */}
        <div
          ref={ctasRef}
          className="flex flex-wrap items-center gap-4"
          style={{ opacity: 0 }}
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="font-mono text-sm uppercase tracking-widest px-7 py-3 transition-all duration-200"
            style={{
              backgroundColor: "var(--rust)",
              color: "var(--white)",
              border: "1px solid var(--rust)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--rust)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--rust)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--white)";
            }}
          >
            {t("hero.projectsBtn")}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="font-mono text-sm uppercase tracking-widest px-7 py-3 transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: "transparent",
              color: "var(--concrete)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--white)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--concrete)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            {t("hero.contactBtn")} →
          </button>
        </div>

        {/* Metadata bar (hidden on mobile) */}
        <div
          ref={metaRef}
          className="hidden md:flex items-center gap-8 mt-16 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", opacity: 0 }}
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--gray-mid)" }}>
            <span
              className="pulse-dot inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--rust)" }}
            />
            {t("hero.availability", "Disponível para projetos")}
          </div>
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--gray-mid)" }}>
            {t("hero.location", "Presidente Prudente, SP")}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--gray-mid)" }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
