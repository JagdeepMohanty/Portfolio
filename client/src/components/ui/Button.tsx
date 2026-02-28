import React, { memo } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = memo<ButtonProps>(({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const buttonClass = `${styles.button} ${variant === 'secondary' ? styles.secondary : ''} ${className}`;
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
