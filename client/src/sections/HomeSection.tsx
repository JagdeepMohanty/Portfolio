import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';

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
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'clamp(20px, 4vw, 40px)'
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
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '24px',
            lineHeight: 1.2,
            color: isDark ? '#FAFAFA' : '#1A1A1A'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Jagdeep Mohanty</span>
          </h1>
          <h2 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: isDark ? '#FAFAFA' : '#1A1A1A',
            marginBottom: '24px',
            fontWeight: 600,
            lineHeight: 1.4
          }}>
            Software Engineer | Full-Stack Developer | Data Analytics Enthusiast
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
            color: isDark ? '#A3A3A3' : '#666666',
            lineHeight: 1.7,
            padding: '0 10px',
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px auto'
          }}>
            I build scalable web applications and data-driven systems that solve real-world problems with performance, clean architecture, and efficiency.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
                color: '#0C0C0C',
                padding: '16px 36px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(234, 179, 8, 0.4)',
                fontFamily: 'Inter, system-ui, sans-serif',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(234, 179, 8, 0.6)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View Projects
            </motion.button>
            
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'transparent',
                color: '#EAB308',
                padding: '16px 36px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '16px',
                border: '2px solid #EAB308',
                cursor: 'pointer',
                fontFamily: 'Inter, system-ui, sans-serif',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(234, 179, 8, 0.1)';
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.color = '#F59E0B';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#EAB308';
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

HomeSection.displayName = 'HomeSection';

export default HomeSection;
