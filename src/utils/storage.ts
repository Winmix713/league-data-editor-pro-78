
/**
 * Load data from localStorage with fallback
 */
export function loadData<T>(key: string, fallback: T): T {
  try {
    const savedData = localStorage.getItem(key)
    if (savedData) {
      return JSON.parse(savedData) as T
    }
  } catch (error) {
    console.error(`Error loading data for key ${key}:`, error)
  }
  return fallback
}

/**
 * Save data to localStorage
 */
export function saveData(key: string, data: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error)
    return false
  }
}

/**
 * Clear data from localStorage
 */
export function clearData(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error clearing data for key ${key}:`, error)
    return false
  }
}

/**
 * Get all keys from localStorage with a specific prefix
 */
export function getKeysWithPrefix(prefix: string): string[] {
  const keys: string[] = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(prefix)) {
        keys.push(key)
      }
    }
  } catch (error) {
    console.error(`Error getting keys with prefix ${prefix}:`, error)
  }
  return keys
}

/**
 * Clear all data from localStorage with a specific prefix
 */
export function clearDataWithPrefix(prefix: string): number {
  const keys = getKeysWithPrefix(prefix)
  let deletedCount = 0
  
  keys.forEach(key => {
    if (clearData(key)) {
      deletedCount++
    }
  })
  
  return deletedCount
}
