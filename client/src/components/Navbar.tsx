import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiGithub, FiMail, FiSun, FiMoon, FiMenu, FiX, FiAward } from 'react-icons/fi';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

interface NavLink {
  id: string;
  label: string;
  icon: typeof FiHome;
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', icon: FiHome },
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'projects', label: 'Projects', icon: FiCode },
  { id: 'github', label: 'GitHub', icon: FiGithub },
  { id: 'achievements', label: 'Achievements', icon: FiAward },
  { id: 'contact', label: 'Contact', icon: FiMail }
];

const Navbar = memo<NavbarProps>(({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(234, 179, 8, 0.3)',
        boxShadow: '0 0 20px rgba(234, 179, 8, 0.15)'
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
        {/* Left: Name */}
        <motion.button
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 'clamp(18px, 3vw, 22px)',
            fontWeight: 700,
            color: '#EAB308',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '-0.5px',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#F59E0B'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#EAB308'}
        >
          Jagdeep Mohanty
        </motion.button>

        {/* Center: Navigation Icons (Desktop) */}
        <div style={{
          display: window.innerWidth >= 768 ? 'flex' : 'none',
          gap: '4px',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <div key={link.id} style={{ position: 'relative' }}>
                <motion.button
                  onClick={() => scrollToSection(link.id)}
                  onMouseEnter={() => setHoveredIcon(link.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: activeSection === link.id ? 'rgba(234, 179, 8, 0.15)' : 'transparent',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: activeSection === link.id ? '#EAB308' : '#A3A3A3',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    boxShadow: activeSection === link.id ? '0 0 20px rgba(234, 179, 8, 0.3)' : 'none'
                  }}
                >
                  <Icon />
                </motion.button>
                
                <AnimatePresence>
                  {hoveredIcon === link.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        top: '120%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '6px 12px',
                        background: 'rgba(26, 26, 26, 0.95)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(234, 179, 8, 0.3)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#EAB308',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        pointerEvents: 'none',
                        zIndex: 1001
                      }}
                    >
                      {link.label}
                      <div style={{
                        position: 'absolute',
                        top: '-4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '8px',
                        height: '8px',
                        background: 'rgba(26, 26, 26, 0.95)',
                        border: '1px solid rgba(234, 179, 8, 0.3)',
                        borderRight: 'none',
                        borderBottom: 'none',
                        rotate: '45deg'
                      }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right: Theme Toggle (Desktop) */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          style={{
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            background: 'rgba(234, 179, 8, 0.1)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '10px',
            width: '40px',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#EAB308',
            fontSize: '18px',
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
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          style={{
            display: window.innerWidth < 768 ? 'flex' : 'none',
            background: 'rgba(234, 179, 8, 0.1)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '10px',
            width: '40px',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#EAB308',
            fontSize: '20px'
          }}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(26, 26, 26, 0.95)',
              backdropFilter: 'blur(12px)',
              borderTop: '1px solid rgba(234, 179, 8, 0.2)'
            }}
          >
            <div style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'center'
            }}>
              {NAV_LINKS.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      background: activeSection === link.id ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
                      border: 'none',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: activeSection === link.id ? '#EAB308' : '#A3A3A3',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px'
                    }}
                  >
                    <Icon style={{ fontSize: '20px' }} />
                    {link.label}
                  </motion.button>
                );
              })}

              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  marginTop: '12px',
                  padding: '12px',
                  background: 'rgba(234, 179, 8, 0.1)',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  borderRadius: '10px',
                  color: '#EAB308',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                {isDark ? <><FiSun /> Light Mode</> : <><FiMoon /> Dark Mode</>}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
