import { motion } from 'framer-motion';

export default function BentoSkills() {
  return (
    <section className="bento-section">
      <h2 className="section-title">METRICS / STACK</h2>
      <div className="bento-grid">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="brutal-card bento-card bento-cp"
        >
          <div className="card-header">
            <h3>COMPETITIVE PROGRAMMING</h3>
            <span className="accent-tag">C++</span>
          </div>
          <div className="card-body">
            <div className="stat-block">
              <span className="stat-number accent-text">500+</span>
              <span className="stat-label">LeetCode Problems Solved</span>
            </div>
            <div className="stat-details">
              <p>Focus on algorithms, data structures, and optimization.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="brutal-card bento-card bento-stack"
        >
          <div className="card-header">
            <h3>CORE STACK</h3>
          </div>
          <div className="card-body stack-grid">
            <div className="stack-item">
              <span className="stack-name">Data Science</span>
              <span className="stack-desc">Python, Pandas, Scikit-Learn</span>
            </div>
            <div className="stack-item">
              <span className="stack-name">Systems</span>
              <span className="stack-desc">C++, Docker, Linux</span>
            </div>
            <div className="stack-item">
              <span className="stack-name">Web</span>
              <span className="stack-desc">React, Node.js, TypeScript</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
