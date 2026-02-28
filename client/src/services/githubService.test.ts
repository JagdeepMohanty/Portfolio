import { describe, it, expect, vi, beforeEach } from 'vitest';
import githubService from './githubService';

global.fetch = vi.fn();

describe('GitHubService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchUserProfile', () => {
    it('fetches user profile successfully', async () => {
      const mockProfile = {
        login: 'testuser',
        name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg',
        bio: 'Test bio',
        public_repos: 10,
        followers: 100,
        following: 50
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfile
      });

      const result = await githubService.fetchUserProfile('testuser');
      expect(result).toEqual(mockProfile);
      expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/users/testuser');
    });

    it('throws error on failed fetch', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false
      });

      await expect(githubService.fetchUserProfile('testuser')).rejects.toThrow();
    });
  });

  describe('fetchUserRepos', () => {
    it('fetches user repos successfully', async () => {
      const mockRepos = [
        {
          id: 1,
          name: 'repo1',
          description: 'Test repo',
          stargazers_count: 10,
          forks_count: 5,
          language: 'JavaScript',
          html_url: 'https://github.com/test/repo1'
        }
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos
      });

      const result = await githubService.fetchUserRepos('testuser');
      expect(result).toEqual(mockRepos);
    });
  });

  describe('calculateStats', () => {
    it('calculates stats correctly', () => {
      const mockRepos = [
        {
          id: 1,
          name: 'repo1',
          description: 'Test',
          stargazers_count: 10,
          forks_count: 5,
          language: 'JavaScript',
          html_url: 'https://github.com/test/repo1'
        },
        {
          id: 2,
          name: 'repo2',
          description: 'Test',
          stargazers_count: 20,
          forks_count: 10,
          language: 'TypeScript',
          html_url: 'https://github.com/test/repo2'
        }
      ];

      const stats = githubService.calculateStats(mockRepos);
      
      expect(stats.totalStars).toBe(30);
      expect(stats.totalForks).toBe(15);
      expect(stats.totalRepos).toBe(2);
      expect(stats.totalLanguages).toBe(2);
    });
  });

  describe('fetchGitHubData', () => {
    it('fetches complete GitHub data', async () => {
      const mockProfile = {
        login: 'testuser',
        name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg',
        bio: 'Test bio',
        public_repos: 10,
        followers: 100,
        following: 50
      };

      const mockRepos = [
        {
          id: 1,
          name: 'repo1',
          description: 'Test',
          stargazers_count: 10,
          forks_count: 5,
          language: 'JavaScript',
          html_url: 'https://github.com/test/repo1'
        }
      ];

      (global.fetch as any)
        .mockResolvedValueOnce({ ok: true, json: async () => mockProfile })
        .mockResolvedValueOnce({ ok: true, json: async () => mockRepos });

      const result = await githubService.fetchGitHubData('testuser');
      
      expect(result).not.toBeNull();
      expect(result?.profile).toEqual(mockProfile);
      expect(result?.repos).toEqual(mockRepos);
      expect(result?.stats).toBeDefined();
    });

    it('returns null on error', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      const result = await githubService.fetchGitHubData('testuser');
      expect(result).toBeNull();
    });
  });
});
