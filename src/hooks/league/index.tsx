
import { createContext, useContext, ReactNode } from "react"
import { useNavigation } from "./useNavigation"
import { useLeagueData } from "./useLeagueData"
import { LeagueState } from "./types"

const LeagueContext = createContext<LeagueState | null>(null)

export const useLeagueState = (): LeagueState => {
  const context = useContext(LeagueContext)
  if (!context) {
    throw new Error("useLeagueState must be used within a LeagueStateProvider")
  }
  return context
}

interface LeagueStateProviderProps {
  children: ReactNode
}

export const LeagueStateProvider = ({ children }: LeagueStateProviderProps) => {
  // Navigation state and actions
  const navigation = useNavigation()
  
  // League data state and actions
  const leagueData = useLeagueData(navigation.setSelectedLeagueId)
  
  const value: LeagueState = {
    // Navigation state
    currentRoute: navigation.currentRoute,
    selectedLeagueId: navigation.selectedLeagueId,
    selectedMatchId: navigation.selectedMatchId,
    
    // Navigation actions
    navigate: navigation.navigate,
    goBack: navigation.goBack,
    
    // Data state
    ...leagueData,
  }
  
  return <LeagueContext.Provider value={value}>{children}</LeagueContext.Provider>
}
