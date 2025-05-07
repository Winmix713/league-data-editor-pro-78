
import { createContext, useContext } from "react"
import { useNavigation } from "./useNavigation"
import { useLeagueData } from "./useLeagueData" 
import type { LeagueState } from "./types"
import type { LeagueData } from "@/types"

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
  // Get navigation state and actions
  const {
    currentRoute,
    selectedLeagueId,
    selectedMatchId,
    navigate,
    goBack,
    setSelectedLeagueId
  } = useNavigation()
  
  // Get data state and actions
  const {
    leaguesList,
    currentMatches,
    searchTerm,
    isNewLeagueModalOpen,
    handleLeagueAction: handleLeagueActionBase,
    handleCreateLeague,
    handleUpdateLeague,
    handleUpdateMatches,
    setSearchTerm,
    setIsNewLeagueModalOpen
  } = useLeagueData(setSelectedLeagueId)

  // Enhanced league action handler that also handles navigation
  const handleLeagueAction = (leagueId: string, action: "view" | "edit" | "complete" | "delete") => {
    handleLeagueActionBase(leagueId, action)
    
    // Handle navigation for view/edit actions
    if (action === "view" || action === "edit") {
      navigate("league-details", { leagueId })
    }
  }

  return (
    <LeagueStateContext.Provider value={{
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
    }}>
      {children}
    </LeagueStateContext.Provider>
  )
}
