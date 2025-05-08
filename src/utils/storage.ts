
/**
 * Utility functions for safe localStorage operations
 */

/**
 * Check if a particular storage type is available
 */
export const isStorageAvailable = (type: 'localStorage' | 'sessionStorage'): boolean => {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Safely get data from localStorage
 */
export const getStorageData = <T>(key: string, defaultValue: T): T => {
  try {
    if (!isStorageAvailable('localStorage')) {
      console.warn('localStorage is not available');
      return defaultValue;
    }
    
    const item = localStorage.getItem(key);
    if (!item) {
      return defaultValue;
    }
    
    return JSON.parse(item) as T;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Safely set data to localStorage
 */
export const setStorageData = <T>(key: string, value: T): boolean => {
  try {
    if (!isStorageAvailable('localStorage')) {
      console.warn('localStorage is not available');
      return false;
    }
    
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
};

/**
 * Safely remove data from localStorage
 */
export const removeStorageData = (key: string): boolean => {
  try {
    if (!isStorageAvailable('localStorage')) {
      console.warn('localStorage is not available');
      return false;
    }
    
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};
