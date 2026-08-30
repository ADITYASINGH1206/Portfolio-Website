"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/data/projects";

interface ProjectsGridProps {
  projectsToShow: Project[];
}

export default function ProjectsGrid({ projectsToShow }: ProjectsGridProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsToShow.map((project, idx) => (
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