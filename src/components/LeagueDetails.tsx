
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StandingsTable from './StandingsTable';
import MatchesTable from './MatchesTable';
import { League, Match } from '@/types';
import { calculateStandings } from '@/utils/calculations';

interface LeagueDetailsProps {
  league: League;
  onBack: () => void;
  onUpdateMatch?: (match: Match) => void;
}

const LeagueDetails = ({ league, onBack, onUpdateMatch }: LeagueDetailsProps) => {
  const [activeTab, setActiveTab] = useState("standings");
  const teamNames = league.teams.map(team => team.name);
  const standings = calculateStandings(teamNames, league.matches);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button 
            variant="outline" 
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 flex items-center gap-2"
            onClick={onBack}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Leagues
          </Button>
        </div>
        
        <div className="text-right">
          <h1 className="text-white text-2xl font-bold">{league.name}</h1>
          <p className="text-gray-400">{league.season}</p>
        </div>
      </div>
      
      <Tabs 
        defaultValue="standings" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full bg-white/5 border-b border-white/10 rounded-none p-0">
          <TabsTrigger 
            value="standings"
            className="flex-1 rounded-none data-[state=active]:bg-white/10 data-[state=active]:shadow-none py-3"
          >
            Standings
          </TabsTrigger>
          <TabsTrigger 
            value="matches"
            className="flex-1 rounded-none data-[state=active]:bg-white/10 data-[state=active]:shadow-none py-3"
          >
            Matches
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="standings" className="mt-6">
          <StandingsTable teams={standings} />
        </TabsContent>
        
        <TabsContent value="matches" className="mt-6">
          <MatchesTable 
            matches={league.matches}
            onUpdateMatch={onUpdateMatch}
            editable={league.status === "active"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeagueDetails;
