import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaBook } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import githubService from '../services/githubService';
import { APP_CONFIG } from '../constants/config';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const Skeleton = memo(() => (
  <div style={{ 
    background: 'linear-gradient(90deg, #1A1A1A 25%, #2A2A2A 50%, #1A1A1A 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '8px',
    height: '100%',
    minHeight: '100px'
  }} />
));

Skeleton.displayName = 'Skeleton';

const DoughnutChart = memo(({ data, title }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#A3A3A3', fontSize: '14px' }}>
        No data available
      </div>
    );
  }

  const chartData = {
    labels: data.map(([label]) => label),
    datasets: [{
      data: data.map(([, value]) => value),
      backgroundColor: ['#EAB308', '#F59E0B', '#FCD34D', '#FDE68A', '#FEF3C7'],
      borderColor: '#0C0C0C',
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1A1A1A',
        titleColor: '#EAB308',
        bodyColor: '#FAFAFA',
        borderColor: '#EAB308',
        borderWidth: 1
      }
    }
  };

  return (
    <div style={{ 
      background: '#1A1A1A',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(234, 179, 8, 0.1)',
      width: '100%',
      maxWidth: '320px',
      margin: '0 auto'
    }}>
      <h3 style={{ 
        fontSize: '1rem', 
        color: '#EAB308', 
        marginBottom: '15px',
        fontWeight: 600,
        textAlign: 'center'
      }}>
        {title}
      </h3>
      <div style={{ width: '100%', maxWidth: '220px', height: '220px', margin: '0 auto 15px' }}>
        <Doughnut data={chartData} options={options} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {data.slice(0, 3).map(([label, value], index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              background: ['#EAB308', '#F59E0B', '#FCD34D'][index], 
              borderRadius: '2px',
              flexShrink: 0
            }} />
            <span style={{ color: '#FAFAFA', fontWeight: 500 }}>
              {label}: {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

DoughnutChart.displayName = 'DoughnutChart';

const GitHubSection = memo(() => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stats, setStats] = useState(null);

  const username = APP_CONFIG.githubUsername;

  const handleRetry = async () => {
    setLoading(true);
    setError(false);
    const data = await githubService.fetchGitHubData(username);
    
    if (data) {
      setProfile(data.profile);
      setStats(data.stats);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      const data = await githubService.fetchGitHubData(username);
      
      if (data) {
        setProfile(data.profile);
        setStats(data.stats);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <section style={{ padding: 'clamp(40px, 8vw, 60px) 0', background: '#0C0C0C' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '40px', color: '#EAB308' }}>
            <FaGithub style={{ marginRight: '10px', verticalAlign: 'middle' }} />
            GitHub Dashboard
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </section>
    );
  }

  if (error || !profile || !stats) {
    return (
      <section style={{ padding: 'clamp(40px, 8vw, 60px) 0', background: '#0C0C0C' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, marginBottom: '20px', color: '#EAB308' }}>
            <FaGithub style={{ marginRight: '10px', verticalAlign: 'middle' }} />
            GitHub Dashboard
          </h2>
          <p style={{ color: '#A3A3A3', marginBottom: '20px' }}>Failed to load GitHub data</p>
          <button
            onClick={handleRetry}
            style={{
              background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
              color: '#0C0C0C',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="github" style={{ padding: 'clamp(40px, 8vw, 60px) 0', background: '#0C0C0C' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '40px', color: '#EAB308' }}
        >
          <FaGithub style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          GitHub Dashboard
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: '#1A1A1A',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            marginBottom: '30px',
            maxWidth: '400px',
            margin: '0 auto 30px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <img
              src={profile.avatar_url}
              alt={profile.name}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '3px solid #EAB308',
                boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)'
              }}
            />
            <h3 style={{ fontSize: '1.2rem', color: '#FAFAFA', fontWeight: 700, margin: 0 }}>
              {profile.name || profile.login}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', marginTop: '8px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', color: '#EAB308', fontWeight: 700 }}>{profile.followers}</div>
                <div style={{ fontSize: '0.85rem', color: '#A3A3A3' }}>Followers</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', color: '#EAB308', fontWeight: 700 }}>{profile.following}</div>
                <div style={{ fontSize: '0.85rem', color: '#A3A3A3' }}>Following</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', color: '#EAB308', fontWeight: 700 }}>{profile.public_repos}</div>
                <div style={{ fontSize: '0.85rem', color: '#A3A3A3' }}>Repos</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}
        >
          <div style={{
            background: '#1A1A1A',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(234, 179, 8, 0.1)',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            <FaStar style={{ fontSize: '2rem', color: '#EAB308', marginBottom: '10px' }} />
            <div style={{ fontSize: '1.8rem', color: '#EAB308', fontWeight: 700, marginBottom: '5px' }}>{stats.totalStars}</div>
            <div style={{ fontSize: '0.9rem', color: '#A3A3A3' }}>Total Stars</div>
          </div>
          <div style={{
            background: '#1A1A1A',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(234, 179, 8, 0.1)',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            <FaCodeBranch style={{ fontSize: '2rem', color: '#EAB308', marginBottom: '10px' }} />
            <div style={{ fontSize: '1.8rem', color: '#EAB308', fontWeight: 700, marginBottom: '5px' }}>{stats.totalForks}</div>
            <div style={{ fontSize: '0.9rem', color: '#A3A3A3' }}>Total Forks</div>
          </div>
          <div style={{
            background: '#1A1A1A',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(234, 179, 8, 0.1)',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            <FaBook style={{ fontSize: '2rem', color: '#EAB308', marginBottom: '10px' }} />
            <div style={{ fontSize: '1.8rem', color: '#EAB308', fontWeight: 700, marginBottom: '5px' }}>{stats.totalRepos}</div>
            <div style={{ fontSize: '0.9rem', color: '#A3A3A3' }}>Public Repos</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}
        >
          <DoughnutChart data={stats.languageCounts} title="Top Languages" />
          <DoughnutChart data={stats.languageActivity} title="Most Active Languages" />
        </motion.div>
      </div>
    </section>
  );
});

GitHubSection.displayName = 'GitHubSection';

export default GitHubSection;
