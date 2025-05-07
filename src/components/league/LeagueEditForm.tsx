
import { useState, useCallback } from "react"
import { Save } from "lucide-react"
import type { Match, LeagueData } from "../../types"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { LeagueFormFields } from "./LeagueFormFields"
import { CSVUploader } from "./CSVUploader"

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

  const handleLeagueChange = useCallback((updatedLeague: LeagueData) => {
    setEditedLeague(updatedLeague)
    setIsSaveDisabled(false)
  }, [])

  const handleSave = useCallback(() => {
    onUpdateLeague(editedLeague)
    onSave()
    setIsSaveDisabled(true)
    toast.success("League details saved successfully")
  }, [editedLeague, onUpdateLeague, onSave])

  const handleDataLoaded = useCallback((loaded: boolean) => {
    setDataLoaded(loaded)
    setIsSaveDisabled(!loaded)
  }, [])

  return (
    <div className="bg-black/20 rounded-xl p-6 space-y-6 border border-white/5">
      <LeagueFormFields league={editedLeague} onChange={handleLeagueChange} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <CSVUploader onMatchesUpdate={onUpdateMatches} onDataLoaded={handleDataLoaded} />

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
