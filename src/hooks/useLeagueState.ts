
import { useState, createContext, useContext, useCallback } from "react"

type RouteType = 
  | "leagues" 
  | "league-details" 
  | "analysis" 
  | "advanced-pattern" 
  | "integrations" 
  | "league-analytics" 
  | "league-management" 
  | "matches"

interface LeagueState {
  currentRoute: RouteType
  selectedLeagueId: string | null
  selectedMatchId: string | null
  navigate: (route: RouteType, params?: { leagueId?: string; matchId?: string }) => void
  goBack: () => void
}

const LeagueStateContext = createContext<LeagueState | undefined>(undefined)

export const useLeagueState = () => {
  const context = useContext(LeagueStateContext)
  if (context === undefined) {
    throw new Error("useLeagueState must be used within a LeagueStateProvider")
  }
  return context
}

interface LeagueStateProviderProps {
  children: React.ReactNode
}

export const LeagueStateProvider = ({ children }: LeagueStateProviderProps) => {
  const [currentRoute, setCurrentRoute] = useState<RouteType>("leagues")
  const [routeHistory, setRouteHistory] = useState<Array<{ route: RouteType; leagueId?: string; matchId?: string }>>([])
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null)
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null)

  const navigate = useCallback(
    (route: RouteType, params?: { leagueId?: string; matchId?: string }) => {
      // Add current route to history before changing
      setRouteHistory((prev) => [...prev, { route: currentRoute, leagueId: selectedLeagueId || undefined, matchId: selectedMatchId || undefined }])
      
      setCurrentRoute(route)
      
      if (params?.leagueId !== undefined) {
        setSelectedLeagueId(params.leagueId)
      }
      
      if (params?.matchId !== undefined) {
        setSelectedMatchId(params.matchId)
      }
    },
    [currentRoute, selectedLeagueId, selectedMatchId]
  )

  const goBack = useCallback(() => {
    if (routeHistory.length > 0) {
      const prevRoute = routeHistory[routeHistory.length - 1]
      setRouteHistory((prev) => prev.slice(0, -1))
      
      setCurrentRoute(prevRoute.route)
      setSelectedLeagueId(prevRoute.leagueId || null)
      setSelectedMatchId(prevRoute.matchId || null)
    } else {
      // Default fallback if no history
      setCurrentRoute("leagues")
      setSelectedLeagueId(null)
      setSelectedMatchId(null)
    }
  }, [routeHistory])

  return (
    <LeagueStateContext.Provider
      value={{
        currentRoute,
        selectedLeagueId,
        selectedMatchId,
        navigate,
        goBack,
      }}
    >
      {children}
    </LeagueStateContext.Provider>
  )
}
