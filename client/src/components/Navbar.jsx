import { useState, useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUserTie, FaCode, FaAward, FaGithub, FaEnvelope, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'certificates', 'github', 'contact'];
      const scrollPosition = window.scrollY + 100;

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: AiFillHome, label: 'Home' },
    { id: 'about', icon: FaUserTie, label: 'About' },
    { id: 'projects', icon: FaCode, label: 'Projects' },
    { id: 'certificates', icon: FaAward, label: 'Certificates' },
    { id: 'github', icon: FaGithub, label: 'GitHub' },
    { id: 'contact', icon: FaEnvelope, label: 'Contact' },
  ];

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      background: '#0C0C0C',
      borderBottom: '1px solid rgba(234, 179, 8, 0.2)',
      zIndex: 1000,
      height: '60px'
    },
    navbarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      position: 'relative'
    },
    logoStyle: {
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: 'bold',
      color: '#EAB308',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      flex: '0 0 auto',
      zIndex: 1001
    },
    navIconsContainer: {
      position: isMobile ? 'fixed' : 'absolute',
      left: isMobile ? 0 : '50%',
      top: isMobile ? '60px' : '50%',
      transform: isMobile ? 'none' : 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '0' : '25px',
      alignItems: 'center',
      background: isMobile ? '#0C0C0C' : 'transparent',
      width: isMobile ? '100%' : 'auto',
      maxHeight: isMobile ? (mobileMenuOpen ? '400px' : '0') : 'none',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease',
      borderBottom: isMobile ? '1px solid rgba(234, 179, 8, 0.2)' : 'none',
      padding: isMobile ? (mobileMenuOpen ? '10px 0' : '0') : '0'
    },
    navIconWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
      width: isMobile ? '100%' : 'auto',
      padding: isMobile ? '12px 20px' : '0'
    },
    navIcon: {
      color: '#A3A3A3',
      fontSize: isMobile ? '20px' : '22px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '15px' : '0'
    },
    navIconActive: {
      color: '#EAB308'
    },
    navLabel: {
      display: isMobile ? 'inline' : 'none',
      fontSize: '16px',
      color: '#FAFAFA'
    },
    tooltip: {
      position: 'absolute',
      bottom: '-40px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1A1A1A',
      color: '#EAB308',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      opacity: hoveredIcon && !isMobile ? 1 : 0,
      pointerEvents: 'none',
      transition: 'opacity 0.3s ease',
      border: '1px solid rgba(234, 179, 8, 0.3)',
      zIndex: 10
    },
    rightSection: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      zIndex: 1001
    },
    toggleButton: {
      background: 'transparent',
      border: '2px solid #EAB308',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: '#EAB308',
      fontSize: '16px',
      flex: '0 0 auto'
    },
    menuButton: {
      background: 'transparent',
      border: '2px solid #EAB308',
      borderRadius: '6px',
      width: '40px',
      height: '40px',
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: '#EAB308',
      fontSize: '18px'
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        <div 
          style={styles.logoStyle}
          onClick={(e) => handleClick(e, 'home')}
          onMouseEnter={(e) => e.target.style.color = '#F59E0B'}
          onMouseLeave={(e) => e.target.style.color = '#EAB308'}
        >
          Jagdeep
        </div>

        <div style={styles.navIconsContainer}>
          {navItems.map(({ id, icon: Icon, label }) => (
            <div
              key={id}
              style={styles.navIconWrapper}
              onMouseEnter={() => !isMobile && setHoveredIcon(id)}
              onMouseLeave={() => !isMobile && setHoveredIcon(null)}
            >
              <a
                href={`#${id}`}
                style={{
                  ...styles.navIcon,
                  ...(activeSection === id ? styles.navIconActive : {})
                }}
                onClick={(e) => handleClick(e, id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#EAB308';
                  if (!isMobile) e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== id) {
                    e.currentTarget.style.color = '#A3A3A3';
                  }
                  if (!isMobile) e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon />
                <span style={styles.navLabel}>{label}</span>
              </a>
              {hoveredIcon === id && !isMobile && (
                <div style={styles.tooltip}>{label}</div>
              )}
            </div>
          ))}
        </div>

        <div style={styles.rightSection}>
          <button
            style={styles.menuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EAB308';
              e.currentTarget.style.color = '#0C0C0C';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#EAB308';
            }}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          <button
            style={styles.toggleButton}
            onClick={() => setDarkMode(!darkMode)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EAB308';
              e.currentTarget.style.color = '#0C0C0C';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#EAB308';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
