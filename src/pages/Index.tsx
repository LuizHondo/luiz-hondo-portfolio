import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Header />
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <Hero />
      <About />
      <Projects />
      {/* <Skills /> */}
      <Contact />
      <Footer />
    </main>
  </>
);

export default Index;
