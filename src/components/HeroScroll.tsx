"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [phase, setPhase] = React.useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.35 && phase === 1) {
      setPhase(2);
    } else if (latest <= 0.35 && phase === 2) {
      setPhase(1);
    }
  });

  // Image animations
  // Shifts smoothly from grayscale to full color.
  const filter = useTransform(
    scrollYProgress, 
    [0, 0.4, 0.6, 1], 
    ["grayscale(100%)", "grayscale(100%)", "grayscale(0%)", "grayscale(0%)"]
  );

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full bg-background">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center gap-12 px-8 overflow-hidden max-w-6xl mx-auto">
        
        {/* Left Side: Text Transitions */}
        <div className="flex-1 relative min-h-[400px] md:min-h-[500px] w-full flex items-center">
          
          <AnimatePresence mode="wait">
            {phase === 1 ? (
              <motion.div 
                key="phase1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-center text-center md:text-left"
              >
                <div>
                  <h2 className="font-mono text-primary text-sm md:text-base tracking-widest uppercase mb-4">
                    Software Developer | Data Science | Quant
                  </h2>
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-foreground">
                    Aditya Kumar Singh
                  </h1>
                  <p className="text-lg text-foreground/70 font-light">
                    Engineering high-performance solutions.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="phase2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-center text-center md:text-left"
              >
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                    Bridging Hardware & Web.
                  </h2>
                  <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed max-w-xl mx-auto md:mx-0">
                    I am an engineering student passionate about building highly optimized web services, deploying AI pipelines on edge devices like Jetson Nano, and crafting automated quantitative trading algorithms. I thrive at the intersection of low-level performance and high-level design.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Right Side: Portrait Image (Animated) */}
        <div className="flex-1 flex justify-center md:justify-end w-full perspective-1000">
          <motion.div
            style={{ 
              filter,
              transformStyle: "preserve-3d"
            }}
            className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Dummy placeholder portrait image */}
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
              alt="Aditya Profile Placeholder"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient to blend into the dark theme a bit */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
