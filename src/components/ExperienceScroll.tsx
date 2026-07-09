"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const experiences = [
  {
    role: "Chief Technology Officer",
    company: "OnekByte Labs",
    date: "Feb 2026 - Present",
    description: "Architecting zero-cloud Edge AI platforms running deep learning models natively on local silicon. Leading hardware-software co-design using DeepStream and ONNX to minimize inference latency.",
    skills: ["Computer Vision", "Edge Computing", "C++", "Python", "ONNX", "DeepStream"]
  },
  {
    role: "Project Lead Developer",
    company: "Optimus",
    date: "May 2024 - Present",
    description: "Led architecture of high-performance quantitative tools. Optimized low-latency pipelines handling 10+ years of OHLC data. Engineered rule-based fractal indicators and robust Dockerized infrastructure.",
    skills: ["Pine Script", "Python", "JavaScript", "Docker", "REST APIs", "Manifest V3"]
  },
  {
    role: "Algorithmic Strategy Developer",
    company: "Freelance",
    date: "Jun 2021 - Mar 2024",
    description: "Delivered 300+ custom automation projects with 98% satisfaction. Developed low-latency MERN dashboards and advanced fractal algorithms using Pine Script and Python for market screening.",
    skills: ["Node.js (MERN)", "Pine Script", "Python", "REST APIs", "Full-Stack"]
  }
];

export default function ExperienceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = experiences.length;
    const progressPerItem = 1 / total;
    let index = Math.floor(latest / progressPerItem);
    if (index >= total) index = total - 1;
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-[#09090b]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden max-w-5xl mx-auto px-4 md:px-12">
        
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-24">
          
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

          <div className="md:w-2/3 flex flex-col justify-center gap-6 md:gap-8 relative w-full">
            
            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-zinc-800">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-primary"
                style={{
                  height: `${(activeIndex / (experiences.length - 1)) * 100}%`,
                  transition: "height 0.3s ease-out"
                }}
              />
            </div>

            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={idx}
                  className={`pl-8 relative transition-all duration-500 ease-in-out ${isActive ? "opacity-100 scale-100" : "opacity-30 scale-95 blur-[1px]"}`}
                >
                  <div className={`absolute left-[-5px] top-2 w-3 h-3 rounded-full transition-colors duration-500 ${isActive ? "bg-primary shadow-[0_0_10px_rgba(34,197,94,1)]" : "bg-zinc-700"}`} />
                  
                  <span className="font-mono text-primary text-xs md:text-sm tracking-widest">{exp.date}</span>
                  <h4 className="text-xl md:text-3xl font-bold text-foreground mt-1 md:mt-2">{exp.role}</h4>
                  <p className="text-lg md:text-xl text-foreground/70 font-light mt-1">{exp.company}</p>
                  
                  {/* Expandable Content to prevent clipping on mobile */}
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-foreground/60 mt-3 md:mt-4 text-sm md:text-base leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-6 mb-2">
                      {exp.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs font-mono rounded-md">
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
