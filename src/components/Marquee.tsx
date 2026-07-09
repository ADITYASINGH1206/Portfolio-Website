"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const marqueeItems = [
  "SOFTWARE DEVELOPER",
  "DATA SCIENCE",
  "QUANTITATIVE SCRIPTS"
];

export default function Marquee() {
  // Drastically reduced speed to move very slowly (approx 20-30s per cycle)
  const baseVelocity = -0.04; 
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    const velocityMultiplier = isHovered ? 0.5 : 1;
    let moveBy = baseVelocity * velocityMultiplier * (delta / 16);

    baseX.set(baseX.get() + moveBy);

    // Reset at -50% to create seamless loop
    if (baseX.get() <= -50) {
      baseX.set(0);
    } else if (baseX.get() > 0) {
      baseX.set(-50);
    }
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  const MarqueeContent = () => (
    <div className="flex items-center space-x-8 pr-8">
      {marqueeItems.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-8">
          <span>{item}</span>
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-primary/20">
            <Image 
              src="/cube.png" 
              alt="cube icon" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div 
      className="w-full overflow-hidden bg-primary/5 border-y border-primary/20 py-4 flex whitespace-nowrap cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex font-mono text-primary tracking-widest text-sm uppercase items-center" style={{ x }}>
        {/* We render multiple copies to ensure it covers the screen during the shift */}
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </motion.div>
    </div>
  );
}
