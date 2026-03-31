"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = ["about", "projects", "contact"] as const;

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const LangSwitch = () => {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith("pt") ? "PT" : "EN";
  const toggle = () =>
    i18n.changeLanguage(i18n.language.startsWith("pt") ? "en" : "pt-BR");

  return (
    <button
      onClick={toggle}
      suppressHydrationWarning
      className="text-xs font-mono uppercase tracking-widest text-concrete hover:text-white transition-colors px-1"
      aria-label="Switch language"
    >
      {current}
    </button>
  );
};

const TopNav = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const triggers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
        onLeave: () => setActiveSection((prev) => (prev === id ? null : prev)),
        onLeaveBack: () => setActiveSection((prev) => (prev === id ? null : prev)),
      });
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  const navLinks = SECTIONS.map((id) => ({
    id,
    label: t(`nav.${id}`),
  }));

  return (
    <header
      ref={navRef}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
        {/* Brand mark */}
        <a
          href="#"
          className="font-display font-bold text-xl text-white tracking-tight hover:opacity-80 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          luiz<span style={{ color: "var(--rust)" }}>.</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              suppressHydrationWarning
              className={[
                "text-xs font-mono uppercase tracking-widest transition-colors",
                activeSection === id
                  ? "text-white"
                  : "text-concrete hover:text-white",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LangSwitch />
          <button
            className="md:hidden p-1 text-concrete hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden bg-black/95 backdrop-blur-md border-b border-white/5 md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setMobileOpen(false);
                  }}
                  suppressHydrationWarning
                  className={[
                    "text-left text-xs font-mono uppercase tracking-widest py-3 border-b border-white/5 transition-colors",
                    activeSection === id ? "text-white" : "text-concrete hover:text-white",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopNav;
