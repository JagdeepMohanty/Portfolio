import { useState, useEffect, lazy, Suspense } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

const HomeSection = lazy(() => import('./components/sections/HomeSection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const CertificatesSection = lazy(() => import('./components/sections/CertificatesSection'));
const GitHubSection = lazy(() => import('./components/sections/GitHubSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

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
      <Suspense fallback={<LoadingScreen />}>
        <main style={{ paddingTop: '60px' }}>
          <HomeSection theme={theme} />
          <AboutSection theme={theme} />
          <ProjectsSection theme={theme} />
          <CertificatesSection theme={theme} />
          <GitHubSection theme={theme} />
          <ContactSection theme={theme} />
        </main>
      </Suspense>
      <Footer theme={theme} />
      
      <button
        style={{
          position: 'fixed',
          bottom: 'clamp(20px, 4vw, 30px)',
          right: 'clamp(20px, 4vw, 30px)',
          width: 'clamp(50px, 8vw, 55px)',
          height: 'clamp(50px, 8vw, 55px)',
          background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
          color: '#0C0C0C',
          border: 'none',
          borderRadius: '50%',
          display: showBackToTop ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 'clamp(20px, 3vw, 22px)',
          transition: 'all 0.3s ease',
          zIndex: 999,
          boxShadow: '0 4px 20px rgba(234, 179, 8, 0.5)'
        }}
        onClick={scrollToTop}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.15) translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(234, 179, 8, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.5)';
        }}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
}

export default App;
