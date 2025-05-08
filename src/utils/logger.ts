
/**
 * Simple logger utility
 */
export const logger = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(...args)
    }
  },
  
  error: (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(...args)
    }
  },
  
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(...args)
    }
  },
  
  info: (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.info(...args)
    }
  },
  
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(...args)
    }
  },
  
  group: (label: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.group(label)
    }
  },
  
  groupEnd: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.groupEnd()
    }
  }
}
