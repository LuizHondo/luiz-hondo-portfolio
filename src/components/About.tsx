import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import BlurHighlight from "./ui/blurhighlight";

const About = () => (
  <section
    id="about"
    className="pt-20 sm:pt-28 snap-center h-full min-h-screen overflow-hidden"
  >
    <div className="container h-full max-w-4xl">
      <ScrollReveal>
        <h2 className="text-heading text-foreground mb-2">Sobre mim</h2>
        <div className="h-1 w-12 rounded-full bg-primary mb-8" />
      </ScrollReveal>

      <div className="grid gap-8 h-fit sm:grid-cols-[1fr_2fr]">
        <ScrollReveal delay={0.1}>
          <div className="flex flex-row sm:flex-col items-center gap-4">
            <div className="flex w-20 h-20 sm:h-[12rem] sm:w-[12rem] items-center justify-center rounded-2xl ">
              <img
                src="https://i.postimg.cc/FKMyRbpv/my-Picture.png"
                alt="Imagem de Luiz"
                loading="lazy"
                decoding="async"
                width={192}
                height={192}
                className="flex w-full items-center justify-center rounded-2xl bg-primary border border-solid p-1 "
              />
            </div>
            <Button variant="outline" className="gap-2 mt-2">
              <Download className="h-4 w-4" />
              Baixar CV
            </Button>
          </div>
        </ScrollReveal>

        <div
          className="text-[clamp(0.5rem,1.5vw,1.5rem)] sm:text-[clamp(1rem,30vw,1.2rem)]
 text-justify h-fit"
        >
          <BlurHighlight
            highlightedBits={[
              "transformar desafios reais em soluções digitais claras, eficientes e sustentáveis",
              "resolve problemas concretos e facilita decisões",
              "confiáveis no longo prazo",
              "atenção aos detalhes e compromisso com entregas",
              "permaneçam sólidas amanhã",
            ]}
            highlightColor="#2a7872"
            highlightDelay={0.6}
            highlightDuration={2}
            blurAmount={0}
            inactiveOpacity={1}
            blurDuration={0}
            className="h-full overflow-hidden"
          >
            Sou desenvolvedor front-end com formação em Análise de Sistemas e
            foco em transformar desafios reais em soluções digitais claras,
            eficientes e sustentáveis. Ao longo da minha trajetória, aprendi que
            tecnologia só gera valor quando resolve problemas concretos e
            facilita decisões. Por isso, trabalho com disciplina, organização e
            pensamento crítico, buscando sempre entender o contexto antes de
            propor qualquer solução. Utilizo ferramentas como React, React
            Native e TypeScript de forma estratégica, não apenas para construir
            interfaces modernas, mas para estruturar aplicações escaláveis, bem
            planejadas e confiáveis no longo prazo. Acredito que confiança se
            constrói com consistência, atenção aos detalhes e compromisso com
            entregas que realmente funcionam. Meu objetivo é desenvolver
            soluções que façam sentido hoje e permaneçam sólidas amanhã.
          </BlurHighlight>
        </div>
      </div>
    </div>
  </section>
);

export default About;
