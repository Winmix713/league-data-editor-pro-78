
import Papa from "papaparse"
import { toast } from "sonner"
import type { Match } from "../types"
import logger from "./logger"

/**
 * Parse date strings in multiple formats
 */
const parseDateString = (dateStr: string): string => {
  // Handle empty/null values
  if (!dateStr) return "";
  
  // Remove surrounding quotes if present
  const cleanedDate = typeof dateStr === 'string' 
    ? dateStr.replace(/^"(.*)"$/, '$1').trim()
    : String(dateStr);
  
  // If it's just a time (HH:MM format), add today's date
  if (cleanedDate.match(/^\d{2}:\d{2}$/)) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${cleanedDate}`;
  }
  
  // Check for common date formats and standardize to YYYY-MM-DD
  // 1. DD/MM/YYYY format
  const dmyFormat = cleanedDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (dmyFormat) {
    return `${dmyFormat[3]}-${dmyFormat[2]}-${dmyFormat[1]}`;
  }
  
  // 2. DD-MM-YYYY format
  const dmyFormatDash = cleanedDate.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (dmyFormatDash) {
    return `${dmyFormatDash[3]}-${dmyFormatDash[2]}-${dmyFormatDash[1]}`;
  }
  
  // If the format is already YYYY-MM-DD or other valid format, return as is
  return cleanedDate;
};

/**
 * Parse CSV file containing match data
 */
export const parseMatchesCSV = (file: File): Promise<Match[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        // Trim any whitespace and remove quotes that might be in the header
        return header.trim().replace(/^"(.*)"$/, '$1');
      },
      complete: (result) => {
        try {
          logger.info("CSV parsing result:", result);
          
          // Check if parsing had errors
          if (result.errors && result.errors.length > 0) {
            logger.error("CSV parsing errors:", result.errors);
            reject(new Error("CSV parsing errors detected. Please check format."));
            return;
          }
          
          // Check if we have data
          if (!result.data || result.data.length === 0) {
            reject(new Error("No data found in CSV file"));
            return;
          }
          
          // Validate required columns
          const requiredColumns = ["date", "home_team", "away_team", "home_score", "away_score"];
          const headers = Object.keys(result.data[0]);
          const missingColumns = requiredColumns.filter(col => !headers.includes(col));
          
          if (missingColumns.length > 0) {
            reject(new Error(`Missing required columns: ${missingColumns.join(", ")}. Please check the CSV format.`));
            return;
          }

          // First pass: collect all unique timestamps for round determination
          const uniqueTimestamps = new Set<string>();
          
          result.data.forEach((rawMatch: any) => {
            if (rawMatch.date) {
              // Extract just the time part if it's a time (HH:MM format)
              const dateValue = typeof rawMatch.date === 'string'
                ? rawMatch.date.replace(/^"(.*)"$/, '$1')
                : rawMatch.date || "";
              
              // If it's just a time (HH:MM format), add it to our set
              if (dateValue && dateValue.match(/^\d{2}:\d{2}$/)) {
                uniqueTimestamps.add(dateValue);
              }
              // If it contains a timestamp at the end, extract and add it
              else if (dateValue && dateValue.match(/\d{2}:\d{2}$/)) {
                const timeMatch = dateValue.match(/(\d{2}:\d{2})$/);
                if (timeMatch && timeMatch[1]) {
                  uniqueTimestamps.add(timeMatch[1]);
                }
              }
            }
          });
          
          // Sort timestamps chronologically
          const sortedTimestamps = Array.from(uniqueTimestamps).sort();
          
          // Create a mapping from timestamp to round number (1-based)
          const timestampToRound: Record<string, number> = {};
          sortedTimestamps.forEach((timestamp, index) => {
            timestampToRound[timestamp] = index + 1;
          });
          
          logger.debug("Timestamp to round mapping:", timestampToRound);
          
          const parsedMatches = result.data
            .filter((rawMatch: any) => {
              // Filter out empty rows and header rows
              return (
                rawMatch.date !== undefined &&
                rawMatch.home_team !== undefined &&
                rawMatch.away_team !== undefined
              );
            })
            .map((rawMatch: any, index: number) => {
              // Format the date using our helper
              const dateValue = parseDateString(rawMatch.date);
              
              // Extract time part for round determination
              let timePart: string | null = null;
              let roundNumber: number | null = null;
              
              if (dateValue.match(/\d{2}:\d{2}$/)) {
                // It contains a timestamp at the end
                const timeMatch = dateValue.match(/(\d{2}:\d{2})$/);
                if (timeMatch && timeMatch[1]) {
                  timePart = timeMatch[1];
                }
              }
              
              // Determine round based on timestamp
              if (timePart && timestampToRound[timePart]) {
                roundNumber = timestampToRound[timePart];
              } else {
                // Fallback: calculate round based on index if timestamp not found
                roundNumber = Math.floor(index / 8) + 1;
              }
              
              // Clean data and ensure proper types
              const homeTeam = typeof rawMatch.home_team === 'string' 
                ? rawMatch.home_team.replace(/^"(.*)"$/, '$1') 
                : rawMatch.home_team || "";
              
              const awayTeam = typeof rawMatch.away_team === 'string'
                ? rawMatch.away_team.replace(/^"(.*)"$/, '$1')
                : rawMatch.away_team || "";
              
              // Extract numeric scores, removing quotes if present
              const extractScore = (value: any): number => {
                if (typeof value === 'number') return value;
                if (typeof value === 'string') {
                  const cleanValue = value.replace(/^"(.*)"$/, '$1');
                  return parseInt(cleanValue, 10) || 0;
                }
                return 0;
              };

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
                venue: rawMatch.venue || "",
              };
            });

          if (parsedMatches.length === 0) {
            reject(new Error("No valid matches found in the CSV file. Please check the format."));
            return;
          }

          resolve(parsedMatches as Match[]);
        } catch (error) {
          logger.error("Error processing CSV data:", error);
          reject(error);
        }
      },
      error: (error) => {
        logger.error("Error parsing CSV:", error);
        reject(error);
      },
    });
  });
};
