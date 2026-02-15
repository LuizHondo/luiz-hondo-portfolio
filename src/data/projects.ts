export interface ProjectData {
  url: string;
  stack: string[];
  github: string;
  caseStudyStack: string[];
  caseStudyGithub: string;
}

export const projectsData: ProjectData[] = [
  {
    url: "https://i.postimg.cc/P5vgLVxd/shop_list.png",
    stack: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    github: "https://github.com/LuizHondo/rn-comprar",
    caseStudyStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "AsyncStorage",
      "lucide-react-native",
    ],
    caseStudyGithub: "https://github.com/LuizHondo/rn-comprar",
  },
  {
    url: "https://i.postimg.cc/pL5w9cTV/triple_peaks.png",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/LuizHondo/web_project_library_pt",
    caseStudyStack: ["HTML", "CSS", "JavaScript"],
    caseStudyGithub: "https://github.com/LuizHondo/web_project_library_pt",
  },
  {
    url: "https://i.postimg.cc/JzHfyYnm/around_us.png",
    stack: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Vite",
      "JWT Authentication",
    ],
    github: "https://github.com/LuizHondo/web_project_api_full",
    caseStudyStack: ["Express", "MongoDB", "React", "Vite", "JWT", "Jest + Supertest"],
    caseStudyGithub: "https://github.com/LuizHondo/web_project_api_full",
  },
  {
    url: "https://i.postimg.cc/dVZb7N1s/tripleten_gallery.png",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/LuizHondo/web_project_homeland",
    caseStudyStack: ["HTML", "CSS", "JavaScript"],
    caseStudyGithub: "https://github.com/LuizHondo/web_project_homeland",
  },
  {
    url: "https://i.postimg.cc/4xHDK2dJ/coffeshop.png",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/LuizHondo/web_project_coffeeshop",
    caseStudyStack: ["HTML", "CSS", "JavaScript"],
    caseStudyGithub: "https://github.com/LuizHondo/web_project_coffeeshop",
  },
];
