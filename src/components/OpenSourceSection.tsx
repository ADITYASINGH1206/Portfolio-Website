"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitMerge, ExternalLink, GitPullRequest, Cpu, Variable, Layers, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { openSourceContributions } from "@/data/openSource";

type FilterCategory = "All" | "PyTensor" | "OpenVINO" | "Kestra";

export default function OpenSourceSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredContributions = activeFilter === "All"
    ? openSourceContributions
    : openSourceContributions.filter((c) => c.category === activeFilter);

  const categories: { label: string; value: FilterCategory }[] = [
    { label: "All Merged", value: "All" },
    { label: "PyMC / PyTensor", value: "PyTensor" },
    { label: "Intel OpenVINO", value: "OpenVINO" },
    { label: "Kestra Ecosystem", value: "Kestra" },
  ];

  return (
    <section id="open-source" className="w-full py-24 bg-background relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs uppercase tracking-widest mb-4">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Upstream Engineering</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-widest uppercase mb-4 text-center">
            Open Source
          </h2>
          <p className="text-foreground/60 text-sm md:text-base font-light text-center max-w-2xl">
            Selected merged pull requests across mathematical compiler backends, deep learning inference runtimes, and distributed workflow orchestrators.
          </p>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center">
            <span className="text-2xl md:text-3xl font-black text-foreground font-mono">15+</span>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider mt-1">Merged PRs</span>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-blue-400 text-sm font-bold font-mono">
              <Variable className="w-4 h-4" /> PyMC / PyTensor
            </div>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider mt-1">Math & Graph Engine</span>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-orange-400 text-sm font-bold font-mono">
              <Cpu className="w-4 h-4" /> Intel OpenVINO
            </div>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider mt-1">Runtime Optimization</span>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-purple-400 text-sm font-bold font-mono">
              <Layers className="w-4 h-4" /> Kestra Core & Cloud
            </div>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider mt-1">Enterprise Plugins</span>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeFilter === cat.value
                  ? "bg-primary text-black font-bold shadow-lg shadow-primary/20 scale-105"
                  : "bg-zinc-900/60 border border-white/5 text-foreground/70 hover:text-foreground hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Curated Contributions Cards */}
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
                className="group relative flex flex-col justify-between bg-zinc-900/40 border border-white/5 rounded-2xl p-6 md:p-7 overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/5"
              >
                {/* Ambient glow accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors" />

                <div>
                  {/* Top Bar: Repository, Impact Badge, Merged Pill */}
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
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                        {contrib.impactBadge}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        <GitMerge className="w-3 h-3 text-purple-400" />
                        Merged
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                    <a
                      href={contrib.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {contrib.title}
                    </a>
                  </h3>

                  {/* High-level Headline */}
                  <p className="text-xs font-mono text-primary/80 mb-5 leading-relaxed">
                    {contrib.headline}
                  </p>

                  {/* Technical Analysis Cards */}
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="bg-black/30 border border-white/5 rounded-lg p-3 text-xs leading-relaxed">
                      <div className="flex items-center gap-1.5 text-amber-400/90 font-mono font-semibold mb-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Root Problem</span>
                      </div>
                      <p className="text-foreground/70 font-light">
                        {contrib.problem}
                      </p>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-lg p-3 text-xs leading-relaxed">
                      <div className="flex items-center gap-1.5 text-emerald-400/90 font-mono font-semibold mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Technical Fix & Impact</span>
                      </div>
                      <p className="text-foreground/70 font-light">
                        {contrib.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {contrib.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 bg-white/5 text-foreground/70 border border-white/5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[11px] font-mono text-foreground/40">
                      {contrib.date}
                    </span>
                    <a
                      href={contrib.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors uppercase tracking-wider font-semibold"
                    >
                      <span>PR #{contrib.prNumber}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Clean GitHub Link */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-zinc-900/30 border border-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            <FaGithub className="w-5 h-5 text-foreground/70" />
            <p className="text-xs font-mono text-foreground/70">
              Active open source contributor across PyTensor, OpenVINO, Kestra, MNE-Python, and Clad.
            </p>
          </div>
          <a
            href="https://github.com/pulls?q=is%3Apr+author%3AADITYASINGH1206"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 border border-white/10 hover:border-primary/50 text-foreground font-mono text-xs uppercase tracking-widest rounded-lg transition-all hover:bg-white/10 flex items-center gap-2 shrink-0"
          >
            <span>All PRs on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
