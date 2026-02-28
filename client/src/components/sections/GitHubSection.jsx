import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaCode, FaCalendar, FaUser } from 'react-icons/fa';
import GitHubCalendar from 'react-github-calendar';

const GitHubSection = ({ theme }) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const username = 'JagdeepMohanty';
  const isDark = theme === 'dark';

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .stat-card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(234, 179, 8, 0.4);
        border-color: #EAB308;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        if (profileRes.ok && reposRes.ok) {
          const profileData = await profileRes.json();
          const reposData = await reposRes.json();
          
          setProfile(profileData);
          setRepos(reposData);
          
          const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
          const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
          const activeRepos = reposData.filter(repo => {
            const lastUpdate = new Date(repo.updated_at);
            const monthsAgo = (Date.now() - lastUpdate) / (1000 * 60 * 60 * 24 * 30);
            return monthsAgo < 6;
          }).length;

          const languageCounts = {};
          const languageActivity = {};
          
          reposData.forEach(repo => {
            if (repo.language) {
              languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
              
              const daysSinceUpdate = (Date.now() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
              const activityScore = daysSinceUpdate < 30 ? 10 : daysSinceUpdate < 90 ? 5 : 1;
              languageActivity[repo.language] = (languageActivity[repo.language] || 0) + activityScore;
            }
          });

          const sortedLanguages = Object.entries(languageCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

          const sortedByActivity = Object.entries(languageActivity)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

          const mostRecent = reposData.reduce((latest, repo) => 
            new Date(repo.updated_at) > new Date(latest.updated_at) ? repo : latest
          );

          const mostActive = reposData.reduce((active, repo) => 
            new Date(repo.pushed_at) > new Date(active.pushed_at) ? repo : active
          );

          const lastUpdate = new Date(mostRecent.updated_at);
          const daysAgo = (Date.now() - lastUpdate) / (1000 * 60 * 60 * 24);
          const activityStatus = daysAgo < 7 ? 'Active Developer' : 
                                daysAgo < 30 ? 'Consistent Developer' : 
                                'Occasional Developer';

          setStats({
            totalStars,
            totalForks,
            activeRepos,
            totalRepos: reposData.length,
            languageCounts: sortedLanguages,
            languageActivity: sortedByActivity,
            mostRecent,
            mostActive,
            activityStatus,
            primaryLanguage: sortedLanguages[0]?.[0] || 'JavaScript'
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const getDeveloperStatus = (repoCount) => {
    if (repoCount <= 10) return 'Beginner Developer';
    if (repoCount <= 30) return 'Intermediate Developer';
    if (repoCount <= 60) return 'Advanced Developer';
    return 'Expert Developer';
  };

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
    profileCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '12px',
      padding: 'clamp(25px, 4vw, 35px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      marginBottom: 'clamp(25px, 5vw, 40px)',
      display: 'flex',
      gap: '25px',
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    avatar: {
      width: 'clamp(100px, 15vw, 130px)',
      height: 'clamp(100px, 15vw, 130px)',
      borderRadius: '50%',
      border: '4px solid #EAB308',
      boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)'
    },
    profileInfo: {
      flex: 1,
      minWidth: '250px'
    },
    profileName: {
      fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
      color: '#EAB308',
      marginBottom: '5px',
      fontWeight: 700
    },
    username: {
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: isDark ? '#A3A3A3' : '#666666',
      marginBottom: '10px'
    },
    bio: {
      color: isDark ? '#FAFAFA' : '#1A1A1A',
      marginBottom: '15px',
      lineHeight: 1.6,
      fontSize: 'clamp(0.9rem, 2vw, 1rem)'
    },
    statusBadge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
      color: '#0C0C0C',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
      fontWeight: 600,
      marginBottom: '15px'
    },
    profileStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '15px',
      marginTop: '15px'
    },
    profileStat: {
      textAlign: 'center'
    },
    statValue: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
      color: '#EAB308',
      fontWeight: 700,
      display: 'block'
    },
    statLabel: {
      fontSize: 'clamp(0.75rem, 1.6vw, 0.85rem)',
      color: isDark ? '#A3A3A3' : '#666666',
      display: 'block',
      marginTop: '5px'
    },
    subsectionTitle: {
      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
      color: '#EAB308',
      marginBottom: 'clamp(15px, 3vw, 25px)',
      fontWeight: 600
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
      gap: 'clamp(15px, 3vw, 20px)',
      marginBottom: 'clamp(30px, 5vw, 40px)'
    },
    statCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '12px',
      padding: 'clamp(20px, 3vw, 25px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    statIcon: {
      fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
      color: '#EAB308',
      marginBottom: '10px'
    },
    statNumber: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      color: '#EAB308',
      fontWeight: 700,
      display: 'block',
      marginBottom: '5px'
    },
    statText: {
      fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
      color: isDark ? '#FAFAFA' : '#1A1A1A',
      fontWeight: 500
    },
    languageSection: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '12px',
      padding: 'clamp(20px, 4vw, 30px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      marginBottom: 'clamp(25px, 5vw, 40px)'
    },
    languageBar: {
      marginBottom: '20px'
    },
    languageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      alignItems: 'center'
    },
    languageName: {
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: isDark ? '#FAFAFA' : '#1A1A1A',
      fontWeight: 600
    },
    languageCount: {
      fontSize: 'clamp(0.85rem, 1.8vw, 0.9rem)',
      color: '#EAB308',
      fontWeight: 600
    },
    progressBar: {
      width: '100%',
      height: '10px',
      background: isDark ? '#0C0C0C' : '#E5E5E5',
      borderRadius: '10px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #EAB308, #F59E0B)',
      borderRadius: '10px',
      transition: 'width 0.5s ease'
    },
    calendarContainer: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '12px',
      padding: 'clamp(20px, 4vw, 30px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      marginBottom: 'clamp(25px, 5vw, 40px)',
      overflow: 'auto'
    },
    activityCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '12px',
      padding: 'clamp(20px, 4vw, 30px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`
    },
    activityItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
      borderBottom: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      flexWrap: 'wrap',
      gap: '10px'
    },
    activityLabel: {
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: isDark ? '#A3A3A3' : '#666666',
      fontWeight: 500
    },
    activityValue: {
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: '#EAB308',
      fontWeight: 600
    }
  };

  if (loading) {
    return (
      <section id="github" style={styles.section}>
        <div style={styles.container}>
          <h1 style={styles.sectionTitle}>GitHub Analysis Dashboard</h1>
          <div style={styles.loader}></div>
        </div>
      </section>
    );
  }

  if (!profile || !stats) {
    return (
      <section id="github" style={styles.section}>
        <div style={styles.container}>
          <h1 style={styles.sectionTitle}>GitHub Analysis Dashboard</h1>
          <p style={{ textAlign: 'center', color: isDark ? '#A3A3A3' : '#666666' }}>
            Unable to load GitHub data. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const maxRepoCount = Math.max(...stats.languageCounts.map(([, count]) => count));
  const maxActivity = Math.max(...stats.languageActivity.map(([, score]) => score));

  return (
    <section id="github" style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.sectionTitle}>GitHub Analysis Dashboard</h1>

        <motion.div
          style={styles.profileCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src={profile.avatar_url} alt={profile.name} style={styles.avatar} />
          <div style={styles.profileInfo}>
            <h2 style={styles.profileName}>{profile.name || username}</h2>
            <p style={styles.username}>@{profile.login}</p>
            {profile.bio && <p style={styles.bio}>{profile.bio}</p>}
            <div style={styles.statusBadge}>
              {getDeveloperStatus(profile.public_repos)}
            </div>
            <div style={styles.profileStats}>
              <div style={styles.profileStat}>
                <span style={styles.statValue}>{profile.public_repos}</span>
                <span style={styles.statLabel}>Repositories</span>
              </div>
              <div style={styles.profileStat}>
                <span style={styles.statValue}>{profile.followers}</span>
                <span style={styles.statLabel}>Followers</span>
              </div>
              <div style={styles.profileStat}>
                <span style={styles.statValue}>{profile.following}</span>
                <span style={styles.statLabel}>Following</span>
              </div>
              <div style={styles.profileStat}>
                <span style={styles.statValue}>{stats.primaryLanguage}</span>
                <span style={styles.statLabel}>Primary Lang</span>
              </div>
              <div style={styles.profileStat}>
                <span style={styles.statValue}>
                  {new Date(profile.created_at).getFullYear()}
                </span>
                <span style={styles.statLabel}>Joined</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.subsectionTitle}>GitHub Statistics</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard} className="stat-card-hover">
              <FaCode style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.totalRepos}</span>
              <span style={styles.statText}>Total Repositories</span>
            </div>
            <div style={styles.statCard} className="stat-card-hover">
              <FaStar style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.totalStars}</span>
              <span style={styles.statText}>Total Stars</span>
            </div>
            <div style={styles.statCard} className="stat-card-hover">
              <FaCodeBranch style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.totalForks}</span>
              <span style={styles.statText}>Total Forks</span>
            </div>
            <div style={styles.statCard} className="stat-card-hover">
              <FaGithub style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.activeRepos}</span>
              <span style={styles.statText}>Active Repos</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.subsectionTitle}>Top Languages by Repository Count</h2>
          <div style={styles.languageSection}>
            {stats.languageCounts.map(([language, count], index) => (
              <div key={index} style={styles.languageBar}>
                <div style={styles.languageHeader}>
                  <span style={styles.languageName}>{language}</span>
                  <span style={styles.languageCount}>
                    {count} {count === 1 ? 'repo' : 'repos'} ({Math.round((count / stats.totalRepos) * 100)}%)
                  </span>
                </div>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${(count / maxRepoCount) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.subsectionTitle}>Top Languages by Commit Activity</h2>
          <div style={styles.languageSection}>
            {stats.languageActivity.map(([language, score], index) => (
              <div key={index} style={styles.languageBar}>
                <div style={styles.languageHeader}>
                  <span style={styles.languageName}>
                    #{index + 1} {language}
                  </span>
                  <span style={styles.languageCount}>
                    Activity Score: {Math.round(score)}
                  </span>
                </div>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${(score / maxActivity) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.subsectionTitle}>Contribution Calendar</h2>
          <div style={styles.calendarContainer}>
            <GitHubCalendar
              username={username}
              theme={{
                dark: ['#0C0C0C', '#3A2A00', '#7A5A00', '#EAB308', '#FFD700']
              }}
              blockSize={15}
              blockMargin={5}
              fontSize={14}
              colorScheme="dark"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.subsectionTitle}>Commits & Activity Summary</h2>
          <div style={styles.activityCard}>
            <div style={styles.activityItem}>
              <span style={styles.activityLabel}>
                <FaUser style={{ marginRight: '8px', color: '#EAB308' }} />
                Developer Status
              </span>
              <span style={styles.activityValue}>{stats.activityStatus}</span>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityLabel}>
                <FaCalendar style={{ marginRight: '8px', color: '#EAB308' }} />
                Recently Updated
              </span>
              <span style={styles.activityValue}>{stats.mostRecent.name}</span>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityLabel}>
                <FaGithub style={{ marginRight: '8px', color: '#EAB308' }} />
                Most Active Repo
              </span>
              <span style={styles.activityValue}>{stats.mostActive.name}</span>
            </div>
            <div style={{ ...styles.activityItem, borderBottom: 'none' }}>
              <span style={styles.activityLabel}>
                <FaStar style={{ marginRight: '8px', color: '#EAB308' }} />
                Total Contributions
              </span>
              <span style={styles.activityValue}>
                {stats.totalStars + stats.totalForks} interactions
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
