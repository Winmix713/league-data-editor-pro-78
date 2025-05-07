
import Papa from "papaparse"
import { toast } from "sonner"
import type { Match } from "../types"

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
          console.log("CSV parsing result:", result)
          
          // Check if parsing had errors
          if (result.errors && result.errors.length > 0) {
            console.error("CSV parsing errors:", result.errors)
            reject(new Error("CSV parsing errors detected. Please check format."))
            return
          }
          
          // Check if we have data
          if (!result.data || result.data.length === 0) {
            reject(new Error("No data found in CSV file"))
            return
          }
          
          // Validate required columns
          const requiredColumns = ["date", "home_team", "away_team", "home_score", "away_score"]
          const headers = Object.keys(result.data[0])
          const missingColumns = requiredColumns.filter(col => !headers.includes(col))
          
          if (missingColumns.length > 0) {
            reject(new Error(`Missing required columns: ${missingColumns.join(", ")}. Please check the CSV format.`))
            return
          }

          // First pass: collect all unique timestamps for round determination
          const uniqueTimestamps = new Set<string>()
          
          result.data.forEach((rawMatch: any) => {
            if (rawMatch.date) {
              // Extract just the time part if it's a time (HH:MM format)
              const dateValue = typeof rawMatch.date === 'string'
                ? rawMatch.date.replace(/^"(.*)"$/, '$1')
                : rawMatch.date || ""
              
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
          
          // Sort timestamps chronologically
          const sortedTimestamps = Array.from(uniqueTimestamps).sort()
          
          // Create a mapping from timestamp to round number (1-based)
          const timestampToRound: Record<string, number> = {}
          sortedTimestamps.forEach((timestamp, index) => {
            timestampToRound[timestamp] = index + 1
          })
          
          console.log("Timestamp to round mapping:", timestampToRound)
          
          const currentYear = new Date().getFullYear()
          const parsedMatches = result.data
            .filter((rawMatch: any) => {
              // Filter out empty rows and header rows
              return (
                rawMatch.date !== undefined &&
                rawMatch.home_team !== undefined &&
                rawMatch.away_team !== undefined
              )
            })
            .map((rawMatch: any, index: number) => {
              // Format the date - if it's only a time, add today's date
              let dateValue = typeof rawMatch.date === 'string' 
                ? rawMatch.date.replace(/^"(.*)"$/, '$1') // Remove surrounding quotes if present
                : rawMatch.date || ""
              
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
                // Fallback: calculate round based on index if timestamp not found
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
              
              // Clean data and ensure proper types
              const homeTeam = typeof rawMatch.home_team === 'string' 
                ? rawMatch.home_team.replace(/^"(.*)"$/, '$1') 
                : rawMatch.home_team || ""
              
              const awayTeam = typeof rawMatch.away_team === 'string'
                ? rawMatch.away_team.replace(/^"(.*)"$/, '$1')
                : rawMatch.away_team || ""
              
              // Extract numeric scores, removing quotes if present
              const extractScore = (value: any): number => {
                if (typeof value === 'number') return value
                if (typeof value === 'string') {
                  const cleanValue = value.replace(/^"(.*)"$/, '$1')
                  return parseInt(cleanValue, 10) || 0
                }
                return 0
              }

              // Map to our Match format
              return {
                date: dateValue,
                home_team: homeTeam,
                away_team: awayTeam,
                ht_home_score: extractScore(rawMatch.ht_home_score),
                ht_away_score: extractScore(rawMatch.ht_away_score),
                home_score: extractScore(rawMatch.home_score),
                away_score: extractScore(rawMatch.away_score),
                round: `Round ${roundNumber}`,
              }
            })

          if (parsedMatches.length === 0) {
            reject(new Error("No valid matches found in the CSV file. Please check the format."))
            return
          }

          resolve(parsedMatches as Match[])
        } catch (error) {
          console.error("Error processing CSV data:", error)
          reject(error)
        }
      },
      error: (error) => {
        console.error("Error parsing CSV:", error)
        reject(error)
      },
    })
  })
}
