import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedEngineering() {
  const projects = [
    {
      title: 'Hardware AI Pipeline',
      tech: 'NVIDIA Jetson Nano / DeepStream / ArcFace',
      desc: 'Edge-based facial recognition pipeline optimized for low-latency inference on embedded hardware.',
      link: '#'
    },
    {
      title: 'Strategy Optimizer',
      tech: 'Chrome Extension / JavaScript',
      desc: 'Automated parameter tuning and backtesting data extraction for TradingView strategies.',
      link: '#'
    },
    {
      title: 'Algorithmic Indicators',
      tech: 'Pine Script / Smart Money Concepts',
      desc: 'Custom technical indicators mapping institutional order flow, liquidity voids, and market structure shifts.',
      link: '#'
    }
  ];

  return (
    <section className="projects-section">
      <h2 className="section-title">FEATURED ENGINEERING</h2>
      <div className="projects-list">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="brutal-card project-card"
          >
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
              <a href={project.link} className="project-link" aria-label={`View ${project.title}`}>
                <ArrowUpRight size={24} className="accent-text" />
              </a>
            </div>
            <div className="project-tech">
              <code>{project.tech}</code>
            </div>
            <p className="project-desc">{project.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
