"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
  logo: string | null;
  platforms?: { name: string; logo: string; color: string }[];
  accentColor: string;
  accentGlow: string;
  badgeBorder: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Chief Technology Officer",
    company: "OnekByte Labs",
    date: "Feb 2026 - Present",
    description: "Architecting zero-cloud Edge AI platforms running deep learning models natively on local silicon. Leading hardware-software co-design using DeepStream and ONNX to minimize inference latency.",
    skills: ["Computer Vision", "Edge Computing", "C++", "Python", "ONNX", "DeepStream"],
    logo: "/images/experience/onekbyte.svg",
    accentColor: "#f97316",
    accentGlow: "rgba(249, 115, 22, 0.26)",
    badgeBorder: "border-orange-500/40"
  },
  {
    role: "Project Lead Developer",
    company: "Optimus",
    date: "May 2024 - Present",
    description: "Led architecture of high-performance quantitative tools. Optimized low-latency pipelines handling 10+ years of OHLC data. Engineered rule-based fractal indicators and robust Dockerized infrastructure.",
    skills: ["Pine Script", "Python", "JavaScript", "Docker", "REST APIs", "Manifest V3"],
    logo: "/images/experience/optimus.svg",
    accentColor: "#2563eb",
    accentGlow: "rgba(37, 99, 235, 0.32)",
    badgeBorder: "border-blue-500/40"
  },
  {
    role: "Algorithmic Strategy Developer",
    company: "Freelance",
    date: "Jun 2021 - Mar 2024",
    description: "Delivered 300+ custom automation projects with 98% satisfaction across Upwork and Fiverr. Developed low-latency MERN dashboards and advanced fractal algorithms using Pine Script and Python for market screening.",
    skills: ["Node.js (MERN)", "Pine Script", "Python", "REST APIs", "Full-Stack"],
    logo: null,
    platforms: [
      { name: "Upwork", logo: "/images/experience/upwork.svg", color: "#14a800" },
      { name: "Fiverr", logo: "/images/experience/fiverr.svg", color: "#1dbf73" }
    ],
    accentColor: "#22c55e",
    accentGlow: "rgba(34, 197, 94, 0.25)",
    badgeBorder: "border-emerald-500/40"
  }
];

export default function ExperienceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic continuous parallax transformations tied to scroll
  const logoY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.05, 0.94]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = experiences.length;
    const progressPerItem = 1 / total;
    let index = Math.floor(latest / progressPerItem);
    if (index >= total) index = total - 1;
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const activeExp = experiences[activeIndex];

  return (
    <div ref={containerRef} className="relative h-[260vh] w-full bg-[#09090b]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden max-w-6xl mx-auto px-4 md:px-12 relative">
        
        {/* ================= BACKGROUND COMPANY LOGO ANIMATION LAYER ================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center md:justify-end pr-0 md:pr-16 z-0">
          
          {/* Ambient Brand Color Radial Glow */}
          <motion.div
            key={`glow-${activeExp.company}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-[360px] h-[360px] md:w-[600px] md:h-[600px] rounded-full blur-[130px] pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeExp.accentGlow} 0%, rgba(9,9,11,0) 70%)`
            }}
          />

          {/* Futuristic Orbital Decorative Ring reacting to scroll */}
          <motion.div
            style={{ rotate: ringRotate }}
            className="absolute w-[320px] h-[320px] md:w-[540px] md:h-[540px] rounded-full border border-white/[0.04] pointer-events-none flex items-center justify-center"
          >
            <div className="w-[84%] h-[84%] rounded-full border border-dashed border-white/[0.05] animate-[spin_80s_linear_infinite]" />
            <div 
              className="absolute top-0 w-2.5 h-2.5 rounded-full blur-[1px]" 
              style={{ backgroundColor: activeExp.accentColor, opacity: 0.6 }}
            />
          </motion.div>

          {/* Company Watermark Logo with Parallax & Smooth Transitions */}
          <motion.div
            style={{ y: logoY, rotate: logoRotate, scale: logoScale }}
            className="relative z-0 flex items-center justify-center w-[260px] h-[260px] md:w-[460px] md:h-[460px] select-none"
          >
            <AnimatePresence mode="wait">
              {activeExp.logo ? (
                <motion.div
                  key={activeExp.company}
                  initial={{ opacity: 0, scale: 0.82, filter: "blur(14px)", y: 15 }}
                  animate={{ 
                    opacity: activeExp.company === "Optimus" ? 0.38 : 0.28, 
                    scale: 1, 
                    filter: "blur(0px)", 
                    y: 0 
                  }}
                  exit={{ opacity: 0, scale: 1.12, filter: "blur(14px)", y: -15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center p-4"
                >
                  <Image
                    src={activeExp.logo}
                    alt={`${activeExp.company} background watermark`}
                    width={480}
                    height={480}
                    priority
                    unoptimized
                    className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(255,255,255,0.08)]"
                  />
                </motion.div>
              ) : (
                /* Freelance / Upwork & Fiverr Watermark */
                <motion.div
                  key="freelance-watermark"
                  initial={{ opacity: 0, scale: 0.82, filter: "blur(14px)", y: 15 }}
                  animate={{ opacity: 0.35, scale: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, scale: 1.12, filter: "blur(14px)", y: -15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex flex-col items-center justify-center gap-6 p-4"
                >
                  <div className="flex items-center justify-center gap-6 md:gap-10 w-full max-w-[440px]">
                    <div className="w-[120px] h-[75px] md:w-[150px] md:h-[95px] flex items-center justify-center filter drop-shadow-[0_0_25px_rgba(20,168,0,0.45)]">
                      <Image
                        src="/images/experience/upwork.svg"
                        alt="Upwork"
                        width={150}
                        height={95}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="h-16 w-[1px] bg-emerald-500/30" />
                    <div className="w-[130px] h-[75px] md:w-[160px] md:h-[95px] flex items-center justify-center filter drop-shadow-[0_0_25px_rgba(29,191,115,0.45)]">
                      <Image
                        src="/images/experience/fiverr.svg"
                        alt="Fiverr"
                        width={160}
                        height={95}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 font-mono text-[11px] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Top Rated Freelance Platforms</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ================= FOREGROUND CONTENT LAYER ================= */}
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-20 relative z-10">
          
          {/* Header Column */}
          <div className="md:w-1/3 flex flex-col justify-center">
            <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-4">
              Career Timeline
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter">
              Experience.
            </h3>
            <p className="mt-4 md:mt-6 text-foreground/50 font-light text-base md:text-lg">
              Scroll down to explore my professional background and systems architecture endeavors.
            </p>
          </div>

          {/* Timeline List Column */}
          <div className="md:w-2/3 flex flex-col justify-center gap-6 md:gap-8 relative w-full">
            
            {/* Progress line */}
            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-zinc-800/80">
              <motion.div 
                className="absolute top-0 left-0 w-full"
                style={{
                  backgroundColor: activeExp.accentColor,
                  height: `${(activeIndex / (experiences.length - 1)) * 100}%`,
                  transition: "height 0.35s ease-out, background-color 0.4s ease"
                }}
              />
            </div>

            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={idx}
                  className={`pl-8 relative transition-all duration-500 ease-in-out ${
                    isActive ? "opacity-100 scale-100" : "opacity-30 scale-95 blur-[0.5px]"
                  }`}
                >
                  {/* Timeline Node Dot */}
                  <div 
                    className={`absolute left-[-5px] top-2.5 w-3 h-3 rounded-full transition-all duration-500 ${
                      isActive ? "scale-125" : "bg-zinc-700"
                    }`}
                    style={{
                      backgroundColor: isActive ? exp.accentColor : undefined,
                      boxShadow: isActive ? `0 0 12px ${exp.accentColor}` : "none"
                    }}
                  />
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span 
                      className="font-mono text-xs md:text-sm tracking-widest transition-colors duration-300"
                      style={{ color: isActive ? exp.accentColor : "inherit" }}
                    >
                      {exp.date}
                    </span>

                    {/* Company Logo Badge or Platform Badges */}
                    {exp.logo ? (
                      <div className={`relative w-7 h-7 rounded-md overflow-hidden border ${isActive ? exp.badgeBorder : "border-zinc-800"} bg-zinc-900/90 p-1 flex items-center justify-center transition-all duration-300 ${isActive ? "shadow-md scale-105" : "opacity-60"}`}>
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} icon`}
                          width={28}
                          height={28}
                          className="object-contain w-full h-full"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        {exp.platforms?.map(platform => (
                          <div 
                            key={platform.name}
                            className={`relative px-2 py-0.5 rounded-md border ${isActive ? "border-emerald-500/40 bg-zinc-900/95" : "border-zinc-800 bg-zinc-900/50"} flex items-center gap-1.5 transition-all duration-300 ${isActive ? "shadow-sm scale-105" : "opacity-60"}`}
                          >
                            <div className="w-3.5 h-3.5 relative flex items-center justify-center">
                              <Image 
                                src={platform.logo} 
                                alt={platform.name} 
                                width={14} 
                                height={14} 
                                className="object-contain w-full h-full" 
                                unoptimized 
                              />
                            </div>
                            <span className="text-[10px] md:text-[11px] font-mono text-zinc-300 font-medium">{platform.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <h4 className="text-xl md:text-3xl font-bold text-foreground mt-1 md:mt-2">{exp.role}</h4>
                  <p className="text-lg md:text-xl text-foreground/75 font-light mt-0.5">{exp.company}</p>
                  
                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-foreground/60 mt-3 md:mt-4 text-sm md:text-base leading-relaxed max-w-xl">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-6 mb-2">
                      {exp.skills.map(skill => (
                        <span 
                          key={skill} 
                          className="px-2.5 py-1 bg-zinc-900/90 border border-zinc-800/80 text-zinc-300 text-xs font-mono rounded-md hover:border-zinc-700 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

