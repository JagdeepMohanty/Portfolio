import { motion } from 'framer-motion';
import ProjectCard from '../ProjectCard';
import { projects } from '../../data/projects';
import './ProjectsSection.css';

const ProjectsSection = () => {
  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <h1 className="section-title">My Projects</h1>
        
        {projects.length === 0 ? (
          <p className="no-data">No projects available yet.</p>
        ) : (
          <motion.div
            className="projects-grid grid grid-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
