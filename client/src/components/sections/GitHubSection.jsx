import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import RepoCard from '../RepoCard';

const GitHubSection = ({ theme }) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = 'JagdeepMohanty';
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=100`)
        ]);

        if (profileRes.ok && reposRes.ok) {
          const profileData = await profileRes.json();
          const reposData = await reposRes.json();
          setProfile(profileData);
          setRepos(reposData.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const styles = {
    section: {
      padding: 'clamp(40px, 8vw, 60px) 20px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px'
    },
    sectionTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 'clamp(25px, 5vw, 40px)',
      color: '#EAB308'
    },
    loader: {
      width: '40px',
      height: '40px',
      border: `3px solid ${isDark ? '#1A1A1A' : '#E5E5E5'}`,
      borderTop: '3px solid #EAB308',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '40px auto'
    },
    githubProfile: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: 'clamp(20px, 4vw, 30px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(20px, 4vw, 30px)',
      marginBottom: 'clamp(25px, 5vw, 40px)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    profileAvatar: {
      width: 'clamp(100px, 20vw, 120px)',
      height: 'clamp(100px, 20vw, 120px)',
      borderRadius: '50%',
      border: '3px solid #EAB308'
    },
    profileInfo: {
      flex: 1,
      minWidth: '250px',
      textAlign: 'center'
    },
    profileName: {
      fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
      color: '#EAB308',
      marginBottom: '10px',
      fontWeight: 600
    },
    profileBio: {
      color: isDark ? '#A3A3A3' : '#666666',
      marginBottom: '20px',
      lineHeight: 1.5,
      fontSize: 'clamp(0.9rem, 2vw, 1rem)'
    },
    profileStats: {
      display: 'flex',
      gap: 'clamp(20px, 4vw, 30px)',
      marginBottom: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    stat: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    statValue: {
      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
      color: '#EAB308',
      fontWeight: 700
    },
    statLabel: {
      color: isDark ? '#A3A3A3' : '#666666',
      fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)'
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
      color: '#0C0C0C',
      padding: 'clamp(8px, 2vw, 10px) clamp(20px, 4vw, 24px)',
      borderRadius: '6px',
      fontWeight: 600,
      fontSize: 'clamp(13px, 2vw, 14px)',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer'
    },
    subsectionTitle: {
      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
      color: '#EAB308',
      marginBottom: 'clamp(15px, 3vw, 20px)',
      textAlign: 'center',
      fontWeight: 600
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
      gap: 'clamp(15px, 3vw, 20px)',
      marginBottom: 'clamp(25px, 5vw, 40px)'
    },
    statsCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: 'clamp(15px, 3vw, 20px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statsImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px'
    },
    reposGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
      gap: 'clamp(15px, 3vw, 20px)'
    }
  };

  if (loading) {
    return (
      <section id="github" style={styles.section}>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={styles.container}>
          <h1 style={styles.sectionTitle}>GitHub Activity</h1>
          <div style={styles.loader}></div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" style={styles.section}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={styles.container}>
        <h1 style={styles.sectionTitle}>GitHub Activity</h1>

        {profile && (
          <motion.div
            style={styles.githubProfile}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src={profile.avatar_url} alt={profile.name || username} style={styles.profileAvatar} />
            <div style={styles.profileInfo}>
              <h2 style={styles.profileName}>{profile.name || username}</h2>
              {profile.bio && <p style={styles.profileBio}>{profile.bio}</p>}
              <div style={styles.profileStats}>
                <div style={styles.stat}>
                  <span style={styles.statValue}>{profile.followers || 0}</span>
                  <span style={styles.statLabel}>Followers</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statValue}>{profile.following || 0}</span>
                  <span style={styles.statLabel}>Following</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statValue}>{profile.public_repos || 0}</span>
                  <span style={styles.statLabel}>Repositories</span>
                </div>
              </div>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.btnPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(234, 179, 8, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FaGithub /> View Profile
              </a>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.subsectionTitle}>GitHub Statistics</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statsCard}>
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${isDark ? 'radical' : 'default'}&bg_color=${isDark ? '1A1A1A' : 'FFFFFF'}&title_color=EAB308&text_color=${isDark ? 'FAFAFA' : '1A1A1A'}&icon_color=F59E0B&border_color=EAB308`}
                alt="GitHub Stats"
                style={styles.statsImage}
              />
            </div>
            <div style={styles.statsCard}>
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${isDark ? 'radical' : 'default'}&bg_color=${isDark ? '1A1A1A' : 'FFFFFF'}&title_color=EAB308&text_color=${isDark ? 'FAFAFA' : '1A1A1A'}&border_color=EAB308`}
                alt="Top Languages"
                style={styles.statsImage}
              />
            </div>
          </div>
          
          <div style={{ ...styles.statsCard, marginBottom: 'clamp(25px, 5vw, 40px)' }}>
            <img 
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${isDark ? 'react-dark' : 'github-light'}&bg_color=${isDark ? '1A1A1A' : 'FFFFFF'}&color=EAB308&line=F59E0B&point=EAB308&area=true&hide_border=false&border_color=EAB308`}
              alt="GitHub Activity Graph"
              style={styles.statsImage}
            />
          </div>

          <div style={{ ...styles.statsCard, marginBottom: 'clamp(25px, 5vw, 40px)' }}>
            <img 
              src={`https://ghchart.rshah.org/EAB308/${username}`}
              alt="GitHub Contribution Calendar"
              style={styles.statsImage}
            />
          </div>
        </motion.div>

        {repos.length > 0 && (
          <div>
            <h2 style={styles.subsectionTitle}>Top Repositories</h2>
            <motion.div
              style={styles.reposGrid}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} theme={theme} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubSection;
