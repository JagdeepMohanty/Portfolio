import { motion } from 'framer-motion';
import { FaGithub, FaDownload } from 'react-icons/fa';
import './HomeSection.css';

const HomeSection = () => {
  return (
    <section id="home" className="home-section section">
      <div className="container">
        <motion.div
          className="hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Jagdeep Mohanty</span>
          </h1>
          <h2 className="hero-subtitle">Full Stack Developer</h2>
          <p className="hero-description">
            I build exceptional digital experiences with modern web technologies.
            Passionate about creating elegant solutions to complex problems.
          </p>
          <div className="hero-buttons">
            <a href="/resume.pdf" download className="btn-primary">
              <FaDownload /> Download Resume
            </a>
            <a href="https://github.com/JagdeepMohanty" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FaGithub /> GitHub Profile
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;
