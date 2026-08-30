"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiCplusplus, SiPython, SiJavascript, SiTypescript, SiC, SiHtml5,
  SiHuggingface, SiOpencv, SiPytorch, SiNumpy, SiPandas, SiScikitlearn,
  SiReact, SiNodedotjs, SiExpress, SiFastapi, SiFlask, SiTailwindcss, SiFramer,
  SiDocker, SiKubernetes, SiGit, SiSelenium, SiGooglecloud,
  SiPostgresql, SiMysql, SiMongodb, SiSqlite, SiRedis, SiSupabase,
  SiGithubactions
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Brain, Cpu, Network, FunctionSquare } from "lucide-react";

interface TechItem {
  name: string;
  color: string;
  icon: React.ElementType;
}

const techData: TechItem[] = [
  // 38 items total
  { name: "C++", color: "#00599C", icon: SiCplusplus },
  { name: "Python", color: "#3776AB", icon: SiPython },
  { name: "JavaScript", color: "#F7DF1E", icon: SiJavascript },
  { name: "TypeScript", color: "#3178C6", icon: SiTypescript },
  { name: "Pine Script", color: "#2962FF", icon: FunctionSquare },
  { name: "C", color: "#A8B9CC", icon: SiC },
  { name: "Java", color: "#007396", icon: FaJava },
  { name: "HTML5/CSS3", color: "#E34F26", icon: SiHtml5 },
  { name: "DeepStream", color: "#76B900", icon: Cpu },
  { name: "ONNX", color: "#005CED", icon: Network },
  { name: "ArcFace", color: "#FF4F8B", icon: Brain },
  { name: "Hugging Face", color: "#FFD21E", icon: SiHuggingface },
  { name: "OpenCV", color: "#5C3EE8", icon: SiOpencv },
  { name: "PyTorch", color: "#EE4C2C", icon: SiPytorch },
  { name: "NumPy", color: "#013243", icon: SiNumpy },
  { name: "Pandas", color: "#150458", icon: SiPandas },
  { name: "Scikit-Learn", color: "#F7931E", icon: SiScikitlearn },
  { name: "React", color: "#61DAFB", icon: SiReact },
  { name: "Node.js", color: "#339933", icon: SiNodedotjs },
  { name: "Express", color: "#FFFFFF", icon: SiExpress },
  { name: "FastAPI", color: "#009688", icon: SiFastapi },
  { name: "Flask", color: "#FFFFFF", icon: SiFlask },
  { name: "Tailwind", color: "#06B6D4", icon: SiTailwindcss },
  { name: "Framer", color: "#0055FF", icon: SiFramer },
  { name: "Docker", color: "#2496ED", icon: SiDocker },
  { name: "Kubernetes", color: "#326CE5", icon: SiKubernetes },
  { name: "Git", color: "#F05032", icon: SiGit },
  { name: "CI/CD", color: "#2088FF", icon: SiGithubactions },
  { name: "Selenium", color: "#43B02A", icon: SiSelenium },
  { name: "Google Cloud", color: "#4285F4", icon: SiGooglecloud },
  { name: "PostgreSQL", color: "#4169E1", icon: SiPostgresql },
  { name: "MySQL", color: "#4479A1", icon: SiMysql },
  { name: "MongoDB", color: "#47A248", icon: SiMongodb },
  { name: "SQLite", color: "#003B57", icon: SiSqlite },
  { name: "Redis", color: "#DC382D", icon: SiRedis },
  { name: "Supabase", color: "#3ECF8E", icon: SiSupabase }
];

// Slice into an inverted pyramid (38 total items)
// 9, 8, 7, 6, 5, 3
const rows = [
  techData.slice(0, 9),
  techData.slice(9, 17),
  techData.slice(17, 24),
  techData.slice(24, 30),
  techData.slice(30, 35),
  techData.slice(35, 38)
];

const TechCard = ({ tech }: { tech: TechItem }) => {
  return (
    <motion.div
      initial="idle"
      whileHover="hover"
      className="relative group rounded-xl bg-zinc-900/40 border border-zinc-800/80 p-4 flex flex-col items-center justify-center gap-3 cursor-default w-[110px] h-[110px] sm:w-[120px] sm:h-[120px]"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 ease-in-out"
        style={{
          boxShadow: `inset 0 0 0 1px ${tech.color}, 0 0 20px -5px ${tech.color}40`,
        }}
      />

      <motion.div
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.05 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex flex-col items-center justify-center gap-3 z-10 w-full"
      >
        <motion.div
          className="text-3xl filter-none"
          variants={{
            idle: { color: "rgba(161, 161, 170, 0.4)", filter: "saturate(0)" },
            hover: { color: tech.color, filter: "saturate(1)" }
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <tech.icon />
        </motion.div>

        <motion.span
          className="font-mono text-[10px] sm:text-xs text-center leading-tight"
          variants={{
            idle: { color: "rgba(161, 161, 170, 0.4)" },
            hover: { color: "rgba(255, 255, 255, 1)" }
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {tech.name}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default function TechStack() {
  return (
    <div className="w-full py-24 overflow-hidden relative">

      {/* Abstract background glow from the image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col items-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-widest uppercase mb-4">
          Tech Stack
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-4 px-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center flex-wrap gap-4">
            {row.map((tech, techIndex) => (
              <TechCard key={`${rowIndex}-${techIndex}`} tech={tech} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
