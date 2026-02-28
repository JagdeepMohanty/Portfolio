export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_link: string;
  demo_link?: string;
  image_url?: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image_url: string;
}

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: Record<string, number>;
}

export interface ContactOption {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  info: string;
  link: string;
  color: string;
}

export interface Theme {
  isDark: boolean;
}

export interface ScrollState {
  showBackToTop: boolean;
}
