import { describe, it, expect, vi, beforeEach } from 'vitest';
import githubService from '../../services/githubService';

global.fetch = vi.fn();

describe('GitHub Data Fetching Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches complete user data successfully', async () => {
    const mockProfile = {
      login: 'JagdeepMohanty',
      name: 'Jagdeep Mohanty',
      avatar_url: 'https://avatars.githubusercontent.com/u/123',
      bio: 'Software Engineer',
      public_repos: 15,
      followers: 50,
      following: 30
    };

    const mockRepos = [
      {
        id: 1,
        name: 'portfolio',
        description: 'My portfolio website',
        stargazers_count: 10,
        forks_count: 2,
        language: 'TypeScript',
        html_url: 'https://github.com/JagdeepMohanty/portfolio',
        updated_at: '2024-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'easyxpense',
        description: 'Expense tracker',
        stargazers_count: 5,
        forks_count: 1,
        language: 'JavaScript',
        html_url: 'https://github.com/JagdeepMohanty/easyxpense',
        updated_at: '2024-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z'
      }
    ];

    (global.fetch as any)
      .mockResolvedValueOnce({ ok: true, json: async () => mockProfile })
      .mockResolvedValueOnce({ ok: true, json: async () => mockRepos });

    const result = await githubService.fetchGitHubData('JagdeepMohanty');

    expect(result).not.toBeNull();
    expect(result?.profile.login).toBe('JagdeepMohanty');
    expect(result?.repos).toHaveLength(2);
    expect(result?.stats.totalStars).toBe(15);
    expect(result?.stats.totalForks).toBe(3);
    expect(result?.stats.totalRepos).toBe(2);
  });

  it('handles API errors gracefully', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('API Error'));

    const result = await githubService.fetchGitHubData('JagdeepMohanty');
    expect(result).toBeNull();
  });

  it('handles rate limiting', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 403
    });

    await expect(githubService.fetchUserProfile('JagdeepMohanty')).rejects.toThrow();
  });

  it('calculates language statistics correctly', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'repo1',
        description: 'Test',
        stargazers_count: 10,
        forks_count: 5,
        language: 'JavaScript',
        html_url: 'https://github.com/test/repo1',
        updated_at: '2024-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'repo2',
        description: 'Test',
        stargazers_count: 20,
        forks_count: 10,
        language: 'JavaScript',
        html_url: 'https://github.com/test/repo2',
        updated_at: '2024-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 3,
        name: 'repo3',
        description: 'Test',
        stargazers_count: 15,
        forks_count: 8,
        language: 'TypeScript',
        html_url: 'https://github.com/test/repo3',
        updated_at: '2024-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z'
      }
    ];

    const stats = githubService.calculateStats(mockRepos);

    expect(stats.totalLanguages).toBe(2);
    expect(stats.languages).toHaveProperty('JavaScript');
    expect(stats.languages).toHaveProperty('TypeScript');
  });

  it('fetches repos with correct parameters', async () => {
    const mockRepos: any[] = [];
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos
    });

    await githubService.fetchUserRepos('testuser');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/users/testuser/repos?per_page=100'
    );
  });
});
