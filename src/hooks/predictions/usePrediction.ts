
import { useState, useEffect } from "react"
import { getPrediction } from "@/services/api"
import { PredictionResultType } from "@/types/api"
import { toast } from "sonner"

export function usePrediction() {
  const [homeTeam, setHomeTeam] = useState<string>("")
  const [awayTeam, setAwayTeam] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResultType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPredictionLocal, setIsPredictionLocal] = useState<boolean>(false)
  const [recentTeams, setRecentTeams] = useState<{home: string[], away: string[]}>({
    home: [],
    away: []
  })
  
  useEffect(() => {
    // Load recent team selections from localStorage if available
    try {
      const savedHomeTeams = localStorage.getItem('recentHomeTeams')
      const savedAwayTeams = localStorage.getItem('recentAwayTeams')
      
      if (savedHomeTeams) setRecentTeams(prev => ({ ...prev, home: JSON.parse(savedHomeTeams) }))
      if (savedAwayTeams) setRecentTeams(prev => ({ ...prev, away: JSON.parse(savedAwayTeams) }))
    } catch (err) {
      console.error("Error loading recent teams:", err)
    }
  }, [])
  
  // Save recent team selections
  const saveRecentTeam = (team: string, type: 'home' | 'away') => {
    try {
      // Update state
      setRecentTeams(prev => {
        // Remove the team if it already exists to avoid duplicates
        const filteredTeams = prev[type].filter(t => t !== team)
        // Add team to the beginning and limit to 5 entries
        const newTeams = [team, ...filteredTeams].slice(0, 5)
        
        // Save to localStorage
        localStorage.setItem(`recent${type.charAt(0).toUpperCase() + type.slice(1)}Teams`, JSON.stringify(newTeams))
        
        return {
          ...prev,
          [type]: newTeams
        }
      })
    } catch (err) {
      console.error("Error saving recent team:", err)
    }
  }
  
  const handlePredict = async () => {
    if (homeTeam && awayTeam) {
      if (homeTeam === awayTeam) {
        setError("Home team and away team cannot be the same")
        toast.error("Home team and away team cannot be the same")
        return
      }
      
      setError(null)
      setIsLoading(true)
      setIsPredictionLocal(false)
      
      try {
        // Save selected teams to recent lists
        saveRecentTeam(homeTeam, 'home')
        saveRecentTeam(awayTeam, 'away')
        
        const result = await getPrediction(homeTeam, awayTeam)
        setPrediction(result.prediction || null)
        
        // Check if this is a local prediction (no team_analysis means it's local)
        setIsPredictionLocal(!result.team_analysis && !!result.prediction)
        
        if (result.prediction) {
          if (!result.team_analysis) {
            // Show toast for local prediction
            toast.success("Prediction generated using local data", {
              description: "External API unavailable. Using your match history."
            })
          } else {
            toast.success("Prediction generated successfully")
          }
        } else {
          toast.error("Could not generate prediction with available data")
          setError("Insufficient data to generate a reliable prediction. Try adding more match data for these teams.")
        }
      } catch (error) {
        console.error("Prediction error:", error)
        setError("Failed to generate prediction. Please try again.")
        toast.error("Prediction failed. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return {
    homeTeam,
    setHomeTeam,
    awayTeam,
    setAwayTeam,
    isLoading,
    prediction,
    error,
    isPredictionLocal,
    recentTeams,
    handlePredict
  }
}
