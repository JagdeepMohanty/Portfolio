import { memo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

interface ProjectsSectionProps {
  theme: 'dark' | 'light';
}

const ProjectsSection = memo<ProjectsSectionProps>(({ theme }) => {
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
        padding: '0 15px'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 'clamp(25px, 5vw, 40px)',
          color: '#EAB308'
        }}>
          My Projects
        </h1>
        
        {projects.length === 0 ? (
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
            {projects.map((project) => (
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
