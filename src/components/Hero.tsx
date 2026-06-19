import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="hero-section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-grid"
      >
        <div className="hero-content brutal-card">
          <h1 className="hero-name">ADITYA</h1>
          <div className="hero-focus">
            <span className="accent-text">Software Development</span>
            <span className="separator"> / </span>
            <span className="accent-text">Data Science</span>
            <span className="separator"> / </span>
            <span className="accent-text">Quantitative Trading Scripts</span>
          </div>
          <div className="hero-metrics">
            <div className="metric">
              <span className="metric-value">4.0</span>
              <span className="metric-label">GPA</span>
            </div>
            <div className="metric">
              <span className="metric-value">500+</span>
              <span className="metric-label">LeetCode</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
