"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Target, ExternalLink, Trophy, Flame } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

// Dynamically import GitHubCalendar to prevent SSR hydration mismatches (timezone/date differences)
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  rating: number;
  globalRanking: number;
  topPercentage: number;
  badge: string | null;
  attendedContests: number;
}

const DEFAULT_STATS: LeetCodeStats = {
  totalSolved: 1114,
  easySolved: 511,
  mediumSolved: 510,
  hardSolved: 93,
  rating: 2007,
  globalRanking: 21629,
  topPercentage: 2.54,
  badge: "Knight",
  attendedContests: 32,
};

const Counter = ({ from, to }: { from: number; to: number }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.round);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, to, { duration: 2.2, ease: "easeOut" });
      return animation.stop;
    }
  }, [count, isInView, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default function StatsSection() {
  const [stats, setStats] = useState<LeetCodeStats>(DEFAULT_STATS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const res = await fetch("/api/leetcode");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data?.success) {
          setStats({
            totalSolved: data.totalSolved || DEFAULT_STATS.totalSolved,
            easySolved: data.easySolved || DEFAULT_STATS.easySolved,
            mediumSolved: data.mediumSolved || DEFAULT_STATS.mediumSolved,
            hardSolved: data.hardSolved || DEFAULT_STATS.hardSolved,
            rating: data.rating || DEFAULT_STATS.rating,
            globalRanking: data.globalRanking || DEFAULT_STATS.globalRanking,
            topPercentage: data.topPercentage || DEFAULT_STATS.topPercentage,
            badge: data.badge || DEFAULT_STATS.badge,
            attendedContests: data.attendedContests || DEFAULT_STATS.attendedContests,
          });
          if (!data.fromFallback) {
            setIsLive(true);
          }
        }
      } catch (err) {
        console.warn("Could not load live LeetCode stats, using defaults:", err);
      }
    }

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  // Official GitHub green theme
  const githubTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  const LEETCODE_PROFILE_URL = "https://leetcode.com/u/adityasingh1206/";

  return (
    <section className="w-full py-24 bg-background relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-widest uppercase mb-4 text-center">
            Stats & Contributions
          </h2>
          <p className="text-foreground/50 text-sm font-mono tracking-wider text-center">
            Real-time coding milestones, open-source activity, and contest performance
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {/* GitHub Heatmap - Top Section */}
          <div className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-mono tracking-widest text-foreground/70 uppercase mb-8 self-start md:self-center">
              GitHub Heatmap
            </h3>

            {/* Wrapping in a container that scales down on smaller screens to prevent scrolling */}
            <div className="w-full flex justify-center overflow-hidden">
              <div className="transform scale-[0.6] sm:scale-75 md:scale-100 origin-center md:origin-top">
                <GitHubCalendar
                  username="adityasingh1206"
                  colorScheme="dark"
                  theme={githubTheme as import("react-activity-calendar").ThemeInput}
                  fontSize={14}
                  blockSize={12}
                  blockMargin={4}
                />
              </div>
            </div>
          </div>

          {/* DSA Platforms - Bottom Row (Clickable LeetCode Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {/* Card 1: LeetCode Problems Solved */}
            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center bg-zinc-900/40 border border-white/5 rounded-2xl p-8 overflow-hidden hover:border-[#FFA116]/60 hover:bg-zinc-900/70 hover:shadow-[0_0_35px_rgba(255,161,22,0.15)] transition-all duration-300 cursor-pointer text-center"
              aria-label="View Aditya's LeetCode Profile: Problems Solved"
            >
              {/* Ambient brand glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FFA116]/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#FFA116]/20 transition-all duration-500" />

              {/* External Link Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-mono text-zinc-500 group-hover:text-[#FFA116] transition-colors">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                  View Profile
                </span>
                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Live Status indicator */}
              {isLive && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <SiLeetcode className="w-9 h-9 text-[#FFA116] group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="text-sm font-mono tracking-widest text-foreground/70 uppercase mb-2">
                LeetCode Solved
              </h3>

              <div className="text-4xl md:text-5xl font-black text-foreground tabular-nums tracking-tighter mb-2">
                <Counter from={0} to={stats.totalSolved} />
                <span className="text-[#FFA116] ml-1">+</span>
              </div>

              <p className="text-foreground/50 font-light text-xs mb-4">
                Total Solved Across All Difficulties
              </p>

              {/* Difficulty breakdown pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/5 w-full">
                <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Easy: {stats.easySolved}
                </span>
                <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Med: {stats.mediumSolved}
                </span>
                <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Hard: {stats.hardSolved}
                </span>
              </div>

              <span className="mt-4 text-[11px] font-mono text-zinc-500 group-hover:text-primary transition-colors flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#FFA116]" />
                Click to open leetcode.com/u/adityasingh1206 →
              </span>
            </a>

            {/* Card 2: LeetCode Contest Rating */}
            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center bg-zinc-900/40 border border-white/5 rounded-2xl p-8 overflow-hidden hover:border-[#F59E0B]/60 hover:bg-zinc-900/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.15)] transition-all duration-300 cursor-pointer text-center"
              aria-label="View Aditya's LeetCode Profile: Contest Rating"
            >
              {/* Ambient brand glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#F59E0B]/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#F59E0B]/20 transition-all duration-500" />

              {/* External Link Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-mono text-zinc-500 group-hover:text-[#F59E0B] transition-colors">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                  View Profile
                </span>
                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Knight Badge Tag */}
              {stats.badge && (
                <div className="absolute top-4 left-4 flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  {stats.badge} Badge
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <Target className="w-9 h-9 text-[#F59E0B] group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="text-sm font-mono tracking-widest text-foreground/70 uppercase mb-2">
                LeetCode Rating
              </h3>

              <div className="text-4xl md:text-5xl font-black text-foreground tabular-nums tracking-tighter mb-2">
                <Counter from={0} to={stats.rating} />
              </div>

              <p className="text-foreground/50 font-light text-xs mb-4">
                Official Contest Rating
              </p>

              {/* Contest metrics breakdown pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/5 w-full">
                <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Top {stats.topPercentage}% Worldwide
                </span>
                <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Global Rank #{stats.globalRanking.toLocaleString()}
                </span>
              </div>

              <span className="mt-4 text-[11px] font-mono text-zinc-500 group-hover:text-primary transition-colors flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Click to inspect contest history & badges →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
