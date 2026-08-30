export interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "Sentinel: On-Chain Verification Hub",
    description: "Decentralized Web3 platform to combat misinformation using community consensus and immutable blockchain anchoring on the Sepolia Ethereum network.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/SENTINEL",
    tags: ["Web3", "React", "Node.js", "Ethereum"]
  },
  {
    title: "Biometric Attendance System",
    description: "High-performance edge-cloud classroom attendance system leveraging YOLOv8 ByteTrack and Face_Recognition for zero-lag surveillance edge cameras.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/MACRO_PROJECT_2",
    tags: ["Python", "FastAPI", "YOLOv8", "Computer Vision"]
  },
  {
    title: "OptiFlow (Task Optimization)",
    description: "AI-driven cognitive interface for task management and predictive scheduling. Uses Gemini Flash generative AI to break down complex objectives into micro-tasks.",
    image: "/optiflow_pure_ui.png",
    githubUrl: "https://github.com/ADITYASINGH1206/Vibe2Ship26",
    tags: ["React", "Node.js", "Generative AI", "FastAPI"]
  },
  {
    title: "TradingView Optimizer",
    description: "A quantitative analytics and backtesting extension to optimize complex trading strategies and visualize statistical models directly within TradingView.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/TradingView-Optimizer",
    tags: ["JavaScript", "Finance", "Data Analytics", "Chrome Extension"]
  },
  {
    title: "MITS Result Extractor",
    description: "Automated result scraper and analytics dashboard. Solves CAPTCHAs using Selenium and TrOCR AI, syncs data to Google Sheets, and serves interactive metrics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/MITS_Result_Extractor",
    tags: ["Python", "Selenium", "React", "FastAPI"]
  },
  {
    title: "AI Finance Controller",
    description: "An intelligent, AI-powered dashboard for modern finance teams to automate reconciliation, catch anomalies, and close books faster.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/ai-finance-controller",
    tags: ["AI", "Finance", "Dashboard", "Automation"]
  },
  {
    title: "MirAI Study OS",
    description: "MirAI Internship Assignments & Capstone Project (Study OS). An intelligent operating system concept designed to optimize study workflows and enhance productivity.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/MIRAI",
    tags: ["Productivity", "OS", "Internship", "Capstone"]
  }
];
