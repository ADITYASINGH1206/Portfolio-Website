"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitMerge, ExternalLink, GitPullRequest, Code2, Cpu, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { openSourceContributions } from "@/data/openSource";

type FilterCategory = "All" | "Kestra" | "OpenVINO" | "Research";

export default function OpenSourceSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredContributions = activeFilter === "All"
    ? openSourceContributions
    : openSourceContributions.filter((c) => c.category === activeFilter);

  const categories: FilterCategory[] = ["All", "Kestra", "OpenVINO", "Research"];

  return (
    <section id="open-source" className="w-full py-24 bg-background relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs uppercase tracking-widest mb-4">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Upstream Contributions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-widest uppercase mb-4 text-center">
            Open Source
          </h2>
          <p className="text-foreground/60 text-sm md:text-base font-light text-center max-w-2xl">
            Merged pull requests, performance optimizations, and enterprise cloud plugins across high-throughput orchestrators, deep learning runtimes, and ML research.
          </p>
        </div>

        {/* Highlight Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center">
            <span className="text-2xl md:text-3xl font-black text-foreground font-mono">15+</span>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider mt-1">Merged PRs</span>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-orange-400 text-sm font-bold font-mono">
              <Cpu className="w-4 h-4" /> OpenVINO
            </div>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider mt-1">Core Runtime</span>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-purple-400 text-sm font-bold font-mono">
              <Code2 className="w-4 h-4" /> Kestra
            </div>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider mt-1">Core & Cloud Plugins</span>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold font-mono">
              <Sparkles className="w-4 h-4" /> TMLR Study
            </div>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider mt-1">Research Benchmark</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-primary text-black font-bold shadow-lg shadow-primary/20"
                  : "bg-zinc-900/60 border border-white/5 text-foreground/70 hover:text-foreground hover:border-white/20"
              }`}
            >
              {cat === "All" ? `All Merged (${openSourceContributions.length})` : cat}
            </button>
          ))}
        </div>

        {/* Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredContributions.map((contrib, idx) => (
              <motion.div
                key={contrib.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between bg-zinc-900/40 border border-white/5 rounded-2xl p-6 md:p-7 overflow-hidden hover:border-primary/50 transition-colors duration-300"
              >
                {/* Ambient glow on hover */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors" />

                <div>
                  {/* Top Bar: Repo, Merged Badge, Date */}
                  <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                    <a
                      href={contrib.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono font-medium text-foreground/80 hover:text-primary transition-colors"
                    >
                      <FaGithub className="w-4 h-4 text-foreground/60" />
                      <span>{contrib.repo}</span>
                    </a>

                    <div className="flex items-center gap-2">
                      {contrib.impactBadge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          {contrib.impactBadge}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        <GitMerge className="w-3 h-3 text-purple-400" />
                        Merged
                      </span>
                    </div>
                  </div>

                  {/* PR Title & Number */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                    <a
                      href={contrib.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {contrib.title}
                    </a>
                  </h3>

                  {/* Technical Description */}
                  <p className="text-foreground/70 font-light text-sm mb-6 leading-relaxed">
                    {contrib.description}
                  </p>
                </div>

                <div>
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {contrib.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 bg-white/5 text-foreground/75 border border-white/5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* PR Link Button */}
                  <a
                    href={contrib.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors uppercase tracking-wider font-semibold"
                  >
                    <span>View PR #{contrib.prNumber}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* GitHub Upstream Callout Footer */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-900/30 border border-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            <FaGithub className="w-6 h-6 text-foreground/70" />
            <div>
              <h4 className="text-sm font-mono font-bold text-foreground">Explore Upstream PRs on GitHub</h4>
              <p className="text-xs text-foreground/50 font-light">Includes contributions across MNE-Python, PyTensor, Clad, DeepLense, and SugarLabs.</p>
            </div>
          </div>
          <a
            href="https://github.com/pulls?q=is%3Apr+author%3AADITYASINGH1206"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-primary/50 text-foreground font-mono text-xs uppercase tracking-widest rounded-lg transition-all hover:bg-white/10 flex items-center gap-2 shrink-0"
          >
            <span>All GitHub PRs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
