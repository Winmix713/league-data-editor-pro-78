import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LeagueData } from '@/types';

interface LeagueStateContextType {
  leagues: LeagueData[];
  selectedLeague: LeagueData | null;
  loadingStates: {
    data: boolean;
    save: boolean;
    refresh: boolean;
  };
  errorState: {
    message: string | null;
    code: string | null;
  };
  setLoadingState: (key: keyof LoadingStates, value: boolean) => void;
  setErrorState: (message: string | null, code: string | null) => void;
  // Other methods...
}

interface LoadingStates {
  data: boolean;
  save: boolean;
  refresh: boolean;
}

const LeagueStateContext = createContext<LeagueStateContextType | undefined>(undefined);

export const LeagueStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leagues, setLeagues] = useState<LeagueData[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<LeagueData | null>(null);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    data: false,
    save: false,
    refresh: false
  });
  const [errorState, setErrorState] = useState<{ message: string | null; code: string | null }>({
    message: null, 
    code: null
  });

  const setLoadingState = (key: keyof LoadingStates, value: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: value }));
  };

  const updateErrorState = (message: string | null, code: string | null) => {
    setErrorState({ message, code });
  };

  // Implement other methods like fetchLeagues, updateLeague, etc.
  const fetchLeagues = async () => {
    try {
      setLoadingState('data', true);
      updateErrorState(null, null);
      
      // Fetch logic here
      
      setLoadingState('data', false);
    } catch (error) {
      setLoadingState('data', false);
      updateErrorState(error instanceof Error ? error.message : 'Unknown error', 'FETCH_ERROR');
    }
  };

  const value = {
    leagues,
    selectedLeague,
    loadingStates,
    errorState,
    setLoadingState,
    setErrorState: updateErrorState,
    // Other methods...
  };

  return (
    <LeagueStateContext.Provider value={value}>
      {children}
    </LeagueStateContext.Provider>
  );
};

export const useLeagueState = (): LeagueStateContextType => {
  const context = useContext(LeagueStateContext);
  if (context === undefined) {
    throw new Error('useLeagueState must be used within a LeagueStateProvider');
  }
  return context;
};