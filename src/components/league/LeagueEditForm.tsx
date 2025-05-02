
"use client"

import { useState, useRef, useCallback } from "react"
import { Save, Upload } from "lucide-react"
import Papa from "papaparse"
import type { Match, LeagueData } from "../../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

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
    toast({
      description: "League details saved successfully"
    })
  }, [editedLeague, onUpdateLeague, onSave])

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      Papa.parse(file, {
        header: true,
        complete: (result) => {
          try {
            const parsedMatches = result.data
              .filter((rawMatch: any) => {
                // Filter out any rows that don't have all required fields
                return (
                  rawMatch.date !== undefined &&
                  (rawMatch.home_team || rawMatch.Home_team) !== undefined &&
                  (rawMatch.away_team || rawMatch.Away_team) !== undefined &&
                  (rawMatch["ht_home_score"] || rawMatch["Half/Home"]) !== undefined &&
                  (rawMatch["ht_away_score"] || rawMatch["Half/Away"]) !== undefined &&
                  (rawMatch["home_score"] || rawMatch["Full/Home"]) !== undefined &&
                  (rawMatch["away_score"] || rawMatch["Full/Away"]) !== undefined
                )
              })
              .map((rawMatch: any) => {
                // Map to our Match format
                return {
                  date: rawMatch.date || "",
                  home_team: rawMatch.home_team || rawMatch.Home_team || "",
                  away_team: rawMatch.away_team || rawMatch.Away_team || "",
                  ht_home_score: Number(rawMatch.ht_home_score || rawMatch["Half/Home"] || 0),
                  ht_away_score: Number(rawMatch.ht_away_score || rawMatch["Half/Away"] || 0),
                  home_score: Number(rawMatch.home_score || rawMatch["Full/Home"] || 0),
                  away_score: Number(rawMatch.away_score || rawMatch["Full/Away"] || 0),
                  round: rawMatch.round || "1",
                }
              })

            if (parsedMatches.length === 0) {
              toast({
                variant: "destructive",
                description: "No valid matches found in the CSV file. Please check the format and try again."
              })
              return
            }

            onUpdateMatches(parsedMatches)
            setDataLoaded(true)
            setIsSaveDisabled(false)
            toast({
              description: `${parsedMatches.length} matches imported successfully`
            })
          } catch (error) {
            console.error("Error processing CSV data:", error)
            toast({
              variant: "destructive",
              description: "Failed to process CSV file. Please check the format and try again."
            })
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error)
          toast({
            variant: "destructive", 
            description: "Failed to parse CSV file. Please check the format and try again."
          })
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
            <span className={`text-sm ${dataLoaded ? "text-emerald-400" : "text-gray-400"}`}>
              {dataLoaded ? "✓ Data loaded successfully" : "No file chosen"}
            </span>
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
