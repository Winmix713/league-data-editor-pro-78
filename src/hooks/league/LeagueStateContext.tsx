
import { createContext, useContext, useState } from "react"
import { useNavigation } from "./useNavigation"
import { useLeagueData } from "./useLeagueData" 
import type { LeagueState } from "./types"
import type { LeagueData } from "@/types"
import { toast } from "sonner"

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
    selectedTab,
    navigate,
    goBack,
    resetNavigation,
    setSelectedLeagueId,
    setSelectedTab
  } = useNavigation()
  
  // Track loading state
  const [isLoading, setIsLoading] = useState(false)
  
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

  // Refresh data with loading indicator
  const refreshData = () => {
    setIsLoading(true)
    // Simulate data refresh - in a real implementation, this would call
    // an API endpoint or database query
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Data refreshed successfully")
    }, 1000)
  }

  // Enhanced league action handler that also handles navigation
  const handleLeagueAction = (leagueId: string, action: "view" | "edit" | "complete" | "delete") => {
    handleLeagueActionBase(leagueId, action)
    
    // Handle navigation for view/edit actions
    if (action === "view" || action === "edit") {
      navigate("league-details", { leagueId, tab: "matches" })
    }
    
    // Show toast notification for completed actions
    if (action === "complete") {
      toast.success("League marked as completed")
    } else if (action === "delete") {
      toast.success("League deleted successfully")
    }
  }

  return (
    <LeagueStateContext.Provider value={{
      // Navigation state
      currentRoute,
      selectedLeagueId,
      selectedMatchId,
      selectedTab,
      
      // Data state
      leaguesList,
      currentMatches,
      searchTerm,
      isNewLeagueModalOpen,
      isLoading,
      
      // Navigation actions
      navigate,
      goBack,
      resetNavigation,
      
      // Data actions
      handleLeagueAction,
      handleCreateLeague,
      handleUpdateLeague,
      handleUpdateMatches,
      setSearchTerm,
      setIsNewLeagueModalOpen,
      refreshData,
    }}>
      {children}
    </LeagueStateContext.Provider>
  )
}
