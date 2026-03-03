const BASE_URL = 'https://api.github.com';
const GRAPHQL_URL = 'https://api.github.com/graphql';
const CACHE_DURATION = 10 * 60 * 1000;

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

const fetchWithRetry = async (url, options = {}, retries = 2) => {
  try {
    const response = await fetch(url, { ...options, cache: 'no-store' });
    if (response.status === 403) throw new Error('Rate limit');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return fetchWithRetry(url, options, retries - 1);
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

  let allRepos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const data = await fetchWithRetry(`${BASE_URL}/users/${username}/repos?per_page=100&page=${page}`);
    if (data.length === 0) {
      hasMore = false;
    } else {
      allRepos = [...allRepos, ...data];
      page++;
      if (data.length < 100) hasMore = false;
    }
  }

  setCache(cacheKey, allRepos);
  return allRepos;
};

export const getContributions = async (username) => {
  const cacheKey = `contributions_${username}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!token) {
    console.warn('VITE_GITHUB_TOKEN not set, using fallback API');
    return getFallbackContributions(username);
  }

  try {
    const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetchWithRetry(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (response.errors) {
      console.error('GraphQL error:', response.errors);
      return getFallbackContributions(username);
    }

    const weeks = response.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    
    if (weeks.length === 0) {
      return getFallbackContributions(username);
    }

    const processedWeeks = weeks.map(week => 
      week.contributionDays.map(day => day.contributionCount)
    );

    setCache(cacheKey, processedWeeks);
    return processedWeeks;
  } catch (error) {
    console.error('GraphQL fetch failed:', error);
    return getFallbackContributions(username);
  }
};

const getFallbackContributions = async (username) => {
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Fallback API failed');
    
    const data = await response.json();
    if (!data.contributions || data.contributions.length === 0) throw new Error('No data');
    
    const weeks = [];
    let currentWeek = [];
    
    data.contributions.forEach((day, index) => {
      currentWeek.push(day.count || 0);
      if ((index + 1) % 7 === 0 || index === data.contributions.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    return weeks;
  } catch (error) {
    console.error('Fallback API failed:', error);
    return [];
  }
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
  getLanguageStats,
  getContributions
};

export default githubService;
