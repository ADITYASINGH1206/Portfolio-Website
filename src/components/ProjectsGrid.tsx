"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/data/projects";

interface ProjectsGridProps {
  projectsToShow: Project[];
}

const MAX_TAGS = 4;

export default function ProjectsGrid({ projectsToShow }: ProjectsGridProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsToShow.map((project, idx) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
            className="card group relative flex flex-col overflow-hidden rounded-2xl"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6 pt-4">
              <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mt-2 mb-5 flex-1 text-sm font-light leading-relaxed text-foreground/60 line-clamp-3">
                {project.description}
              </p>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {project.tags.slice(0, MAX_TAGS).map((tag) => (
                  <span key={tag} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-foreground/65">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-5 border-t border-white/5 pt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs tracking-wider text-foreground/60 transition-colors hover:text-primary"
                  >
                    <FaGithub className="h-4 w-4" /> Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs tracking-wider text-foreground/60 transition-colors hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" /> Live
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
