import { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiGithub, FiMail, FiSun, FiMoon, FiAward } from 'react-icons/fi';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'home', label: 'Home', icon: FiHome },
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'projects', label: 'Projects', icon: FiCode },
  { id: 'github', label: 'GitHub', icon: FiGithub },
  { id: 'achievements', label: 'Achievements', icon: FiAward },
  { id: 'contact', label: 'Contact', icon: FiMail }
];

const Navbar = memo(({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');
  const isDark = theme === 'dark';

  const handleScroll = useCallback(() => {
    const sections = NAV_LINKS.map(link => link.id);
    const scrollPosition = window.scrollY + 150;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav className={`navbar ${isDark ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="navbar-container">
        {/* Left: Logo/Name */}
        <motion.button
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="navbar-logo"
        >
          Jagdeep Mohanty
        </motion.button>

        {/* Center: Navigation Icons */}
        <div className="navbar-links">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <div key={link.id} className="tooltip-container">
                <motion.button
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`nav-icon ${activeSection === link.id ? 'active' : ''}`}
                  aria-label={link.label}
                >
                  <Icon />
                </motion.button>
                <span className="tooltip-text">{link.label}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </motion.button>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
