import OpenSourceSection from "@/components/OpenSourceSection";
import SocialSidebar from "@/components/SocialSidebar";
import TopNav from "@/components/TopNav";
import ContactSection from "@/components/ContactSection";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContributionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans relative">
      {/* Global Overlays */}
      <TopNav />
      <SocialSidebar />

      {/* Page Content */}
      <div className="pt-32 pb-24 relative z-10 w-full">
        <div className="flex flex-col items-center mb-12 px-4 max-w-6xl mx-auto w-full relative">
          <Link
            href="/"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm font-mono tracking-wider text-foreground/70 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient text-center">
            All contributions
          </h1>
          <p className="mt-3 text-sm md:text-base text-foreground/60 text-center max-w-2xl font-light">
            Upstream pull requests reviewed and merged into PyTensor, OpenVINO, and Kestra.
          </p>
        </div>

        <OpenSourceSection isPreview={false} />
      </div>

      <ContactSection />
    </main>
  );
}
