import { useState, useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUserTie, FaCode, FaAward, FaGithub, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
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
      padding: '0 24px'
    },
    logoStyle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#EAB308',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    navIconsContainer: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center'
    },
    navIcon: {
      position: 'relative',
      color: '#A3A3A3',
      fontSize: '22px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navIconActive: {
      color: '#EAB308'
    },
    tooltip: {
      position: 'absolute',
      bottom: '-35px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1A1A1A',
      color: '#EAB308',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.3s ease',
      border: '1px solid rgba(234, 179, 8, 0.3)'
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
                  e.currentTarget.style.color = '#A3A3A3';
                }
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
