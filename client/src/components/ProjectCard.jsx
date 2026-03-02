import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = memo(({ project, theme }) => {
  const isDark = theme === 'dark';

  return (
    <motion.div
      style={{
        background: isDark ? '#1A1A1A' : '#FFFFFF',
        borderRadius: '12px',
        padding: '20px',
        border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.2)'}`,
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '450px',
        width: '100%'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 8px 30px rgba(234, 179, 8, 0.6)',
        borderColor: '#EAB308'
      }}
    >
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
      }}>
        <h3 style={{
          fontSize: 'clamp(1.05rem, 2.2vw, 1.2rem)',
          color: '#EAB308',
          marginBottom: '12px',
          fontWeight: 600,
          lineHeight: 1.3
        }}>
          {project.title}
        </h3>
        <p style={{
          color: isDark ? '#A3A3A3' : '#666666',
          marginBottom: '16px',
          flex: 1,
          fontSize: 'clamp(0.9rem, 1.9vw, 0.95rem)',
          lineHeight: 1.6
        }}>
          {project.description}
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '12px'
        }}>
          {project.tech_stack.map((tech, index) => (
            <span 
              key={index}
              style={{
                background: 'rgba(234, 179, 8, 0.1)',
                color: '#EAB308',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)',
                border: '1px solid rgba(234, 179, 8, 0.3)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          marginTop: '4px'
        }}>
          <a 
            href={project.github_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#EAB308',
              fontWeight: 600,
              fontSize: 'clamp(0.85rem, 1.9vw, 0.9rem)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F59E0B';
              e.currentTarget.style.transform = 'translateX(3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#EAB308';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
            aria-label={`View ${project.title} code on GitHub`}
          >
            <FaGithub style={{ fontSize: '18px' }} /> GitHub
          </a>
          {project.demo_link && (
            <a 
              href={project.demo_link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#EAB308',
                fontWeight: 600,
                fontSize: 'clamp(0.85rem, 1.9vw, 0.9rem)',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F59E0B';
                e.currentTarget.style.transform = 'translateX(3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#EAB308';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt style={{ fontSize: '16px' }} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
