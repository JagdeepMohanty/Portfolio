export const COLORS = {
  primary: '#EAB308',
  primaryDark: '#F59E0B',
  backgroundDark: '#0C0C0C',
  backgroundLight: '#F5F5F5',
  cardDark: '#1A1A1A',
  cardLight: '#FFFFFF',
  textPrimaryDark: '#FAFAFA',
  textPrimaryLight: '#1A1A1A',
  textSecondaryDark: '#A3A3A3',
  textSecondaryLight: '#666666',
  borderDark: 'rgba(234, 179, 8, 0.1)',
  borderLight: 'rgba(234, 179, 8, 0.2)',
  borderDarkStrong: 'rgba(234, 179, 8, 0.2)',
  borderLightStrong: 'rgba(234, 179, 8, 0.3)',
  linkedin: '#0A66C2',
  github: '#FAFAFA',
  email: '#EA4335',
} as const;

export const BREAKPOINTS = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px',
} as const;

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;

export const BORDER_RADIUS = {
  sm: '6px',
  md: '8px',
  lg: '10px',
  xl: '12px',
  full: '50%',
} as const;

export const TRANSITIONS = {
  fast: '0.2s ease',
  normal: '0.3s ease',
  slow: '0.6s ease',
} as const;

export const SHADOWS = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
  md: '0 4px 20px rgba(234, 179, 8, 0.5)',
  lg: '0 8px 30px rgba(234, 179, 8, 0.7)',
  glow: '0 0 15px rgba(234, 179, 8, 0.3)',
  glowStrong: '0 0 20px rgba(234, 179, 8, 0.4)',
} as const;

export const FONT_SIZES = {
  xs: 'clamp(0.75rem, 1.5vw, 0.85rem)',
  sm: 'clamp(0.85rem, 1.8vw, 0.9rem)',
  md: 'clamp(0.9rem, 2vw, 1rem)',
  lg: 'clamp(1.1rem, 2.5vw, 1.3rem)',
  xl: 'clamp(1.5rem, 4vw, 2rem)',
  xxl: 'clamp(2rem, 5vw, 2.5rem)',
} as const;

export const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const Z_INDEX = {
  base: 1,
  dropdown: 10,
  sticky: 100,
  fixed: 500,
  modal: 1000,
  tooltip: 1500,
} as const;
