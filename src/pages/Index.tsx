import { Header } from "@/components/Header"
import { LeagueDetails } from "@/components/LeagueDetails"
import { useLeagueState } from "@/hooks/league"
import { AnalysisView } from "./AnalysisView"
import { AdvancedPatternView } from "./AdvancedPatternView"
import { IntegrationsView } from "./IntegrationsView"
import { LeagueAnalyticsView } from "./league/LeagueAnalyticsView"
import { LeagueManagementView } from "./league/LeagueManagementView"
import { LeagueTable } from "@/components/LeagueTable"
import { MatchesView } from "./MatchesView"
import { MobileSidebar } from "@/components/layout/MobileSidebar"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster" 
import { NewLeagueModal } from "@/components/NewLeagueModal"

export default function Index() {
  const { 
    currentRoute, 
    selectedLeagueId, 
    leaguesList,
    isNewLeagueModalOpen,
    setIsNewLeagueModalOpen,
    handleLeagueAction,
    handleCreateLeague,
    searchTerm,
    setSearchTerm
  } = useLeagueState();
  
  const { toast } = useToast();

  // Filter leagues based on search term
  const filteredLeagues = leaguesList.filter((league) =>
    Object.values(league).some((value) => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      <Header currentSeason="2023-2024" />

      <div className="flex">
        <div className="hidden md:block w-64 bg-[#0a0f14] border-r border-white/5 min-h-[calc(100vh-72px)] sticky top-[72px]">
          <MobileSidebar />
        </div>

        <main className="flex-1 container mx-auto p-4 md:p-8">
          <div className="relative overflow-hidden rounded-xl bg-[#0a0f14] border border-white/5 shadow-lg">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

            <div className="relative p-6">
              {currentRoute === "leagues" && (
                <LeagueTable
                  leagues={filteredLeagues}
                  onLeagueAction={handleLeagueAction}
                  onSearch={(term) => setSearchTerm(term)}
                  onNewLeague={() => setIsNewLeagueModalOpen(true)}
                />
              )}
              {currentRoute === "league-details" && selectedLeagueId && (
                <LeagueDetails />
              )}
              {currentRoute === "analysis" && (
                <AnalysisView />
              )}
              {currentRoute === "advanced-pattern" && (
                <AdvancedPatternView />
              )}
              {currentRoute === "integrations" && (
                <IntegrationsView />
              )}
              {currentRoute === "league-analytics" && (
                <LeagueAnalyticsView />
              )}
              {currentRoute === "league-management" && (
                <LeagueManagementView />
              )}
              {currentRoute === "matches" && (
                <MatchesView />
              )}

              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </main>
      </div>
      
      <NewLeagueModal
        isOpen={isNewLeagueModalOpen}
        onClose={() => setIsNewLeagueModalOpen(false)}
        onCreateLeague={handleCreateLeague}
      />
      
      <Toaster />
    </div>
  );
}
