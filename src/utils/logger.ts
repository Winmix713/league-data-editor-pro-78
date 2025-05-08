
/**
 * A simple logger that respects the current environment
 * to avoid logging in production unless necessary
 */
const isProduction = process.env.NODE_ENV === 'production'

export const logger = {
  log: (message: string, ...args: any[]) => {
    if (!isProduction) {
      console.log(message, ...args)
    }
  },
  
  warn: (message: string, ...args: any[]) => {
    if (!isProduction) {
      console.warn(message, ...args)
    } else {
      // In production, you might want to log warnings
      // to a monitoring service
    }
  },
  
  error: (message: string, ...args: any[]) => {
    // Always log errors, but in production you might
    // want to send them to a monitoring service
    console.error(message, ...args)
  },
  
  info: (message: string, ...args: any[]) => {
    if (!isProduction) {
      console.info(message, ...args)
    }
  }
}
