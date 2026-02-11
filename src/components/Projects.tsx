import { useState } from "react";
import { ExternalLink, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import CaseStudyModal, { type CaseStudy } from "./CaseStudyModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

interface Project {
  title: string;
  summary: string;
  stack: string[];
  github: string;
  caseStudy: CaseStudy;
  url: string;
}
// / transfer projects to a separated data file

const projects: Project[] = [
  {
    title: "Lista de Compras Mobile",
    url: "https://cdn.discordapp.com/attachments/1398168651005427914/1471209834824208405/image.png?ex=698e1a6e&is=698cc8ee&hm=7399c61e44d96cfd19a4985ae52f0255e2010c7f4dd93cf4fc1a0eeb74965c00&",
    summary:
      "Aplicativo de lista de compras simples construído com React Native e Expo.",
    stack: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    github: "https://github.com/LuizHondo/rn-comprar",
    caseStudy: {
      title: "Lista de Compras Mobile",
      summary:
        "Uma lista de compras móvel com persistência local e filtros de status.",
      problem:
        "Muitas pessoas precisam de um jeito rápido e leve de gerenciar listas de compras no celular.",
      solution:
        "Desenvolvi um app com filtros de itens pendentes/concluídos e armazenamento local usando AsyncStorage.",
      process:
        "Projetei a interface com foco em UX simples, usando Expo e TypeScript para desenvolver telas, lógica e persistência.",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "AsyncStorage",
        "lucide-react-native",
      ],
      github: "https://github.com/LuizHondo/rn-comprar",
    },
  },
  {
    title: "Site de Biblioteca Digital",
    url: "https://cdn.discordapp.com/attachments/1398168651005427914/1471213402754908364/image.png?ex=698e1dc1&is=698ccc41&hm=a9d7ad22e3e9e93b20782695709a922cada9268be4cb369713ab09fcc95e818d&.png",
    summary:
      "Interface web inspirada em catálogo de biblioteca, com foco em layout e organização.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/LuizHondo/web_project_library_pt",
    caseStudy: {
      title: "Biblioteca Digital — Website",
      summary:
        "Site inspirado em uma biblioteca com seções bem estruturadas e fácil navegação.",
      problem:
        "Criar uma interface organizada e coerente para uma página de biblioteca.",
      solution:
        "Estruturei um layout limpo com HTML e CSS e organizei cada seção para leitura confortável.",
      process:
        "Montei a estrutura, apliquei estilos modernos e adicionei pequenos scripts para melhorar a experiência de navegação.",
      stack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/LuizHondo/web_project_library_pt",
    },
  },
  {
    title: "API Completa com Autenticação + Frontend React",
    url: "https://cdn.discordapp.com/attachments/1398168651005427914/1471213913939906722/image.png?ex=698e1e3a&is=698cccba&hm=641c952a687a565a4bf82dc7e984772ff4e1b396ef584afa7396bbb8487bec65&.png",
    summary:
      "Projeto full-stack com API em Node.js/Express e frontend em React.",
    stack: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Vite",
      "JWT Authentication",
    ],
    github: "https://github.com/LuizHondo/web_project_api_full",
    caseStudy: {
      title: "API Completa com Autenticação + Frontend React",
      summary:
        "Aplicação completa demonstrando autenticação, rotas protegidas e integração total com frontend.",
      problem:
        "Faltavam projetos que integrassem de verdade backend e frontend com usuários, autenticação e CRUDs completos.",
      solution:
        "Implementei uma API REST com JWT e integrei com um SPA React utilizando React Router e chamadas à API.",
      process:
        "Modelei a API com Express + Mongoose, desenvolvi rotas protegidas e then construí o frontend em React com gerenciamento de estado simples.",
      stack: ["Express", "MongoDB", "React", "Vite", "JWT", "Jest + Supertest"],
      github: "https://github.com/LuizHondo/web_project_api_full",
    },
  },
  {
    title: "Site de Landing Page Homeland",
    url: "https://cdn.discordapp.com/attachments/1398168651005427914/1471214745968447679/image.png?ex=698e1f01&is=698ccd81&hm=ea909d30fffbf22b760fac61faad2a0b2f784975759e5b75408de8be3a727aac&.png",
    summary:
      "Projeto front-end focado em layout, responsividade e estética moderna.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/LuizHondo/web_project_homeland",
    caseStudy: {
      title: "Landing Page Homeland",
      summary:
        "Página web desenvolvida para prática de layout responsivo e design limpo.",
      problem:
        "Criar uma landing page visualmente moderna, acessível e responsiva.",
      solution:
        "Usei HTML semântico, CSS moderno e práticas de layout com flexbox e grid.",
      process:
        "Estruturei o conteúdo, criei a hierarquia visual e testei variações de layout em diferentes dispositivos.",
      stack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/LuizHondo/web_project_homeland",
    },
  },
  {
    title: "Site CoffeeShop",
    summary:
      "Site temático estilo cafeteria com foco em UI agradável e organização visual.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://cdn.discordapp.com/attachments/1398168651005427914/1471216678380507370/image.png?ex=698e20ce&is=698ccf4e&hm=f1daec16698a05a113b8fdd9010b725ed5a95ea8496e8d2d04ee41a92157afb4&.png",
    github: "https://github.com/LuizHondo/web_project_coffeeshop",
    caseStudy: {
      title: "CoffeeShop Website",
      summary:
        "Página temática criada para treinar estruturação visual e experiência do usuário.",
      problem:
        "Praticar layouts temáticos e interface amigável usando HTML e CSS.",
      solution:
        "Desenvolvi um site com seções bem definidas, estilo inspirado em cafeterias e visual consistente.",
      process:
        "Planejei o layout, estilizei com CSS e adicionei interatividade leve usando JavaScript.",
      stack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/LuizHondo/web_project_coffeeshop",
    },
  },
];

const Projects = () => {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  return (
    <section
      id="projects"
      className="pt-20 sm:pt-28 pb-10 snap-center min-h-screen"
    >
      <div className="container max-w-4xl grid grid-rows-[auto,1fr] grid-cols-1">
        <ScrollReveal>
          <h2 className="text-heading text-foreground mb-2">Projects</h2>
          <div className="h-1 w-12 rounded-full bg-primary mb-10" />
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex h-full sm:min-h-[60vh] min-h-[70vh] items-center ">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                slidesToScroll: 1,
                dragFree: true,
              }}
              className="w-full"
              orientation="horizontal"
              plugins={[
                Autoplay({
                  delay: 1000,
                  stopOnMouseEnter: true,
                  stopOnInteraction: true,
                }),
              ]}
            >
              <CarouselContent>
                {projects.map((p, i) => (
                  <CarouselItem
                    key={`${p.title}-${i}`}
                    className="sm:basis-1/2 h-full"
                  >
                    <ScrollReveal delay={0.06}>
                      <div className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg h-[55vh] hover:-translate-y-1 mt-10 sm:m-0">
                        <img
                          className="flex h-[40vh] sm:h-[30vh] items-center justify-center bg-muted object-cover"
                          src={p.url}
                        />
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-body font-semibold text-foreground mb-1">
                            {p.title}
                          </h3>
                          <p className="text-body-sm text-muted-foreground mb-4 flex-1">
                            {p.summary}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {p.stack.map((t) => (
                              <Badge
                                key={t}
                                variant="outline"
                                className="text-caption"
                              >
                                {t}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => setSelected(p.caseStudy)}
                            >
                              Ver detalhes
                            </Button>
                            <Button size="sm" variant="ghost" asChild>
                              <a href={p.github} aria-label="GitHub">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="-right-8 border-none lg:flex lg:border-solid lg:-right-12" />
              <CarouselPrevious className="-left-8 border-none lg:flex lg:border-solid lg:-left-12" />
            </Carousel>
          </div>
        </ScrollReveal>
      </div>

      <CaseStudyModal
        study={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </section>
  );
};

export default Projects;
