"use client";

import React, { useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Code2, Trophy, Target, Award } from "lucide-react";

const Counter = ({ from, to }: { from: number, to: number }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.round);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, to, { duration: 2.5, ease: "easeOut" });
      return animation.stop;
    }
  }, [count, isInView, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const platforms = [
  { name: "LeetCode", count: 800, icon: Code2, label: "Problems Solved", color: "text-yellow-500", suffix: "+" },
  { name: "Codeforces", count: 1450, icon: Target, label: "Max Rating", color: "text-blue-500", suffix: "" },
  { name: "CodeChef", count: 1800, icon: Trophy, label: "Max Rating", color: "text-orange-500", suffix: "" },
  { name: "HackerRank", count: 5, icon: Award, label: "Stars in C++", color: "text-green-500", suffix: "★" }
];

export default function StatsSection() {
  // Official GitHub green theme
  const githubTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  };

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
                  theme={githubTheme as any}
                  fontSize={14}
                  blockSize={12}
                  blockMargin={4}
                />
              </div>
            </div>
          </div>

          {/* DSA Platforms - Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform) => (
              <div 
                key={platform.name}
                className="flex flex-col items-center justify-center bg-zinc-900/40 border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
              >
                {/* Ambient glow per card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-foreground/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-foreground/10 transition-colors" />
                
                <platform.icon className={`w-10 h-10 mb-4 ${platform.color}`} />
                <h3 className="text-sm font-mono tracking-widest text-foreground/60 uppercase mb-2">
                  {platform.name}
                </h3>
                
                <div className="text-4xl font-black text-foreground tabular-nums tracking-tighter">
                  <Counter from={0} to={platform.count} />
                  <span className={`${platform.color} ml-1`}>{platform.suffix}</span>
                </div>
                
                <p className="mt-2 text-foreground/40 font-light text-xs text-center">
                  {platform.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
