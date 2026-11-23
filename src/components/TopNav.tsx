"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Experience", href: "/#experience", targetId: "experience" },
  { label: "Projects", href: "/#projects", targetId: "projects" },
  { label: "Open Source", href: "/#open-source", targetId: "open-source" },
  { label: "Contact", href: "/#contact", targetId: "contact" },
];

export default function TopNav() {
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, href: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <nav
      aria-label="Primary"
      className="fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-zinc-950/70 p-1.5 pl-2 shadow-lg shadow-black/30 backdrop-blur-xl"
    >
      <Link
        href="/"
        onClick={(e) => {
          if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", "/");
          }
        }}
        className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 font-mono text-xs font-bold text-primary transition-transform hover:scale-105"
        aria-label="Home"
      >
        AS
      </Link>

      <ul className="hidden md:flex items-center">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={(e) => handleNavClick(e, l.targetId, l.href)}
              className="rounded-full px-3.5 py-1.5 font-mono text-xs text-foreground/60 transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-primary px-4 py-1.5 font-mono text-xs font-bold text-black transition-opacity hover:opacity-90"
      >
        Resume
      </a>
    </nav>
  );
}
