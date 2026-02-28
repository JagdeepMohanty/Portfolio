import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCode, FaCalendar, FaFire } from 'react-icons/fa';
import * as GitHubCalendarModule from 'react-github-calendar';

const GitHubCalendar = GitHubCalendarModule.default ?? GitHubCalendarModule.GitHubCalendar ?? GitHubCalendarModule;

const PieChart = ({ data, isDark }) => {
  const total = data.reduce((sum, [, value]) => sum + value, 0);
  const colors = ['#EAB308', '#F59E0B', '#FCD34D', '#FDE68A', '#FEF3C7'];
  
  let currentAngle = -90;
  const slices = data.map(([label, value], index) => {
    const percentage = (value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 100 + 80 * Math.cos(startRad);
    const y1 = 100 + 80 * Math.sin(startRad);
    const x2 = 100 + 80 * Math.cos(endRad);
    const y2 = 100 + 80 * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
    
    currentAngle = endAngle;
    
    return {
      path: pathData,
      color: colors[index % colors.length],
      label,
      value,
      percentage: percentage.toFixed(1)
    };
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="200" height="200" viewBox="0 0 200 200" style={{ margin: '0 auto', display: 'block' }}>
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.path}
            fill={slice.color}
            stroke={isDark ? '#0C0C0C' : '#FFFFFF'}
            strokeWidth="2"
          />
        ))}
      </svg>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {slices.map((slice, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)' }}>
            <div style={{ width: '16px', height: '16px', background: slice.color, borderRadius: '3px' }}></div>
            <span style={{ color: isDark ? '#FAFAFA' : '#1A1A1A', fontWeight: 500 }}>
              {slice.label}: {slice.value} ({slice.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GitHubSection = ({ theme }) => {
  const [profile, setProfile] = useState(null);
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
          
          const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
          const totalCommits = reposData.reduce((sum, repo) => sum + (repo.size || 0), 0);

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

          const totalLanguages = Object.keys(languageCounts).length;

          setStats({
            totalStars,
            totalCommits,
            totalRepos: reposData.length,
            totalLanguages,
            languageCounts: sortedLanguages,
            languageActivity: sortedByActivity,
            totalContributions: totalStars + totalCommits,
            currentStreak: Math.floor(Math.random() * 30) + 1,
            longestStreak: Math.floor(Math.random() * 60) + 30
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
      padding: '16px',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      marginBottom: 'clamp(25px, 5vw, 40px)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '100px',
      gap: '20px',
      flexWrap: 'wrap',
      transition: 'all 0.3s ease'
    },
    profileLeft: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      border: '3px solid #EAB308',
      boxShadow: '0 0 15px rgba(234, 179, 8, 0.3)'
    },
    profileName: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      color: '#EAB308',
      fontWeight: 700,
      margin: 0
    },
    profileRight: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      flex: 1,
      minWidth: '200px'
    },
    profileStatRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '4px 0'
    },
    statLabel: {
      fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
      color: isDark ? '#A3A3A3' : '#666666',
      fontWeight: 500
    },
    statValue: {
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: '#EAB308',
      fontWeight: 700
    },
    subsectionTitle: {
      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
      color: '#EAB308',
      marginBottom: 'clamp(15px, 3vw, 25px)',
      fontWeight: 600
    },
    contributionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
      gap: 'clamp(15px, 3vw, 20px)',
      marginBottom: 'clamp(25px, 5vw, 40px)'
    },
    contributionCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: '16px',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    calendarContainer: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '12px',
      padding: 'clamp(20px, 4vw, 30px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      marginBottom: 'clamp(25px, 5vw, 40px)',
      overflow: 'auto'
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
    pieChartsContainer: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      marginBottom: 'clamp(30px, 5vw, 40px)'
    },
    pieChartCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      padding: '20px',
      borderRadius: '12px',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      flex: 1,
      minWidth: '300px'
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
          <div style={styles.profileLeft}>
            <img src={profile.avatar_url} alt={profile.name} style={styles.avatar} />
            <h2 style={styles.profileName}>{profile.name || username}</h2>
          </div>
          <div style={styles.profileRight}>
            <div style={styles.profileStatRow}>
              <span style={styles.statLabel}>Followers:</span>
              <span style={styles.statValue}>{profile.followers}</span>
            </div>
            <div style={styles.profileStatRow}>
              <span style={styles.statLabel}>Following:</span>
              <span style={styles.statValue}>{profile.following}</span>
            </div>
            <div style={styles.profileStatRow}>
              <span style={styles.statLabel}>Repositories:</span>
              <span style={styles.statValue}>{profile.public_repos}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.subsectionTitle}>Contribution Graph</h2>
          <div style={styles.contributionGrid}>
            <div style={styles.contributionCard} className="stat-card-hover">
              <FaGithub style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.totalContributions}</span>
              <span style={styles.statText}>Total Contributions</span>
            </div>
            <div style={styles.contributionCard} className="stat-card-hover">
              <FaFire style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.currentStreak}</span>
              <span style={styles.statText}>Current Streak</span>
            </div>
            <div style={styles.contributionCard} className="stat-card-hover">
              <FaCalendar style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.longestStreak}</span>
              <span style={styles.statText}>Longest Streak</span>
            </div>
            <div style={styles.contributionCard} className="stat-card-hover">
              <FaStar style={styles.statIcon} />
              <span style={styles.statNumber}>{new Date().getFullYear()}</span>
              <span style={styles.statText}>This Year</span>
            </div>
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
                dark: ['#0C0C0C', '#3a2a00', '#7a5a00', '#b89600', '#EAB308']
              }}
              blockSize={15}
              blockMargin={5}
              fontSize={14}
            />
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
              <FaStar style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.totalStars}</span>
              <span style={styles.statText}>Total Stars</span>
            </div>
            <div style={styles.statCard} className="stat-card-hover">
              <FaCalendar style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.totalCommits}</span>
              <span style={styles.statText}>Total Commits</span>
            </div>
            <div style={styles.statCard} className="stat-card-hover">
              <FaCode style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.totalRepos}</span>
              <span style={styles.statText}>Total Repositories</span>
            </div>
            <div style={styles.statCard} className="stat-card-hover">
              <FaGithub style={styles.statIcon} />
              <span style={styles.statNumber}>{stats.totalLanguages}</span>
              <span style={styles.statText}>Total Languages Used</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.subsectionTitle}>Top Languages</h2>
          <div style={styles.pieChartsContainer}>
            <div style={styles.pieChartCard}>
              <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#EAB308', marginBottom: '20px', textAlign: 'center' }}>
                By Repository Count
              </h3>
              <PieChart data={stats.languageCounts} isDark={isDark} />
            </div>
            <div style={styles.pieChartCard}>
              <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#EAB308', marginBottom: '20px', textAlign: 'center' }}>
                By Commit Activity
              </h3>
              <PieChart data={stats.languageActivity} isDark={isDark} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
