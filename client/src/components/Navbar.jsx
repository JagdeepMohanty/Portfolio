import { useState, useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUserTie, FaCode, FaAward, FaGithub, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');

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
    { id: 'home', icon: AiFillHome },
    { id: 'about', icon: FaUserTie },
    { id: 'projects', icon: FaCode },
    { id: 'certificates', icon: FaAward },
    { id: 'github', icon: FaGithub },
    { id: 'contact', icon: FaEnvelope },
  ];

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      background: isDark ? '#0C0C0C' : '#FFFFFF',
      borderBottom: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.3)'}`,
      zIndex: 1000,
      height: '60px',
      transition: 'background 0.3s ease'
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
      fontSize: 'clamp(18px, 3vw, 20px)',
      fontWeight: 'bold',
      color: '#EAB308',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      flex: '0 0 auto'
    },
    navIconsContainer: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 'clamp(20px, 4vw, 30px)',
      alignItems: 'center'
    },
    navIcon: {
      color: isDark ? '#A3A3A3' : '#666666',
      fontSize: 'clamp(20px, 3vw, 22px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    },
    navIconActive: {
      color: '#EAB308'
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
          {navItems.map(({ id, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              style={{
                ...styles.navIcon,
                ...(activeSection === id ? styles.navIconActive : {})
              }}
              onClick={(e) => handleClick(e, id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                if (activeSection !== id) {
                  e.currentTarget.style.color = isDark ? '#A3A3A3' : '#666666';
                }
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon />
            </a>
          ))}
        </div>

        <button
          style={styles.toggleButton}
          onClick={toggleTheme}
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
          {isDark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
