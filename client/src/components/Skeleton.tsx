import { memo } from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton = memo<SkeletonProps>(({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = ''
}) => (
  <div 
    className={`${styles.skeleton} ${className}`}
    style={{ width, height, borderRadius }}
    aria-hidden="true"
  />
));

Skeleton.displayName = 'Skeleton';

export const SkeletonCard = memo(() => (
  <div className={styles.card} aria-hidden="true">
    <Skeleton height="200px" borderRadius="10px" />
    <div className={styles.content}>
      <Skeleton height="24px" width="80%" />
      <Skeleton height="16px" width="60%" />
      <Skeleton height="16px" width="90%" />
    </div>
  </div>
));

SkeletonCard.displayName = 'SkeletonCard';

export const SkeletonText = memo<{ lines?: number }>(({ lines = 3 }) => (
  <div className={styles.textBlock} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        height="16px" 
        width={i === lines - 1 ? '70%' : '100%'} 
      />
    ))}
  </div>
));

SkeletonText.displayName = 'SkeletonText';
