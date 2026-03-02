import { memo } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = memo(({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer style={{
      width: '100%',
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderTop: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.3)'}`,
      padding: '30px 0',
      marginTop: '40px',
      transition: 'background 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}>
            <a 
              href="https://github.com/JagdeepMohanty" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                color: '#EAB308',
                fontSize: '24px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F59E0B';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com/in/jagdeepmohanty" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                color: '#EAB308',
                fontSize: '24px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F59E0B';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a 
              href="mailto:jagdeepmohanty1807@gmail.com" 
              style={{
                color: '#EAB308',
                fontSize: '24px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F59E0B';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
          <p style={{
            color: isDark ? '#A3A3A3' : '#666666',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            © {new Date().getFullYear()} Jagdeep Mohanty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
