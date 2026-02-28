import React, { memo } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isDark?: boolean;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isDark?: boolean;
}

export const Input = memo<InputProps>(({ label, isDark = true, id, ...props }) => {
  const themeClass = isDark ? styles.dark : styles.light;
  
  return (
    <div className={`${styles.formGroup} ${themeClass}`}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input id={id} className={styles.input} {...props} />
    </div>
  );
});

export const Textarea = memo<TextareaProps>(({ label, isDark = true, id, ...props }) => {
  const themeClass = isDark ? styles.dark : styles.light;
  
  return (
    <div className={`${styles.formGroup} ${themeClass}`}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <textarea id={id} className={styles.textarea} {...props} />
    </div>
  );
});

Input.displayName = 'Input';
Textarea.displayName = 'Textarea';
