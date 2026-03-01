import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaDownload } from 'react-icons/fa';

interface HomeSectionProps {
  theme: 'dark' | 'light';
}

const HomeSection = memo<HomeSectionProps>(({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section 
      id="home"
      style={{
        padding: '100px 20px 60px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <motion.div
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '20px',
            lineHeight: 1.2,
            color: isDark ? '#FAFAFA' : '#1A1A1A'
          }}>
            Hi, I'm <span style={{
              background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Jagdeep Mohanty</span>
          </h1>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            color: '#EAB308',
            marginBottom: '20px',
            fontWeight: 600
          }}>
            Software Engineer
          </h2>
          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: isDark ? '#A3A3A3' : '#666666',
            marginBottom: '40px',
            lineHeight: 1.6,
            padding: '0 10px'
          }}>
            Engineering full-stack web solutions with performance and precision.
            <br />
            Analyzing data to uncover patterns that create real business value.
          </p>
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 10px'
          }}>
            <a 
              href="/resume.pdf" 
              download 
              style={{
                background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
                color: '#0C0C0C',
                padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: 'clamp(13px, 2vw, 14px)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(234, 179, 8, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              aria-label="Download Resume"
            >
              <FaDownload /> Download Resume
            </a>
            <a 
              href="https://github.com/JagdeepMohanty" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                background: 'transparent',
                color: '#EAB308',
                padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)',
                border: '2px solid #EAB308',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: 'clamp(13px, 2vw, 14px)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#EAB308';
                e.currentTarget.style.color = '#0C0C0C';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(234, 179, 8, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.boxShadow = 'none';
              }}
              aria-label="View GitHub Profile"
            >
              <FaGithub /> GitHub Profile
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

HomeSection.displayName = 'HomeSection';

export default HomeSection;
