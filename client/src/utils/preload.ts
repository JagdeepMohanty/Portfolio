export const preloadCriticalResources = () => {
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
  ];

  criticalFonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = font;
    document.head.appendChild(link);
  });
};

export const prefetchRoute = (route: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  document.head.appendChild(link);
};
