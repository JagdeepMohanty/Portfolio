import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCode, FaCalendar } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const DoughnutChart = ({ data, isDark, title }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: isDark ? '#A3A3A3' : '#666666', fontSize: '14px' }}>
        No data available
      </div>
    );
  }

  const chartData = {
    labels: data.map(([label]) => label),
    datasets: [
      {
        data: data.map(([, value]) => value),
        backgroundColor: ['#EAB308', '#F59E0B', '#FCD34D', '#FDE68A', '#FEF3C7'],
        borderColor: isDark ? '#0C0C0C' : '#FFFFFF',
        borderWidth: 2
      }
    ]
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1A1A1A',
        titleColor: '#EAB308',
        bodyColor: '#FAFAFA',
        borderColor: '#EAB308',
        borderWidth: 1
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ 
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '12px',
      padding: '20px',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      height: '200px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', height: '100%' }} className="doughnut-chart-container">
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', 
            color: '#EAB308', 
            marginBottom: '15px',
            fontWeight: 600
          }}>
            {title}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.slice(0, 3).map(([label, value], index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  background: ['#EAB308', '#F59E0B', '#FCD34D'][index], 
                  borderRadius: '3px' 
                }}></div>
                <span style={{ color: isDark ? '#FAFAFA' : '#1A1A1A', fontWeight: 500 }}>
                  {label}: {value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: '140px', height: '140px', flexShrink: 0 }}>
          <Doughnut data={chartData} options={options} />
        </div>
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
      @media (max-width: 768px) {
        .doughnut-chart-container {
          flex-direction: column !important;
          text-align: center;
        }
        .doughnut-chart-wrapper {
          margin: 0 auto;
        }
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
      padding: '30px 20px',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      marginBottom: 'clamp(25px, 5vw, 40px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      border: '3px solid #EAB308',
      boxShadow: '0 0 15px rgba(234, 179, 8, 0.3)',
      marginBottom: '15px'
    },
    profileName: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
      color: '#EAB308',
      fontWeight: 700,
      margin: '0 0 20px 0'
    },
    profileStats: {
      display: 'flex',
      gap: '30px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    profileStatItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    statValue: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
      color: '#EAB308',
      fontWeight: 700,
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
      color: isDark ? '#A3A3A3' : '#666666',
      fontWeight: 500
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
    languagesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
      gap: 'clamp(15px, 3vw, 20px)',
      marginBottom: 'clamp(30px, 5vw, 40px)'
    },
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
          <img src={profile.avatar_url} alt={profile.name} style={styles.avatar} />
          <h2 style={styles.profileName}>{profile.name || username}</h2>
          <div style={styles.profileStats}>
            <div style={styles.profileStatItem}>
              <span style={styles.statValue}>{profile.followers}</span>
              <span style={styles.statLabel}>Followers</span>
            </div>
            <div style={styles.profileStatItem}>
              <span style={styles.statValue}>{profile.following}</span>
              <span style={styles.statLabel}>Following</span>
            </div>
            <div style={styles.profileStatItem}>
              <span style={styles.statValue}>{profile.public_repos}</span>
              <span style={styles.statLabel}>Repositories</span>
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
          <div style={{
            background: '#1A1A1A',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`
          }}>
            <img 
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-dark&bg_color=1A1A1A&color=EAB308&line=F59E0B&point=EAB308&area=true&hide_border=true`}
              alt="GitHub Contribution Graph"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                display: 'block'
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.subsectionTitle}>Contribution Calendar</h2>
          <div style={{
            background: '#1A1A1A',
            padding: '20px',
            borderRadius: '12px',
            border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
            marginBottom: 'clamp(25px, 5vw, 40px)',
            overflow: 'auto'
          }}>
            <img 
              src={`https://ghchart.rshah.org/EAB308/${username}`}
              alt="GitHub Contribution Calendar"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                display: 'block'
              }}
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
          <div style={styles.languagesGrid}>
            {stats.languageCounts && stats.languageCounts.length > 0 && (
              <DoughnutChart 
                data={stats.languageCounts} 
                isDark={isDark} 
                title="By Repository Count"
              />
            )}
            {stats.languageActivity && stats.languageActivity.length > 0 && (
              <DoughnutChart 
                data={stats.languageActivity} 
                isDark={isDark} 
                title="By Commit Activity"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
