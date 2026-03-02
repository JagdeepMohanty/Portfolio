const BASE_URL = 'https://api.github.com';
const CACHE_DURATION = 5 * 60 * 1000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const cache = new Map();

const getFromCache = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }
  return entry.data;
};

const setCache = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

const fetchWithRetry = async (url, retries = MAX_RETRIES) => {
  try {
    const response = await fetch(url);
    if (response.status === 403) throw new Error('Rate limit');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
};

export const getGitHubProfile = async (username) => {
  const cacheKey = `profile_${username}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const data = await fetchWithRetry(`${BASE_URL}/users/${username}`);
  const profile = {
    avatar: data.avatar_url,
    name: data.name || data.login,
    username: data.login,
    bio: data.bio || '',
    publicRepos: data.public_repos,
    followers: data.followers,
    following: data.following,
    profileUrl: data.html_url
  };
  setCache(cacheKey, profile);
  return profile;
};

export const getGitHubRepos = async (username) => {
  const cacheKey = `repos_${username}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const data = await fetchWithRetry(`${BASE_URL}/users/${username}/repos?per_page=100`);
  setCache(cacheKey, data);
  return data || [];
};

export const getTotalCommits = async (username, repos) => {
  const cacheKey = `commits_${username}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  let total = 0;
  const limit = Math.min(repos.length, 10);
  
  for (let i = 0; i < limit; i++) {
    try {
      const url = `${BASE_URL}/repos/${username}/${repos[i].name}/commits?per_page=1`;
      const response = await fetch(url);
      if (response.ok) {
        const link = response.headers.get('Link');
        if (link) {
          const match = link.match(/page=(\d+)>; rel="last"/);
          if (match) total += parseInt(match[1]);
        } else {
          const commits = await response.json();
          total += commits.length;
        }
      }
    } catch {
      continue;
    }
  }
  
  setCache(cacheKey, total);
  return total;
};

export const getLanguageStats = (repos) => {
  const languagesByRepo = {};
  const languagesByUsage = {};

  repos.forEach(repo => {
    if (repo.language) {
      languagesByRepo[repo.language] = (languagesByRepo[repo.language] || 0) + 1;
      languagesByUsage[repo.language] = (languagesByUsage[repo.language] || 0) + repo.size;
    }
  });

  const sortByRepo = Object.entries(languagesByRepo)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const sortByUsage = Object.entries(languagesByUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return {
    languagesByRepo: sortByRepo,
    languagesByUsage: sortByUsage
  };
};

const githubService = {
  getGitHubProfile,
  getGitHubRepos,
  getTotalCommits,
  getLanguageStats
};

export default githubService;
