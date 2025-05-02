
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
import MatchDetail from "@/components/MatchDetail"; // Import the MatchDetail component
import type { LeagueData, Match } from "@/types";

const Matches = () => {
  const [activeTab, setActiveTab] = useState("league-list");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<LeagueData | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [dataUpdatedAt, setDataUpdatedAt] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        {isEditing ? (
          <LeagueEditor onBack={handleBackFromEditor} />
        ) : (
          <div className="flex flex-col space-y-6">
            <DashboardHeader
              title="V-SPORTS ELEMZŐ RENDSZER"
              subtitle="Professzionális Elemzés és Predikció"
              dataUpdatedAt={dataUpdatedAt}
              isRefreshing={isRefreshing}
              onRefresh={handleRefreshData}
              actionButton={seasonSelector}
            />

            <IntegrationCards />

            {activeTab === "league-list" && (
              <LeagueSeasons
                onEdit={() => setIsEditing(true)}
                onSelect={handleSelectLeague}
              />
            )}

            {activeTab === "league-details" && selectedLeague && (
              <LeagueDetails
                league={selectedLeague}
                matches={matches}
                onBack={handleBackToList}
                onUpdateLeague={handleLeagueUpdate}
                onUpdateMatches={handleMatchesUpdate}
                onNavigateToTab={(tabName: string) => setActiveTab(tabName)}
              />
            )}

            {["matches", "standings", "form"].includes(activeTab) && selectedLeague && (
              <>
                <Button onClick={() => setActiveTab('league-details')} variant="outline" className="self-start">
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
                    onMatchClick={handleOpenMatchDetail} // Pass the handler to MatchSchedule
                  />
                )}
              </>
            )}

            {["matches", "standings", "form"].includes(activeTab) && !selectedLeague && (
              <div className="text-center py-8 text-muted-foreground">
                Please select a league from the 'League List' tab first.
                <Button onClick={() => setActiveTab('league-list')} variant="link">Go to League List</Button>
              </div>
            )}
          </div>
        )}

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
