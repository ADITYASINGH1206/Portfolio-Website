"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitMerge, ExternalLink, GitPullRequest } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  openSourceContributions,
  formatMergedDate,
  type OpenSourceCategory,
} from "@/data/openSource";
import SectionHeading from "@/components/SectionHeading";

type Filter = "All" | OpenSourceCategory;

const ACCENTS: Record<OpenSourceCategory, string> = {
  PyTensor: "#60a5fa",
  OpenVINO: "#fb923c",
  Kestra: "#c084fc",
};

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "All" },
  { label: "PyTensor", value: "PyTensor" },
  { label: "OpenVINO", value: "OpenVINO" },
  { label: "Kestra", value: "Kestra" },
];

export default function OpenSourceSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const visible =
    activeFilter === "All"
      ? openSourceContributions
      : openSourceContributions.filter((c) => c.category === activeFilter);

  const countFor = (value: Filter) =>
    value === "All"
      ? openSourceContributions.length
      : openSourceContributions.filter((c) => c.category === value).length;

  return (
    <section id="open-source" className="w-full py-28 relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Open Source"
          title="Merged upstream"
          subtitle="Bug fixes, performance work and new features shipped to PyTensor, OpenVINO and Kestra, each reviewed and merged by the maintainers."
          icon={<GitPullRequest className="w-3.5 h-3.5" />}
        />

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter contributions by project"
          className="mx-auto mb-10 flex w-fit flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
        >
          {FILTERS.map((f) => {
            const active = activeFilter === f.value;
            return (
              <button
                key={f.value}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(f.value)}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs tracking-wide transition-colors duration-200 ${
                  active
                    ? "bg-primary text-black font-semibold"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {f.label}
                <span className={`text-[10px] ${active ? "text-black/60" : "text-foreground/35"}`}>
                  {countFor(f.value)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((c, idx) => {
              const accent = ACCENTS[c.category];
              return (
                <motion.article
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  style={{ "--accent": accent } as React.CSSProperties}
                  className="card group relative flex flex-col overflow-hidden rounded-2xl p-6"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px opacity-70"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                  />

                  {/* Meta row */}
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <a
                      href={c.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 items-center gap-2 font-mono text-xs text-foreground/60 transition-colors hover:text-foreground"
                    >
                      <FaGithub className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{c.repo}</span>
                    </a>
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[11px] text-purple-300">
                      <GitMerge className="h-3 w-3" />
                      Merged
                    </span>
                  </div>

                  <span
                    className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: accent }}
                  >
                    {c.kind}
                  </span>

                  <h3 className="text-lg font-bold leading-snug text-foreground md:text-xl">
                    <a href={c.prUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {c.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-foreground/65">{c.summary}</p>

                  {/* Problem / Fix */}
                  <dl className="mt-5 space-y-3 border-l border-white/10 pl-4 text-[13px] leading-relaxed">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-amber-400/80">Problem</dt>
                      <dd className="mt-0.5 font-light text-foreground/60">{c.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/80">Fix</dt>
                      <dd className="mt-0.5 font-light text-foreground/60">{c.fix}</dd>
                    </div>
                  </dl>

                  {/* Footer */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {c.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-foreground/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={c.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-foreground/50 transition-colors hover:text-primary"
                    >
                      <time dateTime={c.mergedOn}>{formatMergedDate(c.mergedOn)}</time>
                      <span className="text-foreground/20">·</span>
                      <span>#{c.prNumber}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer link */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:flex-row">
          <p className="text-center font-mono text-xs text-foreground/55 sm:text-left">
            15+ merged PRs in total, including MNE-Python and Clad.
          </p>
          <a
            href="https://github.com/pulls?q=is%3Apr+author%3AADITYASINGH1206"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-all hover:border-primary/50 hover:bg-white/10"
          >
            All PRs on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
