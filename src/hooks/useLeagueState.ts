
import { useState, createContext, useContext, useCallback } from "react"
import type { LeagueData, Match } from "@/types"

// Define the types of routes available in the application
type RouteType = 
  | "leagues" 
  | "league-details" 
  | "analysis" 
  | "advanced-pattern" 
  | "integrations" 
  | "league-analytics" 
  | "league-management" 
  | "matches"

// Interface for the LeagueState context
interface LeagueState {
  // Navigation state
  currentRoute: RouteType
  selectedLeagueId: string | null
  selectedMatchId: string | null
  
  // Data state
  leaguesList: LeagueData[]
  currentMatches: Match[]
  searchTerm: string
  isNewLeagueModalOpen: boolean
  
  // Navigation actions
  navigate: (route: RouteType, params?: { leagueId?: string; matchId?: string }) => void
  goBack: () => void
  
  // Data actions
  handleLeagueAction: (leagueId: string, action: "view" | "edit" | "complete" | "delete") => void
  handleCreateLeague: (leagueId: string) => void
  handleUpdateLeague: (updatedLeague: LeagueData) => void
  handleUpdateMatches: (updatedMatches: Match[]) => void
  setSearchTerm: (term: string) => void
  setIsNewLeagueModalOpen: (isOpen: boolean) => void
}

// Initial leagues data
const initialLeagues: LeagueData[] = [
  {
    id: "19861",
    name: "Premier League",
    season: "2023-2024",
    winner: "-",
    secondPlace: "-",
    thirdPlace: "-",
    status: "In Progress",
  },
  {
    id: "19862",
    name: "La Liga",
    season: "2023-2024",
    winner: "-",
    secondPlace: "-",
    thirdPlace: "-",
    status: "In Progress",
  },
]

// Create context
const LeagueStateContext = createContext<LeagueState | undefined>(undefined)

// Hook to use the context
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

// Provider component
export const LeagueStateProvider = ({ children }: LeagueStateProviderProps) => {
  // Navigation state
  const [currentRoute, setCurrentRoute] = useState<RouteType>("leagues")
  const [routeHistory, setRouteHistory] = useState<Array<{ route: RouteType; leagueId?: string; matchId?: string }>>([])
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null)
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null)
  
  // Data state
  const [leaguesList, setLeaguesList] = useState<LeagueData[]>(initialLeagues)
  const [currentMatches, setCurrentMatches] = useState<Match[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewLeagueModalOpen, setIsNewLeagueModalOpen] = useState(false)
  
  // Derived state
  const selectedLeague = selectedLeagueId 
    ? leaguesList.find(league => league.id === selectedLeagueId) 
    : null
  
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
  
  // Data actions
  const handleLeagueAction = useCallback((leagueId: string, action: "view" | "edit" | "complete" | "delete") => {
    switch (action) {
      case "view":
      case "edit":
        setSelectedLeagueId(leagueId)
        setCurrentRoute("league-details")
        break
      case "complete":
        setLeaguesList(prev => prev.map(league => 
          league.id === leagueId 
            ? {
                ...league,
                status: "Completed",
                winner: "Winner Team", // This would come from standings calculation
                secondPlace: "Second Team",
                thirdPlace: "Third Team",
              } 
            : league
        ))
        break
      case "delete":
        setLeaguesList(prev => prev.filter(league => league.id !== leagueId))
        break
    }
  }, [])

  const handleCreateLeague = useCallback((leagueId: string) => {
    const newLeague: LeagueData = {
      id: leagueId,
      name: `League ${leagueId}`,
      season: "2023-2024",
      winner: "-",
      secondPlace: "-",
      thirdPlace: "-",
      status: "In Progress",
    }
    setLeaguesList(prev => [...prev, newLeague])
    setIsNewLeagueModalOpen(false)
  }, [])

  const handleUpdateLeague = useCallback((updatedLeague: LeagueData) => {
    setLeaguesList(prev => prev.map(league => 
      league.id === updatedLeague.id ? updatedLeague : league
    ))
  }, [])

  const handleUpdateMatches = useCallback((updatedMatches: Match[]) => {
    setCurrentMatches(updatedMatches)
  }, [])

  return (
    <LeagueStateContext.Provider
      value={{
        // Navigation state
        currentRoute,
        selectedLeagueId,
        selectedMatchId,
        
        // Data state
        leaguesList,
        currentMatches,
        searchTerm,
        isNewLeagueModalOpen,
        
        // Navigation actions
        navigate,
        goBack,
        
        // Data actions
        handleLeagueAction,
        handleCreateLeague,
        handleUpdateLeague,
        handleUpdateMatches,
        setSearchTerm,
        setIsNewLeagueModalOpen,
      }}
    >
      {children}
    </LeagueStateContext.Provider>
  )
}
