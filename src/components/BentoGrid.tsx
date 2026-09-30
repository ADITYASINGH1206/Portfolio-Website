"use client";

import { motion } from "framer-motion";
import { Cpu, LineChart } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import React from "react";

const bentoItems = [
  {
    id: 1,
    title: "1100+ LeetCode Problems Solved",
    subtitle: "Knight Rank • 2000+ Contest Rating",
    icon: <SiLeetcode className="w-8 h-8 mb-4 text-[#FFA116]" />,
    link: "https://leetcode.com/u/adityasingh1206/",
    className: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: 2,
    title: "Hardware AI",
    subtitle: "Jetson Nano, DeepStream, ArcFace",
    icon: <Cpu className="w-8 h-8 mb-4" />,
    link: null,
    className: "col-span-1 row-span-2",
  },
  {
    id: 3,
    title: "Chrome Extension",
    subtitle: "TradingView Strategy Optimizer",
    icon: <LineChart className="w-8 h-8 mb-4" />,
    link: null,
    className: "col-span-1 md:col-span-2 row-span-1",
  },
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4 max-w-5xl mx-auto p-4">
      {bentoItems.map((item) => {
        const content = (
          <motion.div
            key={item.id}
            className={`relative rounded-xl border border-white/10 bg-[#121214] p-6 flex flex-col justify-end overflow-hidden h-full ${item.className} ${
              item.link ? "cursor-pointer" : ""
            }`}
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
                borderColor: item.link ? "rgba(255, 161, 22, 0.8)" : "rgba(34, 197, 94, 0.8)",
                boxShadow: item.link
                  ? "0px 0px 20px rgba(255, 161, 22, 0.2)"
                  : "0px 0px 20px rgba(34, 197, 94, 0.2)",
              },
            }}
            transition={{
              scale: { type: "spring", stiffness: 400, damping: 25 },
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
        );

        if (item.link) {
          return (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={item.className}
              aria-label={`Open LeetCode profile: ${item.title}`}
            >
              {content}
            </a>
          );
        }

        return content;
      })}
    </div>
  );
}
