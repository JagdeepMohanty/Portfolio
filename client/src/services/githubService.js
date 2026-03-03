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

export const getContributionData = async (username) => {
  const cacheKey = `contributions_${username}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!token) {
    console.warn('VITE_GITHUB_TOKEN not set');
    return { weeks: [], totalContributions: 0 };
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

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query }),
      cache: 'no-store'
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL error:', data.errors);
      return { weeks: [], totalContributions: 0 };
    }

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return { weeks: [], totalContributions: 0 };

    const result = {
      weeks: calendar.weeks || [],
      totalContributions: calendar.totalContributions || 0
    };

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Contribution fetch failed:', error);
    return { weeks: [], totalContributions: 0 };
  }
};

export default { getContributionData };
