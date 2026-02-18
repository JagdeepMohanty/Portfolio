import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getCertificates = async () => {
  const response = await api.get('/certificates');
  return response.data;
};

export const submitContact = async (data) => {
  const response = await api.post('/contact', data);
  return response.data;
};

export const getGithubRepos = async () => {
  const response = await api.get('/github/repos');
  return response.data;
};

export default api;
