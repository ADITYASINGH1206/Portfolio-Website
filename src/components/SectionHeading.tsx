import React from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function SectionHeading({ eyebrow, title, subtitle, icon }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center mb-14 px-4">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary font-mono text-[11px] uppercase tracking-[0.2em] mb-5">
        {icon}
        {eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient">{title}</h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-sm md:text-base font-light text-foreground/55 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
