
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LeagueFormFields } from "./LeagueFormFields";
import { CSVUploader } from "./CSVUploader";
import { LeagueTabsView } from "./LeagueTabsView";
import type { LeagueData, Match } from "@/types";
import { logger } from "@/utils/logger";

interface LeagueEditorProps {
  onBack: () => void;
  league?: Partial<LeagueData>;
}

const LeagueEditor = ({ 
  onBack, 
  league = { 
    id: "", 
    name: "Premier League", 
    season: "2023-2024", 
    winner: "-", 
    secondPlace: "-", 
    thirdPlace: "-", 
    status: "In Progress" 
  } 
}: LeagueEditorProps) => {
  const [leagueData, setLeagueData] = useState<LeagueData>(league as LeagueData);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState("matches");

  const handleLeagueChange = (updatedLeague: LeagueData) => {
    setLeagueData(updatedLeague);
    logger.log("League data updated:", updatedLeague);
  };

  const handleMatchesUpdate = (newMatches: Match[]) => {
    setMatches(newMatches);
    logger.log(`${newMatches.length} matches updated`);
  };

  const handleSave = () => {
    toast.success("League data saved successfully");
    // In a real app, we would call an API to save the data
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0a0f14] border border-white/5 shadow-lg">
      {/* Background blur effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative p-6">
        <div className="space-y-6 animate-fadeIn">
          {/* Header with back button and save button */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 gap-2"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Leagues
            </Button>
            
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
              onClick={handleSave}
            >
              Save League
            </Button>
          </div>
          
          {/* League details form */}
          <div className="bg-black/20 rounded-xl p-6 space-y-6 border border-white/5">
            <LeagueFormFields 
              league={leagueData}
              onChange={handleLeagueChange}
              errors={{}}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <CSVUploader 
                onMatchesUpdate={handleMatchesUpdate}
                onDataLoaded={() => {}} 
              />
              
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
          
          {/* Tabs section */}
          <LeagueTabsView 
            matches={matches} 
            league={leagueData}
            defaultTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
        
        {/* Top border gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        {/* Bottom border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default LeagueEditor;
