export const APP_CONFIG = {
  name: 'Jagdeep Mohanty Portfolio',
  title: 'Jagdeep Mohanty || B.Tech CSE || Passionate About Coding and Data',
  description: 'Software Engineer Portfolio - Black & Gold Premium Theme',
  author: 'Jagdeep Mohanty',
} as const;

export const SCROLL_CONFIG = {
  backToTopThreshold: 300,
  smoothScrollBehavior: 'smooth',
} as const;

export const ANIMATION_CONFIG = {
  fadeInDuration: 0.6,
  slideInDuration: 0.5,
  hoverScale: 1.02,
  buttonHoverScale: 1.05,
  iconHoverScale: 1.15,
  staggerDelay: 0.1,
} as const;

export const GITHUB_API = {
  baseUrl: 'https://api.github.com',
  userEndpoint: (username: string) => `/users/${username}`,
  reposEndpoint: (username: string) => `/users/${username}/repos`,
  perPage: 100,
} as const;

export const EXTERNAL_APIS = {
  githubGraph: (username: string) => 
    `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-dark&bg_color=1A1A1A&color=EAB308&line=F59E0B&point=EAB308&area=true&hide_border=true`,
  githubCalendar: (username: string) => 
    `https://ghchart.rshah.org/EAB308/${username}`,
} as const;

export const FORM_CONFIG = {
  netlifyFormName: 'contact',
  successMessageDuration: 3000,
} as const;

export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME = 'dark' as const;
