const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';
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

  try {
    const response = await fetch(`${CONTRIBUTIONS_API}/${username}?y=last`, {
      cache: 'no-store'
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    
    if (!data.contributions || data.contributions.length === 0) {
      throw new Error('No contribution data');
    }

    // Transform flat array into weeks (7 days per week)
    const weeks = [];
    for (let i = 0; i < data.contributions.length; i += 7) {
      weeks.push(data.contributions.slice(i, i + 7));
    }

    const result = {
      weeks,
      totalContributions: data.contributions.reduce((sum, day) => sum + (day.count || 0), 0)
    };

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Contribution fetch failed:', error);
    return { weeks: [], totalContributions: 0 };
  }
};

export default { getContributionData };
