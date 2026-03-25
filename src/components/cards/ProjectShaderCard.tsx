"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import ShaderCard from "@/components/effects/ShaderCard";

interface ProjectShaderCardProps {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  shaderColor: string;
  onClick: () => void;
}

const ProjectShaderCard = ({
  id,
  title,
  summary,
  stack,
  shaderColor,
  onClick,
}: ProjectShaderCardProps) => {
  return (
    <motion.div
      layoutId={`project-${id}`}
      onClick={onClick}
      className="relative cursor-pointer rounded-xl overflow-hidden group h-2/3 min-h-[20rem]"
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <ShaderCard color={shaderColor} className="w-full h-full">
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-16 sm:p-6 sm:pt-20">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              <motion.h3
                layoutId={`title-${id}`}
                className="text-white text-lg sm:text-xl font-bold mb-2 truncate"
              >
                {title}
              </motion.h3>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs px-1.5 py-0 border-white/30 text-white/80 bg-white/10"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-white/60 mt-2 line-clamp-2">
                {summary}
              </p>
            </div>
            {/* Expand icon */}
            <motion.div
              layoutId={`icon-${id}`}
              className="w-8 h-8 shrink-0 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white/30 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3V13M3 8H13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </ShaderCard>
    </motion.div>
  );
};

export default ProjectShaderCard;
