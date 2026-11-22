import React from "react";
import SectionHeading from "@/components/SectionHeading";
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

interface TechGroup {
  label: string;
  items: TechItem[];
}

const groups: TechGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Python", color: "#3776AB", icon: SiPython },
      { name: "TypeScript", color: "#3178C6", icon: SiTypescript },
      { name: "JavaScript", color: "#F7DF1E", icon: SiJavascript },
      { name: "C++", color: "#00599C", icon: SiCplusplus },
      { name: "C", color: "#A8B9CC", icon: SiC },
      { name: "Java", color: "#007396", icon: FaJava },
      { name: "Pine Script", color: "#2962FF", icon: FunctionSquare },
      { name: "HTML5/CSS3", color: "#E34F26", icon: SiHtml5 },
    ],
  },
  {
    label: "AI & Data",
    items: [
      { name: "PyTorch", color: "#EE4C2C", icon: SiPytorch },
      { name: "Hugging Face", color: "#FFD21E", icon: SiHuggingface },
      { name: "OpenCV", color: "#5C3EE8", icon: SiOpencv },
      { name: "ONNX", color: "#005CED", icon: Network },
      { name: "DeepStream", color: "#76B900", icon: Cpu },
      { name: "ArcFace", color: "#FF4F8B", icon: Brain },
      { name: "NumPy", color: "#4DABCF", icon: SiNumpy },
      { name: "Pandas", color: "#E70488", icon: SiPandas },
      { name: "Scikit-Learn", color: "#F7931E", icon: SiScikitlearn },
    ],
  },
  {
    label: "Web & Backend",
    items: [
      { name: "React", color: "#61DAFB", icon: SiReact },
      { name: "Node.js", color: "#339933", icon: SiNodedotjs },
      { name: "Express", color: "#FFFFFF", icon: SiExpress },
      { name: "FastAPI", color: "#009688", icon: SiFastapi },
      { name: "Flask", color: "#FFFFFF", icon: SiFlask },
      { name: "Tailwind", color: "#06B6D4", icon: SiTailwindcss },
      { name: "Framer", color: "#0055FF", icon: SiFramer },
    ],
  },
  {
    label: "Data & Infra",
    items: [
      { name: "PostgreSQL", color: "#4169E1", icon: SiPostgresql },
      { name: "MySQL", color: "#4479A1", icon: SiMysql },
      { name: "MongoDB", color: "#47A248", icon: SiMongodb },
      { name: "SQLite", color: "#0F80CC", icon: SiSqlite },
      { name: "Redis", color: "#DC382D", icon: SiRedis },
      { name: "Supabase", color: "#3ECF8E", icon: SiSupabase },
      { name: "Docker", color: "#2496ED", icon: SiDocker },
      { name: "Kubernetes", color: "#326CE5", icon: SiKubernetes },
      { name: "Google Cloud", color: "#4285F4", icon: SiGooglecloud },
      { name: "Git", color: "#F05032", icon: SiGit },
      { name: "CI/CD", color: "#2088FF", icon: SiGithubactions },
      { name: "Selenium", color: "#43B02A", icon: SiSelenium },
    ],
  },
];

const Chip = ({ tech }: { tech: TechItem }) => (
  <li
    className="group flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3.5 py-2 transition-colors duration-200 hover:border-[var(--tech)]/60"
    style={{ "--tech": tech.color } as React.CSSProperties}
  >
    <tech.icon className="h-4 w-4 text-foreground/40 transition-colors duration-200 group-hover:text-[var(--tech)]" />
    <span className="font-mono text-xs text-foreground/60 transition-colors duration-200 group-hover:text-foreground">
      {tech.name}
    </span>
  </li>
);

export default function TechStack() {
  return (
    <div className="w-full pt-28 relative">
      <SectionHeading eyebrow="Toolbox" title="Tech stack" />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-10 gap-y-10 px-4 md:grid-cols-2 md:px-8">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <Chip key={tech.name} tech={tech} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
