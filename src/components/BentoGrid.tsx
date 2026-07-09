"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, LineChart } from "lucide-react";
import React from "react";

const bentoItems = [
  {
    id: 1,
    title: "700+ LeetCode Problems Solved",
    subtitle: "C++ Focus",
    icon: <Code2 className="w-8 h-8 mb-4" />,
    className: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: 2,
    title: "Hardware AI",
    subtitle: "Jetson Nano, DeepStream, ArcFace",
    icon: <Cpu className="w-8 h-8 mb-4" />,
    className: "col-span-1 row-span-2",
  },
  {
    id: 3,
    title: "Chrome Extension",
    subtitle: "TradingView Strategy Optimizer",
    icon: <LineChart className="w-8 h-8 mb-4" />,
    className: "col-span-1 md:col-span-2 row-span-1",
  },
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4 max-w-5xl mx-auto p-4">
      {bentoItems.map((item) => (
        <motion.div
          key={item.id}
          className={`relative rounded-xl border border-white/10 bg-[#121214] p-6 flex flex-col justify-end overflow-hidden ${item.className}`}
          initial="idle"
          whileHover="hover"
          variants={{
            idle: {
              scale: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0px 0px 0px rgba(34, 197, 94, 0)",
            },
            hover: {
              scale: 1.02,
              borderColor: "rgba(34, 197, 94, 0.8)", // Primary color
              boxShadow: "0px 0px 20px rgba(34, 197, 94, 0.2)",
            },
          }}
          transition={{
            // Scale uses spring physics
            scale: { type: "spring", stiffness: 400, damping: 25 },
            // Colors use easeInOut to prevent flashing artifacts
            borderColor: { duration: 0.3, ease: "easeInOut" },
            boxShadow: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          {/* We dim the inner content in the idle state and restore it on hover */}
          <motion.div
            variants={{
              idle: { opacity: 0.6, filter: "saturate(0.5)" },
              hover: { opacity: 1, filter: "saturate(1)" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col h-full justify-between"
          >
            <div className="text-primary">{item.icon}</div>
            <div>
              <h3 className="font-sans text-xl font-bold text-foreground mb-1">{item.title}</h3>
              <p className="font-mono text-sm text-foreground/70">{item.subtitle}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
