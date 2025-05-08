
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PredictionResult } from "./PredictionResult"
import { getPrediction } from "@/services/api"
import { PredictionResultType } from "@/types/api"
import { Loader2, AlertCircle, Info } from "lucide-react"
import { TEAMS } from "@/data/teams"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface MatchPredictionPanelProps {
  matches: any[]
}

export function MatchPredictionPanel({ matches }: MatchPredictionPanelProps) {
  const [homeTeam, setHomeTeam] = useState<string>("")
  const [awayTeam, setAwayTeam] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResultType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPredictionLocal, setIsPredictionLocal] = useState<boolean>(false)
  const [selectedPredictionType, setSelectedPredictionType] = useState<string>("standard")
  const [recentTeams, setRecentTeams] = useState<{home: string[], away: string[]}>({
    home: [],
    away: []
  })
  
  // Sort teams by name
  const sortedTeams = TEAMS.sort((a, b) => a.name.localeCompare(b.name))
  
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
  
  const renderRecentTeams = (type: 'home' | 'away') => {
    const teams = recentTeams[type]
    if (!teams || teams.length === 0) return null
    
    return (
      <div className="mt-2">
        <p className="text-xs text-gray-400">Recent {type} teams:</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {teams.map(team => (
            <Badge 
              key={team} 
              variant="outline" 
              className="cursor-pointer hover:bg-white/10 bg-black/30 text-xs"
              onClick={() => type === 'home' ? setHomeTeam(team) : setAwayTeam(team)}
            >
              {team}
            </Badge>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader>
        <CardTitle className="text-white">Match Outcome Predictor</CardTitle>
        <CardDescription>
          Select two teams to predict the outcome of a hypothetical match
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={selectedPredictionType} onValueChange={setSelectedPredictionType} className="w-full">
          <TabsList className="grid grid-cols-2 bg-black/20 w-full">
            <TabsTrigger value="standard" className="data-[state=active]:bg-black/30">
              Standard Prediction
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-black/30">
              Advanced Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Home Team</label>
                <Select value={homeTeam} onValueChange={setHomeTeam}>
                  <SelectTrigger className="w-full bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Select Home Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedTeams.map((team) => (
                      <SelectItem key={`home-${team.id}`} value={team.name}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {renderRecentTeams('home')}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Away Team</label>
                <Select value={awayTeam} onValueChange={setAwayTeam}>
                  <SelectTrigger className="w-full bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Select Away Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedTeams.map((team) => (
                      <SelectItem key={`away-${team.id}`} value={team.name}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {renderRecentTeams('away')}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Home Team</label>
                <Select value={homeTeam} onValueChange={setHomeTeam}>
                  <SelectTrigger className="w-full bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Select Home Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedTeams.map((team) => (
                      <SelectItem key={`home-advanced-${team.id}`} value={team.name}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Away Team</label>
                <Select value={awayTeam} onValueChange={setAwayTeam}>
                  <SelectTrigger className="w-full bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Select Away Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedTeams.map((team) => (
                      <SelectItem key={`away-advanced-${team.id}`} value={team.name}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2 space-y-2">
                <label className="text-sm text-gray-400">Analysis Parameters</label>
                <div className="grid grid-cols-2 gap-2">
                  <Select defaultValue="last10">
                    <SelectTrigger className="bg-black/30 border-white/10 text-white">
                      <SelectValue placeholder="Data Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Matches</SelectItem>
                      <SelectItem value="last10">Last 10 Matches</SelectItem>
                      <SelectItem value="last5">Last 5 Matches</SelectItem>
                      <SelectItem value="season">Current Season</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="standard">
                    <SelectTrigger className="bg-black/30 border-white/10 text-white">
                      <SelectValue placeholder="Analysis Depth" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deep">Deep Analysis</SelectItem>
                      <SelectItem value="head2head">Head-to-Head Focus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {error && (
          <Alert variant="destructive" className="bg-red-500/20 border-red-500/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Button 
          onClick={handlePredict} 
          disabled={!homeTeam || !awayTeam || homeTeam === awayTeam || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Prediction...
            </div>
          ) : (
            "Generate Prediction"
          )}
        </Button>
        
        {prediction && (
          <div className="mt-6 animate-fadeIn">
            {isPredictionLocal && (
              <Alert className="mb-4 bg-blue-500/20 border-blue-500/30">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-100">
                  Using local prediction engine. External data unavailable.
                </AlertDescription>
              </Alert>
            )}
            <PredictionResult 
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              prediction={prediction}
              isLocalPrediction={isPredictionLocal}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
