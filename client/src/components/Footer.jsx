import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const styles = {
    footer: {
      width: '100%',
      background: '#1A1A1A',
      borderTop: '1px solid rgba(234, 179, 8, 0.2)',
      padding: '30px 0',
      marginTop: '40px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    },
    socialLinks: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    },
    socialLink: {
      color: '#EAB308',
      fontSize: '24px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    copyright: {
      color: '#A3A3A3',
      fontSize: '14px',
      textAlign: 'center'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerContent}>
          <div style={styles.socialLinks}>
            <a 
              href="https://github.com/JagdeepMohanty" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F59E0B';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com/in/jagdeepmohanty" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F59E0B';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaLinkedin />
            </a>
            <a 
              href="mailto:your.email@example.com" 
              style={styles.socialLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F59E0B';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaEnvelope />
            </a>
          </div>
          <p style={styles.copyright}>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
