
import Papa from "papaparse"
import { toast } from "sonner"
import type { Match } from "../types"
import { logger } from "./logger"

/**
 * Supported date formats for CSV parsing
 */
const DATE_FORMATS = {
  YYYY_MM_DD: /^(\d{4})-(\d{2})-(\d{2})$/, // YYYY-MM-DD
  DD_MM_YYYY_SLASH: /^(\d{2})\/(\d{2})\/(\d{4})$/, // DD/MM/YYYY
  DD_MM_YYYY_DASH: /^(\d{2})-(\d{2})-(\d{4})$/ // DD-MM-YYYY
}

/**
 * Parse a date string in various formats
 * @param dateStr Date string to parse
 * @returns Parsed date or throws error if invalid
 */
export const parseCSVDate = (dateStr: string): Date => {
  // Support multiple date formats
  const formats = [
    DATE_FORMATS.YYYY_MM_DD, 
    DATE_FORMATS.DD_MM_YYYY_SLASH, 
    DATE_FORMATS.DD_MM_YYYY_DASH
  ]
  
  for (const format of formats) {
    if (format.test(dateStr)) {
      // Parse according to detected format
      const parts = dateStr.match(format)
      if (!parts) continue
      
      if (format === DATE_FORMATS.YYYY_MM_DD) {
        // YYYY-MM-DD
        return new Date(
          parseInt(parts[1]), 
          parseInt(parts[2]) - 1, 
          parseInt(parts[3])
        )
      } else {
        // DD/MM/YYYY or DD-MM-YYYY
        return new Date(
          parseInt(parts[3]), 
          parseInt(parts[2]) - 1, 
          parseInt(parts[1])
        )
      }
    }
  }
  
  // If just a time like "HH:MM", add today's date
  if (dateStr.match(/^\d{2}:\d{2}$/)) {
    const today = new Date()
    const [hours, minutes] = dateStr.split(':').map(Number)
    today.setHours(hours, minutes, 0, 0)
    return today
  }
  
  // If no format matches, try default Date parsing as fallback
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}`)
  }
  return date
}

/**
 * Clean string values by trimming and removing quotes
 * @param value String value to clean
 * @returns Cleaned string
 */
const cleanStringValue = (value: any): string => {
  if (typeof value !== 'string') {
    return String(value || '')
  }
  return value.replace(/^"(.*)"$/, '$1').trim()
}

/**
 * Extract numeric score from various input types
 * @param value Input value (string or number)
 * @returns Parsed numeric score
 */
const extractScore = (value: any): number => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const cleanValue = value.replace(/^"(.*)"$/, '$1')
    return parseInt(cleanValue, 10) || 0
  }
  return 0
}

/**
 * Generate round numbers based on timestamps
 * @param data Raw CSV data
 * @returns Mapping of timestamps to round numbers
 */
const generateTimestampToRoundMap = (data: any[]): Record<string, number> => {
  // First pass: collect all unique timestamps for round determination
  const uniqueTimestamps = new Set<string>()
  
  data.forEach((rawMatch: any) => {
    if (rawMatch.date) {
      // Extract just the time part if it's a time (HH:MM format)
      const dateValue = cleanStringValue(rawMatch.date)
      
      // If it's just a time (HH:MM format), add it to our set
      if (dateValue && dateValue.match(/^\d{2}:\d{2}$/)) {
        uniqueTimestamps.add(dateValue)
      }
      // If it contains a timestamp at the end, extract and add it
      else if (dateValue && dateValue.match(/\d{2}:\d{2}$/)) {
        const timeMatch = dateValue.match(/(\d{2}:\d{2})$/)
        if (timeMatch && timeMatch[1]) {
          uniqueTimestamps.add(timeMatch[1])
        }
      }
    }
  })
  
  // Sort timestamps chronologically and create mapping
  const sortedTimestamps = Array.from(uniqueTimestamps).sort()
  const timestampToRound: Record<string, number> = {}
  sortedTimestamps.forEach((timestamp, index) => {
    timestampToRound[timestamp] = index + 1
  })
  
  return timestampToRound
}

/**
 * Process a single match from CSV data
 * @param rawMatch Raw match data from CSV
 * @param index Index of the match in the data array
 * @param timestampToRound Mapping of timestamps to round numbers
 * @returns Processed Match object or null if processing failed
 */
const processMatch = (
  rawMatch: any, 
  index: number, 
  timestampToRound: Record<string, number>
): Match | null => {
  try {
    const currentYear = new Date().getFullYear()
    
    // Format the date - if it's only a time, add today's date
    let dateValue = cleanStringValue(rawMatch.date)
    
    // Extract time part for round determination
    let timePart: string | null = null
    let roundNumber: number | null = null
    
    if (dateValue.match(/^\d{2}:\d{2}$/)) {
      // It's just a time
      timePart = dateValue
    } else if (dateValue.match(/\d{2}:\d{2}$/)) {
      // It contains a timestamp at the end
      const timeMatch = dateValue.match(/(\d{2}:\d{2})$/)
      if (timeMatch && timeMatch[1]) {
        timePart = timeMatch[1]
      }
    }
    
    // Determine round based on timestamp
    if (timePart && timestampToRound[timePart]) {
      roundNumber = timestampToRound[timePart]
    } else {
      // Fallback: calculate round based on index
      roundNumber = Math.floor(index / 8) + 1
    }
    
    // If it's just a time, add a synthetic date
    if (dateValue.match(/^\d{2}:\d{2}$/)) {
      // Create date based on the round number (each round is a week apart)
      const syntheticDate = new Date()
      syntheticDate.setDate(syntheticDate.getDate() + ((roundNumber - 1) * 7)) // One round per week
      const month = String(syntheticDate.getMonth() + 1).padStart(2, '0')
      const day = String(syntheticDate.getDate()).padStart(2, '0')
      dateValue = `${currentYear}-${month}-${day} ${dateValue}`
    }
    
    // Clean team names
    const homeTeam = cleanStringValue(rawMatch.home_team)
    const awayTeam = cleanStringValue(rawMatch.away_team)
    
    // Map to our Match format with explicit round string
    return {
      date: dateValue,
      home_team: homeTeam,
      away_team: awayTeam,
      ht_home_score: extractScore(rawMatch.ht_home_score),
      ht_away_score: extractScore(rawMatch.ht_away_score),
      home_score: extractScore(rawMatch.home_score),
      away_score: extractScore(rawMatch.away_score),
      round: `Round ${roundNumber}`,
      venue: rawMatch.venue || undefined
    }
  } catch (error) {
    logger.log("Error processing match:", error, rawMatch)
    return null
  }
}

/**
 * Validate CSV data for required columns
 * @param data Raw CSV data
 * @returns Validation result - success or error message
 */
const validateCSVData = (data: any[]): { valid: boolean; error?: string } => {
  // Check if we have data
  if (!data || data.length === 0) {
    return { valid: false, error: "No data found in CSV file" }
  }
  
  // Validate required columns
  const requiredColumns = ["date", "home_team", "away_team", "home_score", "away_score"]
  const headers = Object.keys(data[0])
  const missingColumns = requiredColumns.filter(col => !headers.includes(col))
  
  if (missingColumns.length > 0) {
    return { 
      valid: false, 
      error: `Missing required columns: ${missingColumns.join(", ")}. Please check the CSV format.`
    }
  }
  
  return { valid: true }
}

/**
 * Parse a CSV file containing match data
 * @param file CSV file to parse
 * @returns Promise resolving to an array of Match objects
 */
export const parseMatchesCSV = (file: File): Promise<Match[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        // Trim any whitespace and remove quotes that might be in the header
        return header.trim().replace(/^"(.*)"$/, '$1')
      },
      complete: (result) => {
        try {
          // Check if parsing had errors
          if (result.errors && result.errors.length > 0) {
            logger.log("CSV parsing errors:", result.errors)
            reject(new Error("CSV parsing errors detected. Please check format."))
            return
          }
          
          // Validate the CSV data
          const validation = validateCSVData(result.data as any[])
          if (!validation.valid) {
            reject(new Error(validation.error))
            return
          }
          
          // Generate round mapping from timestamps
          const timestampToRound = generateTimestampToRoundMap(result.data)
          
          // Process each match
          const parsedMatches = (result.data as any[])
            .filter((rawMatch: any) => {
              // Filter out empty rows and header rows
              return (
                rawMatch.date !== undefined &&
                rawMatch.home_team !== undefined &&
                rawMatch.away_team !== undefined
              )
            })
            .map((rawMatch: any, index: number) => {
              return processMatch(rawMatch, index, timestampToRound)
            })
            .filter(Boolean) as Match[] // Remove any null entries from failed processing
          
          if (parsedMatches.length === 0) {
            reject(new Error("No valid matches found in the CSV file. Please check the format."))
            return
          }
          
          logger.log(`Successfully parsed ${parsedMatches.length} matches from CSV`)
          resolve(parsedMatches)
        } catch (error) {
          logger.log("Error processing CSV data:", error)
          reject(error)
        }
      },
      error: (error) => {
        logger.log("Error parsing CSV:", error)
        reject(error)
      },
    })
  })
}
