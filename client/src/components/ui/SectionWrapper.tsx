import React, { memo } from 'react';
import styles from './SectionWrapper.module.css';

interface SectionWrapperProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  isDark?: boolean;
}

export const SectionWrapper = memo<SectionWrapperProps>(({ 
  id, 
  title, 
  subtitle, 
  children, 
  isDark = true 
}) => {
  const themeClass = isDark ? styles.dark : styles.light;
  
  return (
    <section id={id} className={`${styles.section} ${themeClass}`}>
      <div className={styles.container}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={`${styles.subtitle} ${themeClass}`}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
});

SectionWrapper.displayName = 'SectionWrapper';
