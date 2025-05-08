
import { memo, useState, useEffect } from "react"
import { useLeagueState } from "@/hooks/league"
import LeagueEditor from "@/components/league/LeagueEditor"
import { Loader, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LeagueEditorViewProps {
  onBack: () => void
}

export const LeagueEditorView = memo(({ onBack }: LeagueEditorViewProps) => {
  const { selectedLeagueId, leaguesList, isLoading } = useLeagueState()
  const [error, setError] = useState<string | null>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)

  // Get the selected league data or default to empty league template
  const selectedLeague = selectedLeagueId 
    ? leaguesList.find(league => league.id === selectedLeagueId)
    : null

  useEffect(() => {
    // Simulate loading data (this would be an API call in a real app)
    const loadData = async () => {
      try {
        setError(null)
        setIsPageLoading(true)

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // If no league is found and an ID was specified, show an error
        if (!selectedLeague && selectedLeagueId) {
          setError(`League with ID ${selectedLeagueId} not found.`)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
        setError(errorMessage)
        toast.error('Failed to load league data')
      } finally {
        setIsPageLoading(false)
      }
    }

    loadData()
  }, [selectedLeagueId, selectedLeague])

  // Show loading state
  if (isPageLoading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 h-full">
        <Loader className="w-10 h-10 animate-spin mb-4 text-blue-500" />
        <p className="text-gray-400">Loading league editor...</p>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6 space-y-6">
        <Alert variant="destructive" className="bg-red-950/50 border-red-800 text-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button 
            onClick={onBack}
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            Go Back to Leagues
          </Button>
        </div>
      </div>
    )
  }

  // Create a new league template if no league was found (and no error)
  const leagueData = selectedLeague || {
    id: "", 
    name: "New League", 
    season: new Date().getFullYear().toString(), 
    winner: "-", 
    secondPlace: "-", 
    thirdPlace: "-", 
    status: "In Progress" 
  }

  return <LeagueEditor onBack={onBack} league={leagueData} />
})

LeagueEditorView.displayName = "LeagueEditorView"
