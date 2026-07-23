"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Sentinel: On-Chain Verification Hub",
    description: "Decentralized Web3 platform to combat misinformation using community consensus and immutable blockchain anchoring on the Sepolia Ethereum network.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/SENTINEL",
    tags: ["Web3", "React", "Node.js", "Ethereum"]
  },
  {
    title: "Biometric Attendance System",
    description: "High-performance edge-cloud classroom attendance system leveraging YOLOv8 ByteTrack and Face_Recognition for zero-lag surveillance edge cameras.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/MACRO_PROJECT_2",
    tags: ["Python", "FastAPI", "YOLOv8", "Computer Vision"]
  },
  {
    title: "OptiFlow (Task Optimization)",
    description: "AI-driven cognitive interface for task management and predictive scheduling. Uses Gemini Flash generative AI to break down complex objectives into micro-tasks.",
    image: "/optiflow_pure_ui.png",
    githubUrl: "https://github.com/ADITYASINGH1206/Vibe2Ship26",
    tags: ["React", "Node.js", "Generative AI", "FastAPI"]
  },
  {
    title: "TradingView Optimizer",
    description: "A quantitative analytics and backtesting extension to optimize complex trading strategies and visualize statistical models directly within TradingView.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/TradingView-Optimizer",
    tags: ["JavaScript", "Finance", "Data Analytics", "Chrome Extension"]
  }
];

export default function ProjectsGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative flex flex-col bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
          >
            {/* Image Section */}
            <div className="w-full h-64 overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-foreground/70 font-light mb-6 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono px-2 py-1 bg-white/5 text-foreground/80 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-auto">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono tracking-wider hover:text-primary transition-colors"
                  >
                    <FaGithub className="w-4 h-4" /> CODE
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono tracking-wider hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> LIVE
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
