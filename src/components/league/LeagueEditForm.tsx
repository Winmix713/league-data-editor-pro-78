
import { useState, useCallback, useEffect } from "react"
import { Save } from "lucide-react"
import type { Match, LeagueData } from "@/types"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { LeagueFormFields } from "./LeagueFormFields"
import { CSVUploader } from "./CSVUploader"
import { logger } from "@/utils/logger"

interface LeagueEditFormProps {
  league: LeagueData
  onUpdateLeague: (updatedLeague: LeagueData) => void
  onUpdateMatches: (matches: Match[]) => void
  onSave: () => void
}

interface FormErrors {
  name?: string
  season?: string
  status?: string
  winner?: string
  secondPlace?: string
  thirdPlace?: string
}

export const LeagueEditForm = ({
  league,
  onUpdateLeague,
  onUpdateMatches,
  onSave,
}: LeagueEditFormProps) => {
  const [editedLeague, setEditedLeague] = useState<LeagueData>(league)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Validate the league data whenever it changes
  useEffect(() => {
    const newErrors: FormErrors = {}
    let hasChanges = false
    
    // Check if anything has changed
    Object.keys(editedLeague).forEach(key => {
      const typedKey = key as keyof LeagueData
      if (editedLeague[typedKey] !== league[typedKey]) {
        hasChanges = true
      }
    })

    // Validate required fields
    if (!editedLeague.name || editedLeague.name.trim() === '') {
      newErrors.name = 'League name is required'
    }
    
    if (!editedLeague.season || editedLeague.season.trim() === '') {
      newErrors.season = 'Season is required'
    }
    
    // Status must be one of the allowed values
    if (editedLeague.status !== "In Progress" && editedLeague.status !== "Completed") {
      newErrors.status = 'Status must be "In Progress" or "Completed"'
    }
    
    setErrors(newErrors)
    
    // Enable save if there are changes and no errors
    setIsSaveDisabled((!hasChanges && !dataLoaded) || Object.keys(newErrors).length > 0)
  }, [editedLeague, dataLoaded, league])

  const handleLeagueChange = useCallback((updatedLeague: LeagueData) => {
    setEditedLeague(updatedLeague)
    logger.log("League form updated:", updatedLeague)
  }, [])

  const handleSave = useCallback(() => {
    // Final validation before save
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors before saving")
      return
    }
    
    onUpdateLeague(editedLeague)
    onSave()
    setIsSaveDisabled(true)
    setDataLoaded(false)
    toast.success("League details saved successfully")
  }, [editedLeague, onUpdateLeague, onSave, errors])

  const handleDataLoaded = useCallback((loaded: boolean, newMatches?: Match[]) => {
    setDataLoaded(loaded)
    if (loaded && newMatches && newMatches.length > 0) {
      onUpdateMatches(newMatches)
    }
  }, [onUpdateMatches])

  return (
    <div className="bg-black/20 rounded-xl p-6 space-y-6 border border-white/5">
      <LeagueFormFields 
        league={editedLeague} 
        onChange={handleLeagueChange}
        errors={errors}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <CSVUploader 
          onMatchesUpdate={(matches) => {
            onUpdateMatches(matches)
            handleDataLoaded(true, matches)
          }} 
          onDataLoaded={(loaded) => setDataLoaded(loaded)} 
        />

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
