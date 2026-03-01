import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = memo<NavbarProps>(({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < 10) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
      setIsMobileMenuOpen(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);

    const sections = NAV_LINKS.map(link => link.id);
    const scrollPosition = currentScrollY + 150;

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
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isDark 
          ? 'rgba(12, 12, 12, 0.85)' 
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.2)'}`,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo */}
        <motion.button
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: 700,
            color: '#EAB308',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '-0.5px',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#F59E0B'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#EAB308'}
          aria-label="Go to home"
        >
          Jagdeep
        </motion.button>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <div style={{
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            gap: '4px',
            alignItems: 'center'
          }}>
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: activeSection === link.id 
                    ? 'rgba(234, 179, 8, 0.1)' 
                    : 'transparent',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: activeSection === link.id 
                    ? '#EAB308' 
                    : isDark ? '#A3A3A3' : '#666666',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.id) {
                    e.currentTarget.style.color = '#EAB308';
                    e.currentTarget.style.background = 'rgba(234, 179, 8, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.id) {
                    e.currentTarget.style.color = isDark ? '#A3A3A3' : '#666666';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
                aria-label={`Navigate to ${link.label}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* Social Icons */}
          <div style={{
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            gap: '8px',
            marginLeft: '16px',
            paddingLeft: '16px',
            borderLeft: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.2)'}`
          }}>
            <motion.a
              href="https://github.com/JagdeepMohanty"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: isDark ? '#A3A3A3' : '#666666',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.background = 'rgba(234, 179, 8, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? '#A3A3A3' : '#666666';
                e.currentTarget.style.background = 'transparent';
              }}
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/jagdeepmohanty"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: isDark ? '#A3A3A3' : '#666666',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.background = 'rgba(234, 179, 8, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? '#A3A3A3' : '#666666';
                e.currentTarget.style.background = 'transparent';
              }}
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </motion.a>
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(234, 179, 8, 0.1)',
              border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.3)' : 'rgba(234, 179, 8, 0.4)'}`,
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#EAB308',
              fontSize: '18px',
              marginLeft: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EAB308';
              e.currentTarget.style.color = '#0C0C0C';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 179, 8, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(234, 179, 8, 0.1)';
              e.currentTarget.style.color = '#EAB308';
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
            style={{
              display: window.innerWidth < 768 ? 'flex' : 'none',
              background: 'rgba(234, 179, 8, 0.1)',
              border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.3)' : 'rgba(234, 179, 8, 0.4)'}`,
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#EAB308',
              fontSize: '18px',
              marginLeft: '8px'
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              background: isDark 
                ? 'rgba(26, 26, 26, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderTop: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.2)'}`
            }}
          >
            <div style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: activeSection === link.id 
                      ? 'rgba(234, 179, 8, 0.1)' 
                      : 'transparent',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: activeSection === link.id 
                      ? '#EAB308' 
                      : isDark ? '#A3A3A3' : '#666666',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </motion.button>
              ))}

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.2)'}`
              }}>
                <motion.a
                  href="https://github.com/JagdeepMohanty"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(234, 179, 8, 0.1)',
                    border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.3)' : 'rgba(234, 179, 8, 0.4)'}`,
                    borderRadius: '8px',
                    color: '#EAB308',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}
                  aria-label="GitHub Profile"
                >
                  <FaGithub /> GitHub
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/jagdeepmohanty"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(234, 179, 8, 0.1)',
                    border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.3)' : 'rgba(234, 179, 8, 0.4)'}`,
                    borderRadius: '8px',
                    color: '#EAB308',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin /> LinkedIn
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
