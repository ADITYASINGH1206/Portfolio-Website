import ProjectsGrid from "@/components/ProjectsGrid";
import TechStack from "@/components/TechStack";
import StatsSection from "@/components/StatsSection";
import HeroScroll from "@/components/HeroScroll";
import ExperienceScroll from "@/components/ExperienceScroll";
import SocialSidebar from "@/components/SocialSidebar";
import TopNav from "@/components/TopNav";
import ContactSection from "@/components/ContactSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import SectionHeading from "@/components/SectionHeading";
import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Home() {
  // Show the top 4 flagship projects on the homepage
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
      <section id="projects" className="w-full py-28 relative z-10">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          subtitle="AI agents, quantitative tooling and full-stack products, built end to end."
        />
        <ProjectsGrid projectsToShow={featuredProjects} />

        <div className="flex justify-center mt-12">
          <Link
            href="/projects"
            className="px-6 py-2.5 bg-white/5 border border-white/10 hover:border-primary/50 text-foreground font-mono tracking-widest uppercase text-xs rounded-lg transition-all duration-300 hover:bg-white/10"
          >
            Show all projects
          </Link>
        </div>
      </section>

      {/* Open Source Contributions Section */}
      <OpenSourceSection isPreview />

      {/* GitHub & DSA Stats Section */}
      <StatsSection />

      {/* Comprehensive Tech Stack Section */}
      <section id="tech-stack" className="w-full pb-24 relative z-10">
        <TechStack />
      </section>

      {/* Contact Section */}
      <ContactSection />

    </main>
  );
}
