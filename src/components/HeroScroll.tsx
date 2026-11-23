"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
    <div id="about" ref={containerRef} className="relative h-[200vh] w-full">
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
                  <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/20 bg-primary/10 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Software Developer · Data Science · Quant
                  </span>
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-5 text-gradient">
                    Aditya Kumar Singh
                  </h1>
                  <p className="text-lg md:text-xl text-foreground/65 font-light max-w-lg mx-auto md:mx-0">
                    I build AI products and developer tools, and ship fixes to open-source projects like PyTensor, OpenVINO and Kestra.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                    <Link
                      href="/#projects"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", "/#projects");
                      }}
                      className="rounded-lg bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black transition-opacity hover:opacity-90"
                    >
                      View projects
                    </Link>
                    <Link
                      href="/#open-source"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("open-source")?.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", "/#open-source");
                      }}
                      className="rounded-lg border border-white/15 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
                    >
                      Open source
                    </Link>
                  </div>
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
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gradient">
                    From algorithms to production.
                  </h2>
                  <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed max-w-xl mx-auto md:mx-0">
                    AI & Data Science undergraduate and competitive programmer. I build AI products, browser extensions and quantitative backtesting tools in Python, TypeScript and C++, and contribute fixes and features upstream to PyTensor, OpenVINO and Kestra.
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
                        <Image
              src="/aditya_kumar_singh.jpeg"
              alt="Portrait of Aditya Kumar Singh"
              fill
              className="object-cover"
            />
            {/* Overlay gradient to blend into the dark theme a bit */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
