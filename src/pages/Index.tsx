
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import LeagueTable from '@/components/LeagueTable';
import LeagueEditor from '@/components/LeagueEditor';
import { League } from '@/components/LeagueTable';
import { toast } from "sonner";

// Mock data for initial leagues
const mockLeagues: League[] = [
  {
    id: '1',
    name: 'Premier League',
    season: '2023-2024',
    winner: '',
    secondPlace: '',
    thirdPlace: '',
    status: 'active'
  },
  {
    id: '2',
    name: 'La Liga',
    season: '2023-2024',
    winner: '',
    secondPlace: '',
    thirdPlace: '',
    status: 'active'
  },
  {
    id: '3',
    name: 'Bundesliga',
    season: '2023-2024',
    winner: '',
    secondPlace: '',
    thirdPlace: '',
    status: 'active'
  },
  {
    id: '4',
    name: 'Serie A',
    season: '2022-2023',
    winner: 'Napoli',
    secondPlace: 'Lazio',
    thirdPlace: 'Inter Milan',
    status: 'completed'
  }
];

const Index = () => {
  const [leagues, setLeagues] = useState<League[]>(mockLeagues);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentLeague, setCurrentLeague] = useState<League | null>(null);

  const filteredLeagues = leagues.filter(
    league => league.name.toLowerCase().includes(search.toLowerCase()) ||
              league.season.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCreateLeague = () => {
    setCurrentLeague(null);
    setIsEditing(true);
  };

  const handleEditLeague = (id: string) => {
    const league = leagues.find(l => l.id === id);
    if (league) {
      setCurrentLeague(league);
      setIsEditing(true);
    }
  };

  const handleViewLeague = (id: string) => {
    toast.info(`Viewing league ${id} - Statistics functionality coming soon!`);
  };

  const handleDeleteLeague = (id: string) => {
    setLeagues(prev => prev.filter(league => league.id !== id));
  };

  const handleBack = () => {
    setIsEditing(false);
    setCurrentLeague(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="container mx-auto max-w-7xl">
        {!isEditing ? (
          <>
            <Header 
              title="Leagues & Matches" 
              description="Create and manage leagues, upload match data, and view statistics" 
              onCreateNew={handleCreateLeague}
              createButtonText="New League"
            />
            
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
                  leagues={filteredLeagues} 
                  onEditLeague={handleEditLeague}
                  onViewLeague={handleViewLeague}
                  onDeleteLeague={handleDeleteLeague}
                />
              </div>
            </div>
          </>
        ) : (
          <LeagueEditor 
            onBack={handleBack}
            league={currentLeague ? { name: currentLeague.name, season: currentLeague.season } : undefined}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
