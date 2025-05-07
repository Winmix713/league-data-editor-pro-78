
import { useState, useCallback } from "react"
import { RouteType, RouteHistoryItem } from "./types"

export const useNavigation = () => {
  // Navigation state
  const [currentRoute, setCurrentRoute] = useState<RouteType>("leagues")
  const [routeHistory, setRouteHistory] = useState<RouteHistoryItem[]>([])
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null)
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null)
  
  // Navigation actions
  const navigate = useCallback(
    (route: RouteType, params?: { leagueId?: string; matchId?: string }) => {
      // Add current route to history before changing
      setRouteHistory((prev) => [...prev, { 
        route: currentRoute, 
        leagueId: selectedLeagueId || undefined, 
        matchId: selectedMatchId || undefined 
      }])
      
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

  return {
    // Navigation state
    currentRoute,
    selectedLeagueId,
    selectedMatchId,
    
    // Navigation actions
    navigate,
    goBack,
    
    // For internal use
    setSelectedLeagueId
  }
}
