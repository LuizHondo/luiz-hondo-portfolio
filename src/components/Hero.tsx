import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import StaggeredText from "./ui/StaggeredText";

const Hero = () => (
  <section className="flex min-h-screen snap-center items-center justify-center px-4 pt-16">
    <div className="container max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-body-lg text-primary font-medium"
      >
        Olá, eu sou
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-display-sm md:text-display text-foreground"
      >
        Luiz Hondo
        <br />
        <span className="text-primary">Desenvolvedor Fullstack</span>
      </motion.h1>
      {/* <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-body-lg text-muted-foreground max-w-xl mx-auto"
      >
        I build clean, performant, and accessible web & mobile experiences with
        React, React Native, and modern JavaScript.
      </motion.p> */}
      <StaggeredText
        text="Transformando problemas reais em soluções|que entregam valor de verdade."
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
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <Button size="lg" asChild>
          <a href="#projects">Meus projetos</a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="#contact">Fale comigo</a>
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-16"
      >
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="mx-auto h-10 w-10 animate-bounce text-muted-foreground" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default Hero;
