import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer-section brutal-card border-top-only">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="accent-text font-mono">SYS.END</span>
        </div>
        <div className="footer-links">
          <a href="#" aria-label="GitHub" className="social-link">
            <FaGithub size={24} />
          </a>
          <a href="#" aria-label="LinkedIn" className="social-link">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:contact@example.com" aria-label="Email" className="social-link">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
