
"use client"

import { useState, useRef, useCallback } from "react"
import { Save, Upload } from "lucide-react"
import Papa from "papaparse"
import type { Match, LeagueData } from "../../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LeagueEditFormProps {
  league: LeagueData
  onUpdateLeague: (updatedLeague: LeagueData) => void
  onUpdateMatches: (matches: Match[]) => void
  onSave: () => void
}

export const LeagueEditForm = ({
  league,
  onUpdateLeague,
  onUpdateMatches,
  onSave,
}: LeagueEditFormProps) => {
  const [editedLeague, setEditedLeague] = useState(league)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedLeague((prev) => ({ ...prev, [name]: value }))
    setIsSaveDisabled(false)
  }, [])

  const handleSave = useCallback(() => {
    onUpdateLeague(editedLeague)
    onSave()
    setIsSaveDisabled(true)
    toast.success("League details saved successfully")
  }, [editedLeague, onUpdateLeague, onSave])

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      setFileName(file.name)
      setImportError(null)
      
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => {
          // Trim any whitespace and remove quotes that might be in the header
          return header.trim().replace(/^"(.*)"$/, '$1');
        },
        complete: (result) => {
          try {
            console.log("CSV parsing result:", result);
            
            // Check if parsing had errors
            if (result.errors && result.errors.length > 0) {
              console.error("CSV parsing errors:", result.errors);
              setImportError("CSV parsing errors detected. Please check format.");
              toast.error("CSV parsing errors detected");
              return;
            }
            
            // Check if we have data
            if (!result.data || result.data.length === 0) {
              setImportError("No data found in CSV file");
              toast.error("No data found in CSV file");
              return;
            }
            
            // Validate required columns
            const requiredColumns = ["date", "home_team", "away_team", "home_score", "away_score"];
            const headers = Object.keys(result.data[0]);
            const missingColumns = requiredColumns.filter(col => !headers.includes(col));
            
            if (missingColumns.length > 0) {
              setImportError(`Missing required columns: ${missingColumns.join(", ")}. Please check the CSV format.`);
              toast.error(`Missing columns: ${missingColumns.join(", ")}`);
              return;
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
                  : rawMatch.date || "";
                
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
              setImportError("No valid matches found in the CSV file. Please check the format.");
              toast.error("No valid matches found in the CSV file. Please check the format and try again.");
              return;
            }

            onUpdateMatches(parsedMatches)
            setDataLoaded(true)
            setIsSaveDisabled(false)
            toast.success(`${parsedMatches.length} matches imported successfully`)
          } catch (error) {
            console.error("Error processing CSV data:", error)
            setImportError("Failed to process CSV file. Please check the format and try again.");
            toast.error("Failed to process CSV file. Please check the format and try again.")
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error)
          setImportError("Failed to parse CSV file. Please check the format and try again.");
          toast.error("Failed to parse CSV file. Please check the format and try again.")
        },
      })
    },
    [onUpdateMatches],
  )

  return (
    <div className="bg-black/20 rounded-xl p-6 space-y-6 border border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="leagueName" className="text-gray-300 text-sm">
            League Name
          </label>
          <Input
            type="text"
            id="leagueName"
            name="name"
            value={editedLeague.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter league name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="leagueSeason" className="text-gray-300 text-sm">
            Season
          </label>
          <Input
            type="text"
            id="leagueSeason"
            name="season"
            value={editedLeague.season}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter season (e.g., 2023-24)"
          />
        </div>
      </div>

      {importError && (
        <Alert variant="destructive" className="bg-red-950/50 border-red-800 text-red-200">
          <AlertDescription>
            {importError}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto flex-grow">
          <label htmlFor="csv-upload" className="block text-gray-300 text-sm mb-2">
            Upload Matches Data (CSV)
          </label>
          <input
            ref={fileInputRef}
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="flex items-center gap-3">
            <Button
              onClick={triggerFileUpload}
              variant="outline"
              className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Upload className="w-4 h-4" />
              Choose CSV File
            </Button>
            <span className={`text-sm ${fileName ? "text-gray-400" : "text-gray-500"}`}>
              {fileName || "No file chosen"}
            </span>
          </div>
          
          {dataLoaded && (
            <p className="text-sm text-emerald-400 mt-2 flex items-center">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              Data loaded successfully
            </p>
          )}
          
          <div className="mt-3 text-xs text-gray-400">
            <p>Expected CSV format:</p>
            <code className="block mt-1 p-2 bg-black/30 rounded text-gray-300 font-mono text-xs overflow-x-auto">
              date,home_team,away_team,ht_home_score,ht_away_score,home_score,away_score<br/>
              21:10,Fulham,Brighton,0,1,1,1
            </code>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaveDisabled}
          className="gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}

