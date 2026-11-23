"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GitMerge, ExternalLink, GitPullRequest } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  openSourceContributions,
  featuredContributions,
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

interface OpenSourceSectionProps {
  /** When true, renders a 1-per-category showcase with a "View all contributions" button */
  isPreview?: boolean;
}

export default function OpenSourceSection({ isPreview = false }: OpenSourceSectionProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const contributionsToRender = isPreview
    ? featuredContributions
    : activeFilter === "All"
    ? openSourceContributions
    : openSourceContributions.filter((c) => c.category === activeFilter);

  const countFor = (value: Filter) =>
    value === "All"
      ? openSourceContributions.length
      : openSourceContributions.filter((c) => c.category === value).length;

  return (
    <section
      id="open-source"
      className={isPreview ? "w-full py-28 relative z-10 border-t border-white/5" : "w-full relative z-10"}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {isPreview && (
          <SectionHeading
            eyebrow="Open Source"
            title="Merged upstream"
            subtitle="Bug fixes, performance work and new features shipped to PyTensor, OpenVINO and Kestra, each reviewed and merged by the maintainers."
            icon={<GitPullRequest className="w-3.5 h-3.5" />}
          />
        )}

        {/* Filter tabs (shown on the full catalog page) */}
        {!isPreview && (
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
        )}

        {/* Compact Contribution Cards Grid */}
        <div
          className={`grid gap-5 ${
            isPreview
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {contributionsToRender.map((c, idx) => {
              const accent = ACCENTS[c.category];
              return (
                <motion.article
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  style={{ "--accent": accent } as React.CSSProperties}
                  className="card group relative flex flex-col justify-between overflow-hidden rounded-xl p-5"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px opacity-70"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                  />

                  <div>
                    {/* Meta row: Repo + Kind + Merged Badge */}
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <a
                        href={c.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-foreground/60 transition-colors hover:text-foreground"
                      >
                        <FaGithub className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{c.repo}</span>
                      </a>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <span
                          className="rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider"
                          style={{ color: accent, backgroundColor: `${accent}15` }}
                        >
                          {c.kind}
                        </span>
                        <span className="flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-300">
                          <GitMerge className="h-2.5 w-2.5" />
                          Merged
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold leading-snug text-foreground">
                      <a
                        href={c.prUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-primary"
                      >
                        {c.title}
                      </a>
                    </h3>

                    {/* Summary */}
                    <p className="mt-1.5 text-xs font-light leading-relaxed text-foreground/70">
                      {c.summary}
                    </p>

                    {/* Compact Problem / Fix Box */}
                    <div className="mt-3.5 space-y-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-xs">
                      <div className="flex items-start gap-1.5">
                        <span className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-wider text-amber-400/90 pt-0.5">
                          Problem
                        </span>
                        <p className="line-clamp-2 text-[11.5px] leading-relaxed text-foreground/60">
                          {c.problem}
                        </p>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-400/90 pt-0.5">
                          Fix
                        </span>
                        <p className="line-clamp-2 text-[11.5px] leading-relaxed text-foreground/60">
                          {c.fix}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
                    <div className="flex flex-wrap gap-1">
                      {c.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-foreground/55"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={c.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-foreground/50 transition-colors hover:text-primary"
                    >
                      <time dateTime={c.mergedOn}>{formatMergedDate(c.mergedOn)}</time>
                      <span className="text-foreground/20">·</span>
                      <span>#{c.prNumber}</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action button / Footer */}
        {isPreview ? (
          <div className="mt-12 flex justify-center">
            <Link
              href="/contributions"
              className="px-6 py-2.5 bg-white/5 border border-white/10 hover:border-primary/50 text-foreground font-mono tracking-widest uppercase text-xs rounded-lg transition-all duration-300 hover:bg-white/10"
            >
              View all {openSourceContributions.length} contributions
            </Link>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}