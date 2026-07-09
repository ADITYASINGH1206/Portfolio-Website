import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function SocialSidebar() {
  const socials = [
    { name: "GitHub", icon: FaGithub, url: "https://github.com/adityasingh1206", hoverColor: "hover:text-white" },
    { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/aditya-kumar-singh-93603b1b4/", hoverColor: "hover:text-[#0077b5]" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/aditya__1206", hoverColor: "hover:text-[#E1306C]" },
    { name: "Email", icon: Mail, url: "mailto:24ad10ad5@mitsgwl.ac.in", hoverColor: "hover:text-[#EA4335]" },
  ];

  return (
    <div className="fixed left-6 bottom-8 hidden md:flex flex-col items-center gap-6 z-50">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 text-foreground/50 hover:scale-110 transition-all duration-300 ${social.hoverColor}`}
          title={social.name}
        >
          <social.icon className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
}
