// API service for the portfolio
// Now using static data instead of backend API calls
// No backend required - fully frontend-only

import { projects } from '../data/projects';
import { certificates } from '../data/certificates';

// Get all projects (returns static data)
export const getProjects = async () => {
  // Simulate async behavior for consistency with previous API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projects);
    }, 100);
  });
};

// Get all certificates (returns static data)
export const getCertificates = async () => {
  // Simulate async behavior for consistency with previous API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(certificates);
    }, 100);
  });
};

// Contact form submission - handled by Netlify Forms
// This function is kept for backwards compatibility but doesn't do anything
// The form submission is handled by Netlify's built-in form handling
export const submitContact = async (data) => {
  // Netlify Forms handle the submission automatically
  // This function is a placeholder for backwards compatibility
  console.log('Contact form submitted:', data);
  return { success: true, message: 'Form submission handled by Netlify' };
};

// Get GitHub repositories - placeholder for future implementation
// Could be implemented using GitHub API directly from frontend
export const getGithubRepos = async () => {
  // Placeholder - can be implemented with GitHub API if needed
  return [];
};

export default {
  getProjects,
  getCertificates,
  submitContact,
  getGithubRepos
};
