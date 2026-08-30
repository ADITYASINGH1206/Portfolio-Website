"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-24 bg-[#09090b] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          
          {/* Left Column: Typography */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-extrabold text-zinc-100 tracking-tight mb-6 font-sans">
                Let&apos;s talk.
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-md">
                Have a project or need help? Fill out the form, and we&apos;ll get back to you soon.
              </p>
            </div>
          </motion.div>

          {/* Right Column: The Form Card */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center md:justify-end"
          >
            <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm">
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-400">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe"
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-400">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="john@example.com"
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="project" className="text-sm font-medium text-zinc-400">
                    Project Details
                  </label>
                  <textarea 
                    id="project" 
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 0.98, opacity: 0.9 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-zinc-100 text-[#09090b] font-medium rounded-lg px-4 py-3 mt-2"
                >
                  Send Message
                </motion.button>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
