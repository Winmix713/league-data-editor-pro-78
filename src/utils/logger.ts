
/**
 * Logger utility to standardize logging across the application
 * and control log levels based on environment
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// In production, only show warn and error logs
const isProduction = process.env.NODE_ENV === 'production';
const shouldLog = (level: LogLevel): boolean => {
  if (isProduction) {
    return level === 'warn' || level === 'error';
  }
  return true;
};

const logger = {
  debug: (message: string, ...args: any[]): void => {
    if (shouldLog('debug')) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: any[]): void => {
    if (shouldLog('info')) {
      console.info(`[INFO] ${message}`, ...args);
    }
  },
  
  warn: (message: string, ...args: any[]): void => {
    if (shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  
  error: (message: string, ...args: any[]): void => {
    if (shouldLog('error')) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }
};

export default logger;
