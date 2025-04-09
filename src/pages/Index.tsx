import React, { useState } from 'react';
import { Header } from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import { LeagueTable } from '@/components/LeagueTable';
import { LeagueDetails } from '@/components/LeagueDetails';
import { NewLeagueModal } from '@/components/NewLeagueModal';
import type { Match } from '@/types';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { calculateStandings } from '@/utils/calculations';

// Define a custom League type for this page
interface League {
  id: string;
  name: string;
  season: string;
  teams: any[];
  matches: Match[];
  status: 'active' | 'completed';
}

// Mock data for initial leagues
const mockLeagues: League[] = [
  {
    id: '1',
    name: 'Premier League',
    season: '2023-2024',
    teams: [],
    matches: [],
    status: 'active'
  },
  {
    id: '2',
    name: 'La Liga',
    season: '2023-2024',
    teams: [],
    matches: [],
    status: 'active'
  },
  {
    id: '3',
    name: 'Bundesliga',
    season: '2023-2024',
    teams: [],
    matches: [],
    status: 'active'
  },
  {
    id: '4',
    name: 'Serie A',
    season: '2022-2023',
    teams: [],
    matches: [],
    status: 'completed'
  }
];

const Index = () => {
  const [leagues, setLeagues] = useState<League[]>(mockLeagues);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeagueId, setCurrentLeagueId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');

  const currentLeague = currentLeagueId 
    ? leagues.find(league => league.id === currentLeagueId) 
    : null;

  const filteredLeagues = leagues.filter(
    league => league.name.toLowerCase().includes(search.toLowerCase()) ||
              league.season.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchTerm = (term: string) => {
    setSearch(term);
  };

  const handleCreateLeague = () => {
    setCurrentLeagueId(null);
    setIsModalOpen(true);
  };

  const handleEditLeague = (id: string) => {
    setCurrentLeagueId(id);
    setIsModalOpen(true);
  };

  const handleViewLeague = (id: string) => {
    setCurrentLeagueId(id);
    setViewMode('details');
  };

  const handleDeleteLeague = (id: string) => {
    setLeagues(prev => prev.filter(league => league.id !== id));
  };

  const handleBack = () => {
    setViewMode('list');
    setCurrentLeagueId(null);
  };

  const handleSubmitLeague = (data: { name: string, season: string, matches: Match[] }) => {
    if (currentLeagueId) {
      // Edit existing league
      setLeagues(prev => prev.map(league => {
        if (league.id === currentLeagueId) {
          const teamNames = [...new Set(data.matches.flatMap(m => [m.home_team, m.away_team]))];
          const teams = calculateStandings(data.matches);
          
          return {
            ...league,
            name: data.name,
            season: data.season,
            teams,
            matches: data.matches
          };
        }
        return league;
      }));
      toast.success("League updated successfully");
    } else {
      // Create new league
      const teamNames = [...new Set(data.matches.flatMap(m => [m.home_team, m.away_team]))];
      const teams = calculateStandings(data.matches);
      
      const newLeague: League = {
        id: uuidv4(),
        name: data.name,
        season: data.season,
        teams,
        matches: data.matches,
        status: 'active'
      };
      
      setLeagues(prev => [newLeague, ...prev]);
      toast.success("League created successfully");
    }
    
    setIsModalOpen(false);
  };

  const handleUpdateMatch = (updatedMatch: Match) => {
    if (!currentLeagueId) return;
    
    setLeagues(prev => prev.map(league => {
      if (league.id === currentLeagueId) {
        // Since our Match type doesn't have an id, we'll need another way to identify it
        // For this example, we'll just use the updated matches as is
        const updatedMatches = [...league.matches, updatedMatch];
        
        const teams = calculateStandings(updatedMatches);
        
        return {
          ...league,
          teams,
          matches: updatedMatches
        };
      }
      return league;
    }));
    
    toast.success("Match result updated");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="container mx-auto max-w-7xl">
        {viewMode === 'list' ? (
          <>
            <Header currentSeason="2023-2024" />
            
            <div className="bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                  <div className="w-full max-w-md">
                    <SearchBar 
                      value={search}
                      onChange={handleSearchChange}
                      placeholder="Search leagues..."
                    />
                  </div>
                </div>
                
                <LeagueTable 
                  leagues={filteredLeagues.map(league => ({
                    id: league.id,
                    name: league.name,
                    season: league.season,
                    winner: "-",
                    secondPlace: "-", 
                    thirdPlace: "-",
                    status: league.status === 'completed' ? "Completed" : "In Progress"
                  }))} 
                  onLeagueAction={(id, action) => {
                    if (action === 'view') handleViewLeague(id);
                    else if (action === 'edit') handleEditLeague(id);
                    else if (action === 'delete') handleDeleteLeague(id);
                  }}
                  onSearch={handleSearchTerm}
                  onNewLeague={handleCreateLeague}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg p-6">
            {currentLeague && (
              <LeagueDetails 
                league={{
                  id: currentLeague.id,
                  name: currentLeague.name,
                  season: currentLeague.season,
                  winner: "-",
                  secondPlace: "-", 
                  thirdPlace: "-",
                  status: currentLeague.status === 'completed' ? "Completed" : "In Progress"
                }}
                matches={currentLeague.matches}
                onBack={handleBack}
                onUpdateLeague={() => {}} // Placeholder for now
                onUpdateMatches={() => {}} // Placeholder for now
              />
            )}
          </div>
        )}

        <NewLeagueModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateLeague={async (id) => {
            // Just a stub implementation to satisfy TypeScript
            return Promise.resolve();
          }}
        />
      </div>
    </div>
  );
};

export default Index;
