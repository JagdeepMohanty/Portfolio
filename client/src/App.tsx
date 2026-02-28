import { lazy, Suspense, memo, useCallback, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { useTheme } from './hooks/useTheme';
import { useScroll } from './hooks/useScroll';
import { useSEO } from './hooks/useSEO';
import { COLORS, Z_INDEX } from './constants/theme';
import { measurePerformance } from './utils/performance';
import { errorTracker } from './services/errorTracker';
import { validateEnv } from './config/env';

const HomeSection = lazy(() => import(/* webpackChunkName: "home" */ './sections/HomeSection'));
const AboutSection = lazy(() => import(/* webpackChunkName: "about" */ './sections/AboutSection'));
const ProjectsSection = lazy(() => import(/* webpackChunkName: "projects" */ './sections/ProjectsSection'));
const CertificatesSection = lazy(() => import(/* webpackChunkName: "certificates" */ './sections/CertificatesSection'));
const GitHubSection = lazy(() => import(/* webpackChunkName: "github" */ './sections/GitHubSection'));
const ContactSection = lazy(() => import(/* webpackChunkName: "contact" */ './sections/ContactSection'));

const BackToTopButton = memo<{ show: boolean; onClick: () => void }>(({ show, onClick }) => {
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(1.15) translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 8px 30px rgba(234, 179, 8, 0.7)';
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
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
        width: 'clamp(50px, 8vw, 55px)',
        height: 'clamp(50px, 8vw, 55px)',
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
        color: COLORS.backgroundDark,
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: 'clamp(20px, 3vw, 22px)',
        transition: 'all 0.3s ease',
        zIndex: Z_INDEX.fixed,
        boxShadow: '0 4px 20px rgba(234, 179, 8, 0.5)'
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Scroll back to top of page"
      title="Back to top"
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
});

BackToTopButton.displayName = 'BackToTopButton';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { showBackToTop, scrollToTop } = useScroll();
  
  useSEO();

  useEffect(() => {
    validateEnv();
    errorTracker.init();
    measurePerformance();
  }, []);

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
        <main style={{ paddingTop: '60px' }} role="main" aria-label="Main content">
          <HomeSection theme={theme} />
          <AboutSection theme={theme} />
          <ProjectsSection theme={theme} />
          <CertificatesSection theme={theme} />
          <GitHubSection theme={theme} />
          <ContactSection theme={theme} />
        </main>
      </Suspense>
      <Footer theme={theme} />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}

export default App;
