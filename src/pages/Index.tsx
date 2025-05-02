
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Header } from "@/components/Header";
import LeagueSeasons from "@/components/LeagueSeasons";
import LeagueEditor from "@/components/LeagueEditor";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import IntegrationCards from "@/components/dashboard/IntegrationCards";
import ContentTabs from "@/components/dashboard/ContentTabs";
import MatchSchedule from "@/components/MatchSchedule";
import { LeagueDetails } from "@/components/LeagueDetails";
import MatchDetail from "@/components/MatchDetail";
import MobileSidebar from "@/components/layout/MobileSidebar";
import ExportData from "@/components/export/ExportData";
import LeagueStatsDashboard from "@/components/dashboard/LeagueStatsDashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LeagueData, Match } from "@/types";

const Matches = () => {
  const [activeTab, setActiveTab] = useState("league-list");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<LeagueData | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [dataUpdatedAt, setDataUpdatedAt] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('/');
  const isMobile = useIsMobile();

  // State for MatchDetail dialog
  const [isMatchDetailOpen, setIsMatchDetailOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setDataUpdatedAt(now);
      toast.success("Data refreshed successfully", {
        description: `All data has been updated as of ${now.toLocaleTimeString()}`
      });
    }, 2000);
  };

  const handleLeagueUpdate = (updatedLeague: LeagueData) => {
    setSelectedLeague(updatedLeague);
    toast("League details updated.");
  };

  const handleMatchesUpdate = (updatedMatches: Match[]) => {
    setMatches(updatedMatches);
    toast("Matches updated.");
  };

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    // Handle navigation based on routes
    if (route === '/') {
      setActiveTab('league-list');
    } else if (route === '/leagues') {
      setActiveTab('league-list');
    } else if (route === '/statistics' && selectedLeague) {
      setActiveTab('statistics');
    }
  };

  const seasonSelector = (
    <div className="relative flex items-center">
      <Button variant="outline" className="bg-black/20 border-white/10 text-white flex items-center gap-2">
        <span>2023-2024 Szezon</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );

  const handleSelectLeague = (league: LeagueData, leagueMatches: Match[]) => {
    setSelectedLeague(league);
    setMatches(leagueMatches);
    setActiveTab("league-details");
    setIsLoading(false);
  };

  const handleBackToList = () => {
    setActiveTab("league-list");
  };

  const handleBackFromEditor = () => {
    setIsEditing(false);
    setActiveTab("league-list");
  };

  const handleOpenMatchDetail = (match: Match) => {
    setSelectedMatch(match);
    setIsMatchDetailOpen(true);
  };

  const renderContent = () => {
    if (isEditing) {
      return <LeagueEditor onBack={handleBackFromEditor} />;
    }
    
    if (activeTab === "league-list") {
      return (
        <>
          <DashboardHeader
            title="V-SPORTS ELEMZŐ RENDSZER"
            subtitle="Professzionális Elemzés és Predikció"
            dataUpdatedAt={dataUpdatedAt}
            isRefreshing={isRefreshing}
            onRefresh={handleRefreshData}
            actionButton={seasonSelector}
          />

          <IntegrationCards />
          
          <LeagueSeasons
            onEdit={() => setIsEditing(true)}
            onSelect={handleSelectLeague}
          />
        </>
      );
    }

    if (activeTab === "league-details" && selectedLeague) {
      return (
        <LeagueDetails
          league={selectedLeague}
          matches={matches}
          onBack={handleBackToList}
          onUpdateLeague={handleLeagueUpdate}
          onUpdateMatches={handleMatchesUpdate}
          onNavigateToTab={(tabName: string) => setActiveTab(tabName)}
        />
      );
    }

    if (["matches", "standings", "form", "statistics"].includes(activeTab) && selectedLeague) {
      return (
        <>
          <Button onClick={() => setActiveTab('league-details')} variant="outline" className="self-start mb-6">
            ← Back to League Details
          </Button>

          <ContentTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLoading={isLoading}
          />

          {activeTab === "matches" && (
            <MatchSchedule
              matches={matches}
              league={selectedLeague}
              isLoading={isLoading}
              onMatchClick={handleOpenMatchDetail}
            />
          )}
          
          {activeTab === "statistics" && selectedLeague && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                {/* Import the statistics dashboard component here */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                  {isMobile ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">
                        For the best experience, please view statistics on a larger screen.
                        <Button onClick={() => setActiveTab('league-details')} variant="link" className="px-1">
                          Go back
                        </Button>
                      </p>
                    </div>
                  ) : (
                    selectedLeague && <LeagueStatsDashboard league={selectedLeague} matches={matches} />
                  )}
                </div>
              </div>
              <div className="xl:col-span-1">
                <ExportData league={selectedLeague} matches={matches} />
              </div>
            </div>
          )}
        </>
      );
    }

    if (["matches", "standings", "form"].includes(activeTab) && !selectedLeague) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Please select a league from the 'League List' tab first.
          <Button onClick={() => setActiveTab('league-list')} variant="link">Go to League List</Button>
        </div>
      );
    }

    return null;
  };

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
  );
};

export default Matches;
