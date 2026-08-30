import ProjectsGrid from "@/components/ProjectsGrid";
import TechStack from "@/components/TechStack";
import StatsSection from "@/components/StatsSection";
import HeroScroll from "@/components/HeroScroll";
import ExperienceScroll from "@/components/ExperienceScroll";
import SocialSidebar from "@/components/SocialSidebar";
import TopNav from "@/components/TopNav";
import ContactSection from "@/components/ContactSection";
import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Home() {
  // Show only the first 4 projects on the homepage
  const featuredProjects = projects.slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans relative">

      {/* Global Overlays */}
      <TopNav />
      <SocialSidebar />

      {/* Scroll Sequences */}
      <HeroScroll />
      <ExperienceScroll />

      {/* Projects Grid Section */}
      <section id="projects" className="w-full py-24 bg-background relative z-10">
        <div className="flex flex-col items-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-widest uppercase mb-4 text-center">
            Projects
          </h2>
        </div>
        <ProjectsGrid projectsToShow={featuredProjects} />

        <div className="flex justify-center mt-12">
          <Link
            href="/projects"
            className="px-8 py-3 bg-white/5 border border-white/10 hover:border-primary/50 text-foreground font-mono tracking-widest uppercase text-sm rounded-lg transition-all duration-300 hover:bg-white/10"
          >
            View All Projects
          </Link>
        </div>
      </section>

      {/* GitHub & DSA Stats Section */}
      <StatsSection />

      {/* Comprehensive Tech Stack Section */}
      <section id="tech-stack" className="w-full pb-24 bg-[#09090b] relative z-10">
        <TechStack />
      </section>

      {/* Contact Section */}
      <ContactSection />

    </main>
  );
}