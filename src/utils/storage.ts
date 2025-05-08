
/**
 * Checks if the specified storage type is available
 */
export const storageAvailable = (type: 'localStorage' | 'sessionStorage'): boolean => {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Safely saves data to localStorage with error handling
 */
export const saveData = <T>(key: string, data: T): boolean => {
  if (!storageAvailable('localStorage')) {
    console.warn('localStorage is not available');
    return false;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Safely loads data from localStorage with error handling
 */
export const loadData = <T>(key: string, defaultValue: T): T => {
  if (!storageAvailable('localStorage')) {
    console.warn('localStorage is not available');
    return defaultValue;
  }
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};
