
import { memo } from "react"
import { Button } from "@/components/ui/button"
import MatchSchedule from "@/components/MatchSchedule"
import LeagueStatsDashboard from "@/components/dashboard/LeagueStatsDashboard"
import ExportData from "@/components/export/ExportData"
import ContentTabs from "@/components/dashboard/ContentTabs" 
import { useIsMobile } from "@/hooks/use-mobile"
import type { LeagueData, Match } from "@/types"

interface LeagueStatsViewProps {
  league: LeagueData
  matches: Match[]
  activeTab: string
  isLoading: boolean
  onTabChange: (tab: string) => void
  onBackToLeagueDetails: () => void
  onMatchClick: (match: Match) => void
}

export const LeagueStatsView = memo(({
  league,
  matches,
  activeTab,
  isLoading,
  onTabChange,
  onBackToLeagueDetails,
  onMatchClick
}: LeagueStatsViewProps) => {
  const isMobile = useIsMobile()

  return (
    <>
      <Button 
        onClick={onBackToLeagueDetails} 
        variant="outline" 
        className="self-start mb-6"
      >
        ← Back to League Details
      </Button>

      <ContentTabs
        activeTab={activeTab}
        setActiveTab={onTabChange}
        isLoading={isLoading}
      />

      {activeTab === "matches" && (
        <MatchSchedule
          matches={matches}
          league={league}
          isLoading={isLoading}
          onMatchClick={onMatchClick}
        />
      )}
      
      {activeTab === "statistics" && league && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <div className="bg-black/20 rounded-xl border border-white/5 p-6">
              {isMobile ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    For the best experience, please view statistics on a larger screen.
                    <Button onClick={onBackToLeagueDetails} variant="link" className="px-1">
                      Go back
                    </Button>
                  </p>
                </div>
              ) : (
                <LeagueStatsDashboard league={league} matches={matches} />
              )}
            </div>
          </div>
          <div className="xl:col-span-1">
            <ExportData league={league} matches={matches} />
          </div>
        </div>
      )}
    </>
  )
})

LeagueStatsView.displayName = "LeagueStatsView"
