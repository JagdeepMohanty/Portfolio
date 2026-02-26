import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../RepoCard';
import './GitHubSection.css';

const GitHubSection = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = 'JagdeepMohanty';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=100`)
        ]);

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        setProfile(profileData);
        setRepos(reposData.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section id="github" className="github-section section">
        <div className="container">
          <h1 className="section-title">GitHub Activity</h1>
          <div className="loader"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="github-section section">
      <div className="container">
        <h1 className="section-title">GitHub Activity</h1>

        {profile && (
          <motion.div
            className="github-profile card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src={profile.avatar_url} alt={profile.name} className="profile-avatar" />
            <div className="profile-info">
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-bio">{profile.bio}</p>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-value">{profile.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{profile.following}</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{profile.public_repos}</span>
                  <span className="stat-label">Repositories</span>
                </div>
              </div>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <FaGithub /> View Profile
              </a>
            </div>
          </motion.div>
        )}

        <motion.div
          className="contribution-calendar"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="subsection-title">Contribution Activity</h2>
          <div className="calendar-wrapper">
            <GitHubCalendar
              username={username}
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              colorScheme="dark"
              theme={{
                dark: ['#0C0C0C', '#1A1A1A', '#F59E0B', '#EAB308', '#D97706']
              }}
            />
          </div>
        </motion.div>

        <div className="repos-section">
          <h2 className="subsection-title">Top Repositories</h2>
          <motion.div
            className="repos-grid grid grid-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
