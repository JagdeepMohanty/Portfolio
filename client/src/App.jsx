import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import CertificatesSection from './components/sections/CertificatesSection';
import GitHubSection from './components/sections/GitHubSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          line-height: 1.6;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        body[data-theme="dark"] {
          background-color: #0C0C0C;
          color: #FAFAFA;
        }
        body[data-theme="light"] {
          background-color: #F5F5F5;
          color: #1A1A1A;
        }
        #root {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ paddingTop: '60px' }}>
        <HomeSection theme={theme} />
        <AboutSection theme={theme} />
        <ProjectsSection theme={theme} />
        <CertificatesSection theme={theme} />
        <GitHubSection theme={theme} />
        <ContactSection theme={theme} />
      </main>
      <Footer theme={theme} />
      
      <button
        style={{
          position: 'fixed',
          bottom: 'clamp(20px, 4vw, 30px)',
          right: 'clamp(20px, 4vw, 30px)',
          width: 'clamp(45px, 8vw, 50px)',
          height: 'clamp(45px, 8vw, 50px)',
          background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
          color: '#0C0C0C',
          border: 'none',
          borderRadius: '50%',
          display: showBackToTop ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 'clamp(18px, 3vw, 20px)',
          transition: 'all 0.3s ease',
          zIndex: 999,
          boxShadow: '0 4px 15px rgba(234, 179, 8, 0.4)'
        }}
        onClick={scrollToTop}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(234, 179, 8, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(234, 179, 8, 0.4)';
        }}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
}

export default App;
