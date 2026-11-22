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
    title: "Leash: AI Agent Payment Firewall",
    description: "Institutional payment firewall for autonomous AI agents on PayPal rails. Authorize-then-capture architecture, 5-layer intent inspection, and tamper-evident SHA-256 ledger.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://leash-console.onrender.com",
    githubUrl: "https://github.com/ADITYASINGH1206/leash",
    tags: ["TypeScript", "AI Agents", "FinTech", "Cybersecurity", "PayPal"]
  },
  {
    title: "StratLab: Multi-Agent Quantitative Desk",
    description: "Quantitative trading research desk powered by 5 autonomous agents (Strategist, Pine Coder, Backtester, Skeptic, Scribe) for strategy specification, backtesting, and adversarial gate review.",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://adityasingh1206.github.io/stratlab/",
    githubUrl: "https://github.com/ADITYASINGH1206/stratlab",
    tags: ["Python", "Multi-Agent", "FinTech", "Quantitative", "Pine Script"]
  },
  {
    title: "VeriFrame: Video Deepfake Screening Platform",
    description: "Calibrated & auditable video deepfake screening service featuring spatiotemporal patch heatmaps, cryptographic Ed25519 detection receipts, and EVM Merkle anchor.",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/veriframe",
    tags: ["Python", "Computer Vision", "Deep Learning", "Cryptography", "EVM"]
  },
  {
    title: "Sentinel: On-Chain Verification Hub",
    description: "Decentralized Web3 platform to combat misinformation using community consensus and immutable blockchain anchoring on the Sepolia Ethereum network.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/SENTINEL",
    tags: ["Web3", "React", "Node.js", "Ethereum"]
  },
  {
    title: "OptiFlow (Task Optimization)",
    description: "AI-driven cognitive interface for task management and predictive scheduling. Uses Gemini Flash generative AI to break down complex objectives into micro-tasks.",
    image: "/optiflow_pure_ui.png",
    githubUrl: "https://github.com/ADITYASINGH1206/Vibe2Ship26",
    tags: ["React", "Node.js", "Generative AI", "FastAPI"]
  },
  {
    title: "Biometric Attendance System",
    description: "High-performance edge-cloud classroom attendance system leveraging YOLOv8 ByteTrack and Face_Recognition for zero-lag surveillance edge cameras.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/MACRO_PROJECT_2",
    tags: ["Python", "FastAPI", "YOLOv8", "Computer Vision"]
  },
  {
    title: "PINE-PROTOCOL: Institutional Trading Framework",
    description: "High-precision institutional trading framework in Pine Script and Python featuring SMT divergence, order block sweeps, liquidity zones, and automated execution.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/PINE-PROTOCOL",
    tags: ["Pine Script", "Python", "Algorithmic Trading", "Quantitative"]
  },
  {
    title: "Kabadi-Connect: AI Scrap Recycling Platform",
    description: "Uber-style scrap pickup for India's informal recycling economy powered by Amazon Bedrock multimodal AI and intelligent route scheduling.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/Kabadi-connect",
    tags: ["Python", "Amazon Bedrock", "Multimodal AI", "FastAPI"]
  },
  {
    title: "ATS Resume Optimizer & Evaluation Agent",
    description: "Production-ready ATS Resume-JD Optimization & Evaluation Agent built with LangGraph, Pydantic v2, Typst, and FastAPI.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/resume-optimizer",
    tags: ["Python", "LangGraph", "FastAPI", "LLMs", "Pydantic"]
  },
  {
    title: "TradingView Optimizer",
    description: "A quantitative analytics and backtesting extension to optimize complex trading strategies and visualize statistical models directly within TradingView.",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/TradingView-Optimizer",
    tags: ["JavaScript", "Finance", "Data Analytics", "Chrome Extension"]
  },
  {
    title: "MITS Result Extractor",
    description: "Automated result scraper and analytics dashboard. Solves CAPTCHAs using Selenium and TrOCR AI, syncs data to Google Sheets, and serves interactive metrics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/ADITYASINGH1206/MITS_Result_Extractor",
    tags: ["Python", "Selenium", "React", "FastAPI"]
  }
];
