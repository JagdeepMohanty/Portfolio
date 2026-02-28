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

  const styles = {
    app: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      backgroundColor: '#0C0C0C',
      color: '#FAFAFA',
      lineHeight: 1.6,
      overflowX: 'hidden',
      minHeight: '100vh'
    },
    mainContent: {
      paddingTop: '60px'
    },
    backToTop: {
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
    }
  };

  return (
    <div style={styles.app}>
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
          background-color: #0C0C0C;
          color: #FAFAFA;
          overflow-x: hidden;
        }
        #root {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <Navbar />
      <main style={styles.mainContent}>
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <CertificatesSection />
        <GitHubSection />
        <ContactSection />
      </main>
      <Footer />
      
      <button
        style={styles.backToTop}
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
    </div>
  );
}

export default App;
