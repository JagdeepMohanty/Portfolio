import { motion } from 'framer-motion';
import { FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';
import './RepoCard.css';

const RepoCard = ({ repo }) => {
  return (
    <motion.div
      className="repo-card card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="repo-content">
        <h3 className="repo-name">{repo.name}</h3>
        <p className="repo-description">
          {repo.description || 'No description available'}
        </p>
        
        <div className="repo-meta">
          {repo.language && (
            <span className="repo-language">
              <span className="language-dot" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
              {repo.language}
            </span>
          )}
          <span className="repo-stat">
            <FaStar /> {repo.stargazers_count}
          </span>
          <span className="repo-stat">
            <FaCodeBranch /> {repo.forks_count}
          </span>
        </div>
      </div>
      
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="repo-link"
      >
        <FaExternalLinkAlt /> View Repo
      </a>
    </motion.div>
  );
};

const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    React: '#61dafb',
    Vue: '#42b883',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
  };
  return colors[language] || '#EAB308';
};

export default RepoCard;
