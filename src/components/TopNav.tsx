import React from "react";

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
      {/* Empty div for left side to keep flex space-between intact */}
      <div></div>

      {/* Right side navigation / Resume */}
      <div className="pointer-events-auto">
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold px-5 py-2.5 bg-transparent text-primary border border-primary hover:bg-primary/10 transition-colors duration-300 uppercase tracking-widest backdrop-blur-md"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
