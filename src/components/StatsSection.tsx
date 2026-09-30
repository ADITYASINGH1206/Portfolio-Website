"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Target } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

// Dynamically import GitHubCalendar to prevent SSR hydration mismatches (timezone/date differences)
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

interface LeetCodeStats {
  totalSolved: number;
  rating: number;
  globalRanking: number;
}

const DEFAULT_STATS: LeetCodeStats = {
  totalSolved: 1114,
  rating: 2007,
  globalRanking: 21629,
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
            rating: data.rating || DEFAULT_STATS.rating,
            globalRanking: data.globalRanking || DEFAULT_STATS.globalRanking,
          });
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

          {/* DSA Platforms - Bottom Row (Clickable Clean Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
            {/* Card 1: LeetCode Problems Solved */}
            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-zinc-900/40 border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#FFA116]/50 transition-colors cursor-pointer"
              aria-label="View Aditya's LeetCode Profile: Problems Solved"
            >
              {/* Ambient glow per card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-foreground/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-[#FFA116]/10 transition-colors" />

              <SiLeetcode className="w-10 h-10 mb-4 text-[#FFA116]" />
              <h3 className="text-sm font-mono tracking-widest text-foreground/60 uppercase mb-2">
                LeetCode
              </h3>

              <div className="text-4xl font-black text-foreground tabular-nums tracking-tighter">
                <Counter from={0} to={stats.totalSolved} />
                <span className="text-[#FFA116] ml-1">+</span>
              </div>

              <p className="mt-2 text-foreground/40 font-light text-xs text-center">
                Problems Solved
              </p>
            </a>

            {/* Card 2: LeetCode Rating */}
            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-zinc-900/40 border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-orange-500/50 transition-colors cursor-pointer"
              aria-label="View Aditya's LeetCode Profile: Contest Rating"
            >
              {/* Ambient glow per card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-foreground/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-orange-500/10 transition-colors" />

              <Target className="w-10 h-10 mb-4 text-orange-500" />
              <h3 className="text-sm font-mono tracking-widest text-foreground/60 uppercase mb-2">
                LeetCode Rating
              </h3>

              <div className="text-4xl font-black text-foreground tabular-nums tracking-tighter">
                <Counter from={0} to={stats.rating} />
              </div>

              <p className="mt-2 text-foreground/40 font-light text-xs text-center">
                Global Rank #{stats.globalRanking.toLocaleString()}
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
