export interface ProjectData {
  url: string;
  videoMp4?: string;
  videoWebm?: string;
  videoPoster?: string;
  stack: string[];
  github: string;
  caseStudyStack: string[];
  caseStudyGithub: string;
  shaderColor: string;
}

export const projectsData: ProjectData[] = [
  {
    url: "https://i.postimg.cc/P5vgLVxd/shop_list.png",
    videoMp4: "/projects/lista%20de%20compras.mp4",
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
    shaderColor: "#5227FF",
  },
  {
    url: "https://i.postimg.cc/pL5w9cTV/triple_peaks.png",
    videoMp4: "/projects/site%20biblioteca.mp4",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/LuizHondo/web_project_library_pt",
    caseStudyStack: ["HTML", "CSS", "JavaScript"],
    caseStudyGithub: "https://github.com/LuizHondo/web_project_library_pt",
    shaderColor: "#FF6B35",
  },
  {
    url: "https://i.postimg.cc/JzHfyYnm/around_us.png",
    videoMp4: "/projects/site%20auth-full.mp4",
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
    shaderColor: "#00B4D8",
  },
  {
    url: "https://i.postimg.cc/dVZb7N1s/tripleten_gallery.png",
    videoMp4: "/projects/site%20homeland.mp4",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/LuizHondo/web_project_homeland",
    caseStudyStack: ["HTML", "CSS", "JavaScript"],
    caseStudyGithub: "https://github.com/LuizHondo/web_project_homeland",
    shaderColor: "#10B981",
  },
  {
    url: "https://i.postimg.cc/4xHDK2dJ/coffeshop.png",
    videoMp4: "/projects/site%20coffeeshop.mp4",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/LuizHondo/web_project_coffeeshop",
    caseStudyStack: ["HTML", "CSS", "JavaScript"],
    caseStudyGithub: "https://github.com/LuizHondo/web_project_coffeeshop",
    shaderColor: "#D946EF",
  },
];
