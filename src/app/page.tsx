import ProjectsGrid from "@/components/ProjectsGrid";
import TechStack from "@/components/TechStack";
import StatsSection from "@/components/StatsSection";
import HeroScroll from "@/components/HeroScroll";
import ExperienceScroll from "@/components/ExperienceScroll";
import SocialSidebar from "@/components/SocialSidebar";
import TopNav from "@/components/TopNav";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans relative">
      
      {/* Global Overlays */}
      <TopNav />
      <SocialSidebar />
      
      {/* Scroll Sequences */}
      <HeroScroll />
      <ExperienceScroll />

      {/* 2x2 Projects Grid Section */}
      <section id="projects" className="w-full py-24 bg-background relative z-10">
        <div className="flex flex-col items-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-widest uppercase mb-4 text-center">
            Projects
          </h2>
        </div>
        <ProjectsGrid />
      </section>

      {/* GitHub & DSA Stats Section */}
      <StatsSection />

      {/* Comprehensive Tech Stack Section */}
      <section id="tech-stack" className="w-full pb-24 bg-[#09090b] relative z-10">
        <TechStack />
      </section>
      
    </main>
  );
}
