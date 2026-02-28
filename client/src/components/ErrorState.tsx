import { memo } from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export const ErrorState = memo<ErrorStateProps>(({ 
  message = 'Something went wrong. Please try again.',
  onRetry,
  fullScreen = false
}) => (
  <div 
    className={`${styles.container} ${fullScreen ? styles.fullScreen : ''}`}
    role="alert"
    aria-live="assertive"
  >
    <FaExclamationTriangle 
      className={styles.icon} 
      aria-hidden="true"
    />
    <h3 className={styles.title}>Oops!</h3>
    <p className={styles.message}>{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className={styles.retryButton}
        aria-label="Retry loading content"
      >
        <FaRedo aria-hidden="true" />
        Try Again
      </button>
    )}
  </div>
));

ErrorState.displayName = 'ErrorState';

export const ErrorBoundaryFallback = memo<{ error: Error; resetError: () => void }>(
  ({ error, resetError }) => (
    <ErrorState
      message={`An unexpected error occurred: ${error.message}`}
      onRetry={resetError}
      fullScreen
    />
  )
);

ErrorBoundaryFallback.displayName = 'ErrorBoundaryFallback';
