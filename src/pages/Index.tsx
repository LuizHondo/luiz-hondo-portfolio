import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target && mainRef.current) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <>
      <Header />
      <main ref={mainRef} className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <Hero />
        <About />
        <Projects />
        <div className="snap-start">
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Index;
