import { useEffect } from 'react';
import { ENV } from '../config/env';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const useSEO = ({
  title = 'Jagdeep Mohanty - Software Engineer Portfolio',
  description = 'B.Tech CSE student passionate about coding and data. Explore my projects, certificates, and GitHub contributions.',
  image = '/og-image.jpg',
  url = 'https://jagdeepmohanty.netlify.app',
  type = 'website'
}: SEOProps = {}) => {
  useEffect(() => {
    const fullTitle = title.includes('Jagdeep') ? title : `${title} | Jagdeep Mohanty`;
    
    document.title = fullTitle;
    
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    updateMeta('description', description);
    updateMeta('author', 'Jagdeep Mohanty');
    updateMeta('keywords', 'Jagdeep Mohanty, Software Engineer, Full Stack Developer, React, Node.js, Portfolio, B.Tech CSE');
    
    updateMeta('og:type', type, true);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image, true);
    updateMeta('og:url', url, true);
    updateMeta('og:site_name', 'Jagdeep Mohanty Portfolio', true);
    
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
    updateMeta('twitter:creator', '@JagdeepMohanty');
    
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    
    let jsonLd = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jagdeep Mohanty",
      "url": url,
      "image": image,
      "jobTitle": "Software Engineer",
      "alumniOf": "Rai University",
      "sameAs": [ENV.GITHUB_URL, ENV.LINKEDIN_URL]
    });
  }, [title, description, image, url, type]);
};
