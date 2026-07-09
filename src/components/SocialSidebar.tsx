import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function SocialSidebar() {
  const socials = [
    { name: "GitHub", icon: FaGithub, url: "https://github.com/adityasingh1206" },
    { name: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/in/adityasingh1206" },
    { name: "Twitter", icon: FaTwitter, url: "#" },
    { name: "Email", icon: Mail, url: "mailto:adityakumarsingh@example.com" },
  ];

  return (
    <div className="fixed left-6 bottom-0 hidden md:flex flex-col items-center gap-6 z-50">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/50 hover:text-primary hover:-translate-y-1 transition-all duration-200"
          title={social.name}
        >
          <social.icon className="w-5 h-5" />
        </a>
      ))}
      {/* Decorative vertical line */}
      <div className="w-[1px] h-24 bg-foreground/20 mt-4"></div>
    </div>
  );
}
