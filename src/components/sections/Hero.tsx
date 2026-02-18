import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import StaggeredText from "../effects/StaggeredText";
import NeonReveal from "../effects/NeonReveal";

const Hero = () => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative flex min-h-screen snap-center items-center justify-center px-4 pt-16">
      <div className="absolute inset-0 z-0">
        <NeonReveal
          key={isDark ? "dark" : "light"}
          color={isDark ? 179 : 165}
          verticalOffset={1}
          mirrored={true}
          barWidth={1}
          revealDelay={400}
          revealDuration={7500}
          intensity={0.7}
          glowSpread={0.7}
          followCursor={true}
        />
      </div>
      <div className="container relative z-10 max-w-3xl text-center pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-body-lg text-primary font-medium "
        >
          {t("hero.greeting")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-display-sm md:text-display text-foreground [text-shadow:1px_3px_5px_rgba(0,0,0,0.50)]"
        >
          {t("hero.name")}
          <br />
          <span className="text-primary">{t("hero.title")}</span>
        </motion.h1>
        <StaggeredText
          text={t("hero.tagline")}
          separator="|"
          className="mt-6 text-xs sm:text-body-lg text-muted-foreground max-w-xl mx-auto"
          segmentBy="chars"
          direction="top"
          delay={40}
          duration={0.6}
          blur={true}
          staggerDirection="forward"
          exitOnScrollOut={true}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <Button size="lg" asChild>
            <a href="#projects">{t("hero.projectsBtn")}</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">{t("hero.contactBtn")}</a>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 pointer-events-auto"
        >
          <a href="#about" aria-label="Scroll down">
            <ArrowDown className="mx-auto h-10 w-10 animate-bounce text-teal-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
