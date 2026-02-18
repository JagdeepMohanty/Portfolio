import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="social-links">
            <a href="https://github.com/JagdeepMohanty" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub />
            </a>
            <a href="www.linkedin.com/in/jagdeepmohanty" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin />
            </a>
            <a href="mailto:your.email@example.com" className="social-link">
              <FaEnvelope />
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
