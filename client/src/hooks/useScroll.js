import { useState, useEffect } from 'react';
import { SCROLL_CONFIG } from '../constants/config';

export const useScroll = (threshold = SCROLL_CONFIG.backToTopThreshold) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: SCROLL_CONFIG.smoothScrollBehavior
    });
  };

  return { showBackToTop, scrollToTop };
};
