import { motion } from 'framer-motion';
import { FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';

const RepoCard = ({ repo, theme }) => {
  const isDark = theme === 'dark';

  const styles = {
    card: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: '20px',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    },
    repoContent: {
      flex: 1,
      marginBottom: '15px'
    },
    repoName: {
      fontSize: '1.1rem',
      color: '#EAB308',
      marginBottom: '10px',
      fontWeight: 600
    },
    repoDescription: {
      color: isDark ? '#A3A3A3' : '#666666',
      marginBottom: '15px',
      lineHeight: 1.5,
      fontSize: '0.9rem'
    },
    repoMeta: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: '15px'
    },
    repoLanguage: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: isDark ? '#FAFAFA' : '#1A1A1A',
      fontSize: '0.85rem'
    },
    languageDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%'
    },
    repoStat: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      color: isDark ? '#A3A3A3' : '#666666',
      fontSize: '0.85rem'
    },
    repoLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      color: '#EAB308',
      fontWeight: 600,
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      cursor: 'pointer'
    }
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
      <div style={styles.repoContent}>
        <h3 style={styles.repoName}>{repo.name}</h3>
        <p style={styles.repoDescription}>
          {repo.description || 'No description available'}
        </p>
        
        <div style={styles.repoMeta}>
          {repo.language && (
            <span style={styles.repoLanguage}>
              <span style={{ ...styles.languageDot, backgroundColor: getLanguageColor(repo.language) }}></span>
              {repo.language}
            </span>
          )}
          <span style={styles.repoStat}>
            <FaStar /> {repo.stargazers_count}
          </span>
          <span style={styles.repoStat}>
            <FaCodeBranch /> {repo.forks_count}
          </span>
        </div>
      </div>
      
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.repoLink}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#F59E0B';
          e.currentTarget.style.transform = 'translateX(3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#EAB308';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <FaExternalLinkAlt /> View Repo
      </a>
    </motion.div>
  );
};

export default RepoCard;
