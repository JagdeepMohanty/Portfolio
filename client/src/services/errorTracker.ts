import { ENV } from '../config/env';

interface ErrorContext {
  user?: string;
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}

class ErrorTracker {
  private isInitialized = false;

  init() {
    if (this.isInitialized || !ENV.ENABLE_ERROR_TRACKING) return;

    if (ENV.SENTRY_DSN) {
      this.initSentry();
    }

    this.setupGlobalErrorHandlers();
    this.isInitialized = true;
  }

  private initSentry() {
    // Placeholder for Sentry initialization
    // In production, install @sentry/react and uncomment:
    /*
    import * as Sentry from '@sentry/react';
    
    Sentry.init({
      dsn: ENV.SENTRY_DSN,
      environment: ENV.SENTRY_ENVIRONMENT,
      tracesSampleRate: 1.0,
      beforeSend(event) {
        if (ENV.IS_DEVELOPMENT) {
          console.log('Sentry Event:', event);
          return null;
        }
        return event;
      }
    });
    */
  }

  private setupGlobalErrorHandlers() {
    window.addEventListener('error', (event) => {
      this.captureError(event.error, {
        extra: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(new Error(event.reason), {
        tags: { type: 'unhandled-promise' }
      });
    });
  }

  captureError(error: Error, context?: ErrorContext) {
    if (!ENV.ENABLE_ERROR_TRACKING) {
      if (ENV.IS_DEVELOPMENT) {
        console.error('Error captured:', error, context);
      }
      return;
    }

    // Log to console in development
    if (ENV.IS_DEVELOPMENT) {
      console.error('Error:', error);
      console.error('Context:', context);
    }

    // In production with Sentry:
    // Sentry.captureException(error, { ...context });
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    if (!ENV.ENABLE_ERROR_TRACKING) return;

    if (ENV.IS_DEVELOPMENT) {
      console.log(`[${level.toUpperCase()}]`, message);
    }

    // In production with Sentry:
    // Sentry.captureMessage(message, level);
  }

  setUser(user: { id?: string; email?: string; username?: string }) {
    if (!ENV.ENABLE_ERROR_TRACKING) return;

    // In production with Sentry:
    // Sentry.setUser(user);
  }

  addBreadcrumb(message: string, category?: string, data?: Record<string, any>) {
    if (!ENV.ENABLE_ERROR_TRACKING) return;

    if (ENV.IS_DEVELOPMENT) {
      console.log('Breadcrumb:', { message, category, data });
    }

    // In production with Sentry:
    // Sentry.addBreadcrumb({ message, category, data });
  }
}

export const errorTracker = new ErrorTracker();
