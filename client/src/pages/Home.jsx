import { motion } from 'framer-motion';
import { FaGithub, FaDownload } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home section">
      <div className="container">
        <motion.div
          className="hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Your Name</span>
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
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FaGithub /> GitHub Profile
            </a>
          </div>
        </motion.div>

        <motion.div
          className="intro-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="intro-card card">
            <h3 className="intro-title">Welcome to My Portfolio</h3>
            <p className="intro-text">
              I specialize in building scalable web applications using React, Node.js, Python, and modern cloud technologies.
              With a focus on clean code, performance optimization, and user experience, I deliver solutions that make a difference.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
