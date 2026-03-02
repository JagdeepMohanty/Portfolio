import { useState, useEffect, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaBook, FaCode } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import githubService from '../services/githubService';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageChart = memo(({ data, title }) => {
  const chartData = useMemo(() => ({
    labels: data.map(([label]) => label),
    datasets: [{
      data: data.map(([, value]) => value),
      backgroundColor: ['#EAB308', '#F59E0B', '#FCD34D', '#FDE68A', '#FEF3C7'],
      borderColor: '#0C0C0C',
      borderWidth: 2
    }]
  }), [data]);

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

  const total = data.reduce((sum, [, value]) => sum + value, 0);

  return (
    <div style={{
      background: 'rgba(26, 26, 26, 0.6)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(234, 179, 8, 0.2)',
      display: 'flex',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      gap: '24px',
      alignItems: 'center'
    }}>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#EAB308', marginBottom: '16px', fontWeight: 600 }}>
          {title}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.map(([label, value], index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: ['#EAB308', '#F59E0B', '#FCD34D', '#FDE68A', '#FEF3C7'][index],
                  borderRadius: '2px'
                }} />
                <span style={{ color: '#FAFAFA', fontSize: '14px' }}>{label}</span>
              </div>
              <span style={{ color: '#EAB308', fontSize: '14px', fontWeight: 600 }}>
                {Math.round((value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: '200px', height: '200px', flexShrink: 0 }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
});

LanguageChart.displayName = 'LanguageChart';

const GitHubSection = memo(({ theme }) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const username = 'JagdeepMohanty';
  const isDark = theme === 'dark';

  const languageStats = useMemo(() => {
    if (repos.length === 0) return { languagesByRepo: [], languagesByUsage: [] };
    return githubService.getLanguageStats(repos);
  }, [repos]);

  const totalStars = useMemo(() => repos.reduce((sum, repo) => sum + repo.stargazers_count, 0), [repos]);
  const totalForks = useMemo(() => repos.reduce((sum, repo) => sum + repo.forks_count, 0), [repos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const [profileData, reposData] = await Promise.all([
          githubService.getGitHubProfile(username),
          githubService.getGitHubRepos(username)
        ]);
        setProfile(profileData);
        setRepos(reposData);
        const commitsCount = await githubService.getTotalCommits(username, reposData);
        setCommits(commitsCount);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="github" style={{ padding: 'clamp(40px, 8vw, 60px) 20px', background: isDark ? '#0C0C0C' : '#F5F5F5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.2rem)', fontWeight: 700, color: '#EAB308', marginBottom: '40px' }}>
            <FaGithub style={{ marginRight: '10px', verticalAlign: 'middle' }} />
            GitHub Dashboard
          </h2>
          <p style={{ color: '#A3A3A3' }}>Loading GitHub data...</p>
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section id="github" style={{ padding: 'clamp(40px, 8vw, 60px) 20px', background: isDark ? '#0C0C0C' : '#F5F5F5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.2rem)', fontWeight: 700, color: '#EAB308', marginBottom: '20px' }}>
            <FaGithub style={{ marginRight: '10px', verticalAlign: 'middle' }} />
            GitHub Dashboard
          </h2>
          <p style={{ color: '#A3A3A3' }}>Unable to load GitHub data. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="github" style={{ padding: 'clamp(40px, 8vw, 60px) 20px', background: isDark ? '#0C0C0C' : '#F5F5F5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '40px', color: '#EAB308' }}
        >
          <FaGithub style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          GitHub Dashboard
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            marginBottom: '30px',
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            gap: '24px',
            alignItems: window.innerWidth < 768 ? 'center' : 'flex-start'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <img
              src={profile.avatar}
              alt={profile.name}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: '3px solid #EAB308',
                boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)'
              }}
            />
            <h3 style={{ fontSize: '1.2rem', color: '#FAFAFA', fontWeight: 700, margin: 0, textAlign: 'center' }}>
              {profile.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#A3A3A3', margin: 0 }}>@{profile.username}</p>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#EAB308', fontWeight: 700 }}>{profile.publicRepos}</div>
                <div style={{ fontSize: '0.85rem', color: '#A3A3A3' }}>Repos</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#EAB308', fontWeight: 700 }}>{profile.followers}</div>
                <div style={{ fontSize: '0.85rem', color: '#A3A3A3' }}>Followers</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#EAB308', fontWeight: 700 }}>{profile.following}</div>
                <div style={{ fontSize: '0.85rem', color: '#A3A3A3' }}>Following</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#EAB308', fontWeight: 700 }}>{commits}</div>
                <div style={{ fontSize: '0.85rem', color: '#A3A3A3' }}>Commits</div>
              </div>
            </div>
            {profile.bio && (
              <p style={{ color: '#A3A3A3', fontSize: '0.95rem', marginBottom: '16px', lineHeight: 1.6 }}>
                {profile.bio}
              </p>
            )}
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
                color: '#0C0C0C',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              View GitHub Profile
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}
        >
          <div style={{
            background: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            textAlign: 'center'
          }}>
            <FaCode style={{ fontSize: '2rem', color: '#EAB308', marginBottom: '10px' }} />
            <div style={{ fontSize: '1.8rem', color: '#EAB308', fontWeight: 700 }}>{commits}</div>
            <div style={{ fontSize: '0.9rem', color: '#A3A3A3' }}>Total Commits</div>
          </div>
          <div style={{
            background: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            textAlign: 'center'
          }}>
            <FaBook style={{ fontSize: '2rem', color: '#EAB308', marginBottom: '10px' }} />
            <div style={{ fontSize: '1.8rem', color: '#EAB308', fontWeight: 700 }}>{profile.publicRepos}</div>
            <div style={{ fontSize: '0.9rem', color: '#A3A3A3' }}>Public Repos</div>
          </div>
          <div style={{
            background: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            textAlign: 'center'
          }}>
            <FaStar style={{ fontSize: '2rem', color: '#EAB308', marginBottom: '10px' }} />
            <div style={{ fontSize: '1.8rem', color: '#EAB308', fontWeight: 700 }}>{totalStars}</div>
            <div style={{ fontSize: '0.9rem', color: '#A3A3A3' }}>Total Stars</div>
          </div>
          <div style={{
            background: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            textAlign: 'center'
          }}>
            <FaCodeBranch style={{ fontSize: '2rem', color: '#EAB308', marginBottom: '10px' }} />
            <div style={{ fontSize: '1.8rem', color: '#EAB308', fontWeight: 700 }}>{totalForks}</div>
            <div style={{ fontSize: '0.9rem', color: '#A3A3A3' }}>Total Forks</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            marginBottom: '30px'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', color: '#EAB308', marginBottom: '16px', fontWeight: 600 }}>
            Contribution Graph
          </h3>
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-dark&bg_color=0C0C0C&color=EAB308&line=F59E0B&point=EAB308&area=true&hide_border=true`}
            alt="Contribution Graph"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            marginBottom: '30px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', color: '#EAB308', marginBottom: '16px', fontWeight: 600 }}>
            Contribution Calendar
          </h3>
          <img
            src={`https://ghchart.rshah.org/EAB308/${username}`}
            alt="Contribution Calendar"
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', display: 'block' }}
          />
        </motion.div>

        {languageStats.languagesByRepo.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : 'repeat(2, 1fr)',
              gap: '24px'
            }}
          >
            <LanguageChart data={languageStats.languagesByRepo} title="Top Languages by Repos" />
            <LanguageChart data={languageStats.languagesByUsage} title="Top Languages by Usage" />
          </motion.div>
        )}
      </div>
    </section>
  );
});

GitHubSection.displayName = 'GitHubSection';

export default GitHubSection;
