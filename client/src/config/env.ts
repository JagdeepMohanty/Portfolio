const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not defined`);
    return '';
  }
  
  return value || defaultValue || '';
};

export const ENV = {
  GITHUB_USERNAME: getEnvVar('VITE_GITHUB_USERNAME', 'JagdeepMohanty'),
  GITHUB_API_URL: getEnvVar('VITE_GITHUB_API_URL', 'https://api.github.com'),
  CONTACT_EMAIL: getEnvVar('VITE_CONTACT_EMAIL', 'jagdeepmohanty1807@gmail.com'),
  LINKEDIN_URL: getEnvVar('VITE_LINKEDIN_URL', 'https://www.linkedin.com/in/jagdeepmohanty'),
  GITHUB_URL: getEnvVar('VITE_GITHUB_URL', 'https://github.com/JagdeepMohanty'),
  SENTRY_DSN: getEnvVar('VITE_SENTRY_DSN'),
  SENTRY_ENVIRONMENT: getEnvVar('VITE_SENTRY_ENVIRONMENT', 'production'),
  ENABLE_ANALYTICS: getEnvVar('VITE_ENABLE_ANALYTICS', 'false') === 'true',
  ENABLE_ERROR_TRACKING: getEnvVar('VITE_ENABLE_ERROR_TRACKING', 'false') === 'true',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;

export const validateEnv = () => {
  const required = ['VITE_GITHUB_USERNAME', 'VITE_CONTACT_EMAIL'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0 && ENV.IS_PRODUCTION) {
    console.error('Missing required environment variables:', missing);
  }
};
