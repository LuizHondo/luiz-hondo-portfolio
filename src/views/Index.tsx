"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TopNav from "@/components/layout/TopNav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import HowIThink from "@/components/sections/HowIThink";
import Footer from "@/components/layout/Footer";
import Divider from "@/components/Divider";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Scroll to hash on load
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 3.5 Hero pin + scrub ──────────────────────────────────────
      const heroSection = document.querySelector("[data-hero]") as HTMLElement;
      const heroContent = document.querySelector("[data-hero-content]") as HTMLElement;
      const auroraEl = document.querySelector("[data-aurora]") as HTMLElement;
      const heroGlow = document.querySelector("[data-hero-glow]") as HTMLElement;

      if (heroSection && heroContent && auroraEl) {
        const tl = gsap.timeline();
        tl.to(heroContent, { opacity: 0, scale: 0.95, y: -40, ease: "none" }, 0);
        tl.to(auroraEl, { opacity: 0, ease: "none" }, 0);
        if (heroGlow) tl.fromTo(heroGlow, { opacity: 0 }, { opacity: 1, ease: "none" }, 0);

        ScrollTrigger.create({
          trigger: heroSection,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: true,
          animation: tl,
        });
      }

      // ── 4.2 About animation choreography — photo parallax from left ──
      const aboutPhoto = document.querySelector("[data-about-photo]") as HTMLElement;
      if (aboutPhoto) {
        gsap.from(aboutPhoto, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutPhoto,
            start: "top 85%",
            once: true,
          },
        });
      }

      // ── 4.3 About→Projects bridge — heading parallaxes up ──
      const projectsHeading = document.querySelector("[data-projects-heading]") as HTMLElement;
      if (projectsHeading) {
        ScrollTrigger.create({
          trigger: projectsHeading,
          start: "top bottom",
          end: "top 80%",
          scrub: true,
          animation: gsap.from(projectsHeading, { y: 30, opacity: 0, ease: "none" }),
        });
      }

      // ── 4.4 Projects carousel cards stagger-scale ──
      const carouselCards = document.querySelectorAll("[data-project-card]");
      if (carouselCards.length) {
        gsap.from(carouselCards, {
          scale: 0.85,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: carouselCards[0],
            start: "top 85%",
            once: true,
          },
        });
      }

      // ── 4.6 Contact blur→clear reveal ──
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const contactContent = contactSection.querySelector(
          "[data-contact-content]"
        ) as HTMLElement;
        if (contactContent) {
          gsap.from(contactContent, {
            filter: "blur(8px)",
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactSection,
              start: "top 80%",
              once: true,
            },
          });
        }

        const formFields = contactSection.querySelectorAll("[data-form-field]");
        if (formFields.length) {
          gsap.from(formFields, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactSection,
              start: "top 75%",
              once: true,
            },
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <Divider words={t("divider.row1", { returnObjects: true }) as string[]} direction="left" />
        <About />
        <HowIThink />
        <Divider words={t("divider.row2", { returnObjects: true }) as string[]} direction="right" />
        <Projects />
        <Divider words={t("divider.row3", { returnObjects: true }) as string[]} direction="left" />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
