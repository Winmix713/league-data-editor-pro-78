import { LeagueData, Match } from '@/types';

type ValidationResult = { 
  valid: boolean; 
  error?: string;
  data?: any[];
};

/**
 * Sanitizes a string value to prevent XSS attacks
 * @param value The value to sanitize
 * @returns The sanitized value
 */
const sanitizeValue = (value: unknown): unknown => {
  if (typeof value === 'string') {
    // Prevent script injection by removing HTML tags and trimming
    return value.trim().replace(/<\/?[^>]+(>|$)/g, '');
  }
  return value;
};

/**
 * Sanitizes all data in an object recursively
 * @param data Object to sanitize
 * @returns Sanitized object
 */
const sanitizeData = <T>(data: T): T => {
  if (Array.isArray(data)) {
    return data.map(sanitizeData) as unknown as T;
  }
  
  if (data && typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data as Record<string, unknown>).map(([key, value]) => [
        key,
        sanitizeData(value)
      ])
    ) as T;
  }
  
  return sanitizeValue(data) as T;
};

/**
 * Validates CSV data for matches
 * @param data Raw parsed CSV data
 * @returns Validation result with sanitized data if valid
 */
export const validateMatchesCSV = (data: any[]): ValidationResult => {
  if (!Array.isArray(data) || data.length === 0) {
    return { valid: false, error: 'No data found or invalid format' };
  }
  
  // Sanitize the data first
  const sanitizedData = sanitizeData(data);
  
  // Required fields for a match
  const requiredFields = ['home_team', 'away_team', 'home_score', 'away_score', 'date'];
  
  // Check that all required fields exist in the first row
  const firstRow = sanitizedData[0];
  const missingFields = requiredFields.filter(field => !(field in firstRow));
  
  if (missingFields.length > 0) {
    return { 
      valid: false, 
      error: `Missing required fields: ${missingFields.join(', ')}` 
    };
  }
  
  // Validate each row
  for (let i = 0; i < sanitizedData.length; i++) {
    const row = sanitizedData[i];
    
    // Check scores are numbers
    if (isNaN(Number(row.home_score)) || isNaN(Number(row.away_score))) {
      return { 
        valid: false, 
        error: `Invalid score values in row ${i + 1}` 
      };
    }
    
    // Check date format (simple validation)
    const dateValue = row.date;
    if (dateValue && typeof dateValue === 'string') {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        return { 
          valid: false, 
          error: `Invalid date format in row ${i + 1}` 
        };
      }
    }
  }
  
  return { 
    valid: true,
    data: sanitizedData
  };
};

/**
 * Parses and validates a CSV string into match data
 * @param csvContent CSV content as string
 * @returns Parsed and validated match data
 */
export const parseMatchesCSV = (csvContent: string): ValidationResult => {
  try {
    // Use a CSV parsing library like PapaParse
    // This is a simplified example
    const rows = csvContent
      .split('\n')
      .filter(row => row.trim())
      .map(row => row.split(','));
    
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = row[index]?.trim() || '';
        return obj;
      }, {} as Record<string, string>);
    });
    
    return validateMatchesCSV(data);
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Failed to parse CSV'
    };
  }
};