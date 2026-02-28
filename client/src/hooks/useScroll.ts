import { useState, useEffect } from 'react';
import { SCROLL_CONFIG } from '../constants/config';

interface UseScrollReturn {
  showBackToTop: boolean;
  scrollToTop: () => void;
}

export const useScroll = (threshold: number = SCROLL_CONFIG.backToTopThreshold): UseScrollReturn => {
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
      behavior: SCROLL_CONFIG.smoothScrollBehavior as ScrollBehavior
    });
  };

  return { showBackToTop, scrollToTop };
};
