import React, { memo } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  isDark?: boolean;
  clickable?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card = memo<CardProps>(({ 
  children, 
  isDark = true, 
  clickable = false,
  className = '',
  onClick 
}) => {
  const themeClass = isDark ? styles.dark : styles.light;
  const cardClass = `${styles.card} ${themeClass} ${clickable ? styles.clickable : ''} ${className}`;
  
  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';
