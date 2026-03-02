import { lazy, Suspense, memo, useCallback } from 'react';
import { AiFillHome } from 'react-icons/ai';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { useTheme } from './hooks/useTheme';
import { useScroll } from './hooks/useScroll';
import { useSEO } from './hooks/useSEO';

const HomeSection = lazy(() => import('./sections/HomeSection'));
const AboutSection = lazy(() => import('./sections/AboutSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const EngineeringHighlightsSection = lazy(() => import('./sections/EngineeringHighlightsSection'));
const GitHubSection = lazy(() => import('./sections/GitHubSection'));
const CertificatesSection = lazy(() => import('./sections/CertificatesSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

const BackToTopButton = memo(({ show, onClick }) => {
  const handleMouseEnter = useCallback((e) => {
    e.currentTarget.style.transform = 'scale(1.15) translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 8px 30px rgba(234, 179, 8, 0.7)';
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.5)';
  }, []);

  if (!show) return null;

  return (
    <button
      style={{
        position: 'fixed',
        bottom: 'clamp(20px, 4vw, 30px)',
        right: 'clamp(20px, 4vw, 30px)',
        width: 'clamp(45px, 7vw, 50px)',
        height: 'clamp(45px, 7vw, 50px)',
        background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
        color: '#0C0C0C',
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: 'clamp(18px, 2.5vw, 20px)',
        transition: 'all 0.25s ease',
        zIndex: 999,
        boxShadow: '0 4px 20px rgba(234, 179, 8, 0.5)'
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Back to home"
      title="Back to home"
    >
      <AiFillHome aria-hidden="true" />
    </button>
  );
});

BackToTopButton.displayName = 'BackToTopButton';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { showBackToTop, scrollToTop } = useScroll();
  
  useSEO();

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          overflow-x: hidden;
          width: 100%;
          scroll-behavior: smooth;
        }
        body {
          margin: 0;
          padding: 0;
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
          overflow-x: hidden;
          width: 100%;
        }
      `}</style>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Suspense fallback={<LoadingScreen />}>
        <main style={{ paddingTop: '80px' }} role="main" aria-label="Main content">
          <HomeSection theme={theme} />
          <AboutSection theme={theme} />
          <ProjectsSection theme={theme} />
          <EngineeringHighlightsSection theme={theme} />
          <GitHubSection theme={theme} />
          <CertificatesSection theme={theme} />
          <ContactSection theme={theme} />
        </main>
      </Suspense>
      <Footer theme={theme} />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}

export default memo(App);
