import { memo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const ProjectsSection = memo(({ theme }) => {
  const isDark = theme === 'dark';
  const featuredProjects = projects.slice(0, 4);
  
  return (
    <section 
      id="projects"
      style={{
        padding: 'clamp(40px, 8vw, 60px) 20px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 2.2rem)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '16px',
          color: '#EAB308'
        }}>
          Featured Projects
        </h1>
        <p style={{
          textAlign: 'center',
          color: isDark ? '#A3A3A3' : '#666666',
          fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
          marginBottom: 'clamp(35px, 6vw, 50px)',
          maxWidth: '700px',
          margin: '0 auto clamp(35px, 6vw, 50px) auto',
          lineHeight: 1.6
        }}>
          Some of the projects that demonstrate my engineering and problem-solving abilities.
        </p>
        
        {featuredProjects.length === 0 ? (
          <p style={{
            textAlign: 'center',
            color: '#A3A3A3',
            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
            padding: '40px 20px'
          }}>
            No projects available yet.
          </p>
        ) : (
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(20px, 4vw, 25px)',
              maxWidth: '1100px',
              margin: '0 auto',
              justifyItems: 'center'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} theme={theme} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
