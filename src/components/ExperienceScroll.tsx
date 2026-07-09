"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const experiences = [
  {
    role: "Quantitative Developer Intern",
    company: "Alpha Fund Partners",
    date: "Summer 2025",
    description: "Architected high-frequency trading pipelines in C++. Reduced latency by 15% through aggressive memory optimization and kernel bypassing.",
    skills: ["C++", "Python", "Linux", "Low Latency"]
  },
  {
    role: "AI / Edge Computing Researcher",
    company: "University Vision Lab",
    date: "Fall 2024 - Present",
    description: "Deploying facial recognition models (ArcFace) and object detection (YOLO) directly onto NVIDIA Jetson Nano hardware using DeepStream.",
    skills: ["Jetson Nano", "DeepStream", "TensorRT", "Computer Vision"]
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Tech Solutions Inc.",
    date: "Summer 2024",
    description: "Developed and maintained highly concurrent microservices using Node.js and Go. Improved database query efficiency leading to 40% faster load times.",
    skills: ["Node.js", "React", "PostgreSQL", "Docker"]
  }
];

export default function ExperienceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track scroll and update the active index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // We have 3 experiences. Divide the 0-1 progress space.
    // 0.0 - 0.33 = index 0
    // 0.33 - 0.66 = index 1
    // 0.66 - 1.0 = index 2
    const total = experiences.length;
    const progressPerItem = 1 / total;
    
    // Calculate index based on progress, capping at total-1
    let index = Math.floor(latest / progressPerItem);
    if (index >= total) index = total - 1;
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#09090b]">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden max-w-5xl mx-auto px-4 md:px-12">
        
        <div className="w-full flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Left Column: Title / Sticky Info */}
          <div className="md:w-1/3 flex flex-col justify-center">
            <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-4">
              Career Timeline
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter">
              Experience.
            </h3>
            <p className="mt-6 text-foreground/50 font-light text-lg">
              Scroll down to explore my professional background and research endeavors.
            </p>
          </div>

          {/* Right Column: Experience List */}
          <div className="md:w-2/3 flex flex-col justify-center gap-12 relative">
            
            {/* A vertical tracking line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-800">
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
                  className={`pl-8 relative transition-all duration-500 ease-in-out ${isActive ? "opacity-100 scale-100" : "opacity-30 scale-95 blur-[2px]"}`}
                >
                  <div className={`absolute left-[-5px] top-2 w-3 h-3 rounded-full transition-colors duration-500 ${isActive ? "bg-primary shadow-[0_0_10px_rgba(34,197,94,1)]" : "bg-zinc-700"}`} />
                  
                  <span className="font-mono text-primary text-sm tracking-widest">{exp.date}</span>
                  <h4 className="text-2xl md:text-3xl font-bold text-foreground mt-2">{exp.role}</h4>
                  <p className="text-xl text-foreground/70 font-light mt-1">{exp.company}</p>
                  <p className="text-foreground/60 mt-4 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-mono rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
