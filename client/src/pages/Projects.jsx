import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../api/api';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load projects');
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="projects section">
      <div className="container">
        <h1 className="section-title">My Projects</h1>
        
        {error && <p className="error-message">{error}</p>}
        
        {projects.length === 0 ? (
          <p className="no-data">No projects available yet.</p>
        ) : (
          <motion.div
            className="projects-grid grid grid-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
