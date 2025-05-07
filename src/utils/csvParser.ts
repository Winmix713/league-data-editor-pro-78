
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
              
              if (dateValue && dateValue.match(/^\d{2}:\d{2}$/)) {
                // It's just a time, let's add a synthetic date using the round number
                // Each 8 matches creates a new round, starting from today
                const roundIndex = Math.floor(index / 8)
                const syntheticDate = new Date()
                syntheticDate.setDate(syntheticDate.getDate() + (roundIndex * 7)) // One round per week
                const month = String(syntheticDate.getMonth() + 1).padStart(2, '0')
                const day = String(syntheticDate.getDate()).padStart(2, '0')
                dateValue = `${currentYear}-${month}-${day} ${dateValue}`
              }

              // Calculate round number (1-based, every 8 matches is a new round)
              const roundNumber = Math.floor(index / 8) + 1
              
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
