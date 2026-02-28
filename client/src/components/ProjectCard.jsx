import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, theme }) => {
  const isDark = theme === 'dark';

  const styles = {
    card: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: 'clamp(15px, 3vw, 20px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      transition: 'all 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left'
    },
    title: {
      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
      color: '#EAB308',
      marginBottom: '10px',
      fontWeight: 600,
      lineHeight: 1.3
    },
    description: {
      color: isDark ? '#A3A3A3' : '#666666',
      marginBottom: '12px',
      flex: 1,
      fontSize: 'clamp(0.85rem, 1.8vw, 0.9rem)',
      lineHeight: 1.5
    },
    techStack: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginBottom: '12px'
    },
    techTag: {
      background: 'rgba(234, 179, 8, 0.1)',
      color: '#EAB308',
      padding: '3px 10px',
      borderRadius: '12px',
      fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)',
      border: '1px solid rgba(234, 179, 8, 0.3)'
    },
    links: {
      display: 'flex',
      gap: '14px',
      flexWrap: 'wrap'
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#EAB308',
      fontWeight: 600,
      fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  };

  return (
    <motion.div
      style={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 15px rgba(234, 179, 8, 0.4)',
        borderColor: '#EAB308'
      }}
    >
      <div style={styles.content}>
        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.description}>{project.description}</p>
        <div style={styles.techStack}>
          {project.tech_stack.map((tech, index) => (
            <span key={index} style={styles.techTag}>{tech}</span>
          ))}
        </div>
        <div style={styles.links}>
          <a 
            href={project.github_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.link}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F59E0B';
              e.currentTarget.style.transform = 'translateX(3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#EAB308';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <FaGithub /> Code
          </a>
          {project.demo_link && (
            <a 
              href={project.demo_link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.link}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F59E0B';
                e.currentTarget.style.transform = 'translateX(3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <FaExternalLinkAlt /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
