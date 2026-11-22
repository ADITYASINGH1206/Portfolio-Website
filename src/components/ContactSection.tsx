"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

const EMAIL = "24ad10ad5@mitsgwl.ac.in";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  // No backend: the form opens the visitor's mail client with the message pre-filled.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden border-t border-white/5 py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-6 text-5xl font-extrabold tracking-tight text-gradient md:text-7xl">
              Let&apos;s talk.
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-zinc-400">
              Have a project, an internship opening or an open-source idea? Send a note and I will reply.
            </p>

            <div className="mt-8 flex flex-col gap-3 font-mono text-sm text-zinc-400">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" /> {EMAIL}
              </a>
              <a
                href="https://github.com/adityasingh1206"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <FaGithub className="h-4 w-4" /> github.com/adityasingh1206
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-kumar-singh-93603b1b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <FaLinkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center md:justify-end"
          >
            <form onSubmit={onSubmit} className="card flex w-full max-w-md flex-col gap-5 rounded-2xl p-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-400">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-400">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-400">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={update("message")}
                  placeholder="What are you working on?"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 0.98, opacity: 0.9 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mt-1 w-full rounded-lg bg-primary px-4 py-3 font-medium text-black"
              >
                Send message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
