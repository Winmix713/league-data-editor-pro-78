
import React, { useEffect } from 'react'
import { Header } from "@/components/Header"
import { LeagueDetails } from "@/components/LeagueDetails"
import MatchDetail from "@/components/MatchDetail"
import MobileSidebar from "@/components/layout/MobileSidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLeagueState } from '@/hooks/useLeagueState'
import { LeagueListView } from './league/LeagueListView'
import { LeagueStatsView } from './league/LeagueStatsView'
import { LeagueEditorView } from './league/LeagueEditorView'

const Matches = () => {
  const {
    activeTab,
    setActiveTab,
    isEditing, 
    setIsEditing,
    selectedLeague,
    matches,
    dataUpdatedAt,
    isRefreshing,
    isLoading,
    setIsLoading,
    currentRoute,
    isMatchDetailOpen,
    selectedMatch,
    setIsMatchDetailOpen,
    handleRefreshData,
    handleLeagueUpdate,
    handleMatchesUpdate,
    handleNavigate,
    handleSelectLeague,
    handleBackToList,
    handleBackFromEditor,
    handleOpenMatchDetail
  } = useLeagueState()

  const isMobile = useIsMobile()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [setIsLoading])

  const renderContent = () => {
    if (isEditing) {
      return <LeagueEditorView onBack={handleBackFromEditor} />
    }
    
    if (activeTab === "league-list") {
      return (
        <LeagueListView
          dataUpdatedAt={dataUpdatedAt}
          isRefreshing={isRefreshing}
          onRefresh={handleRefreshData}
          onEdit={() => setIsEditing(true)}
          onSelectLeague={handleSelectLeague}
        />
      )
    }

    if (activeTab === "league-details" && selectedLeague) {
      return (
        <LeagueDetails
          league={selectedLeague}
          matches={matches}
          onBack={handleBackToList}
          onUpdateLeague={handleLeagueUpdate}
          onUpdateMatches={handleMatchesUpdate}
        />
      )
    }

    if (["matches", "standings", "form", "statistics"].includes(activeTab) && selectedLeague) {
      return (
        <LeagueStatsView
          league={selectedLeague}
          matches={matches}
          activeTab={activeTab}
          isLoading={isLoading}
          onTabChange={setActiveTab}
          onBackToLeagueDetails={() => setActiveTab('league-details')}
          onMatchClick={handleOpenMatchDetail}
        />
      )
    }

    if (["matches", "standings", "form"].includes(activeTab) && !selectedLeague) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Please select a league from the 'League List' tab first.
          <Button onClick={() => setActiveTab('league-list')} variant="link">Go to League List</Button>
        </div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen pt-16 pb-16 bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center gap-4 mb-6">
          <MobileSidebar onNavigate={handleNavigate} currentRoute={currentRoute} />
          {isMobile && <h1 className="text-xl font-bold">Soccer Stats Pro</h1>}
        </div>
        
        <div className="flex flex-col space-y-6">
          {renderContent()}
        </div>

        {selectedMatch && (
          <MatchDetail
            match={selectedMatch}
            isOpen={isMatchDetailOpen}
            onClose={() => setIsMatchDetailOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Matches

// Fix missing import
import { Button } from "@/components/ui/button"
