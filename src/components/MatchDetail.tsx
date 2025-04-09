
import React, { useState } from 'react';
import {
  ChevronDown,
  User,
  Clock,
  Footprints,
  AlertCircle, // Replacing Whistle with AlertCircle
  Award,
  PieChart,
  BarChart3,
  Target,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface MatchEvent {
  id: number;
  type: 'goal' | 'yellowCard' | 'redCard' | 'substitution';
  team: 'home' | 'away';
  player: string;
  minute: number;
  additionalInfo?: string;
}

interface PlayerStat {
  id: number;
  name: string;
  position: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
}

interface MatchDetailProps {
  match: any; // Replace with your match type
  isOpen: boolean;
  onClose: () => void;
}

const MatchDetail: React.FC<MatchDetailProps> = ({ match, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("events");
  
  // Mock data for the match events timeline
  const events: MatchEvent[] = [
    { id: 1, type: 'goal', team: 'home', player: 'John Smith', minute: 23, additionalInfo: 'Header from corner' },
    { id: 2, type: 'yellowCard', team: 'away', player: 'Michael Johnson', minute: 37 },
    { id: 3, type: 'goal', team: 'away', player: 'Michael Johnson', minute: 45, additionalInfo: 'Penalty' },
    { id: 4, type: 'substitution', team: 'home', player: 'Robert Brown', minute: 46, additionalInfo: 'Sam Wilson' },
    { id: 5, type: 'redCard', team: 'away', player: 'William Davis', minute: 67 },
    { id: 6, type: 'goal', team: 'home', player: 'David Martinez', minute: 78, additionalInfo: 'Free kick' },
    { id: 7, type: 'goal', team: 'home', player: 'Sam Wilson', minute: 89, additionalInfo: 'Counter-attack' },
  ];

  // Mock data for player statistics
  const homeTeamPlayers: PlayerStat[] = [
    { id: 1, name: 'John Smith', position: 'FW', goals: 1, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 },
    { id: 2, name: 'David Martinez', position: 'MF', goals: 1, assists: 1, yellowCards: 1, redCards: 0, minutesPlayed: 90 },
    { id: 3, name: 'Robert Brown', position: 'DF', goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 45 },
    { id: 4, name: 'Sam Wilson', position: 'FW', goals: 1, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 45 },
  ];

  const awayTeamPlayers: PlayerStat[] = [
    { id: 1, name: 'Michael Johnson', position: 'FW', goals: 1, assists: 0, yellowCards: 1, redCards: 0, minutesPlayed: 90 },
    { id: 2, name: 'William Davis', position: 'DF', goals: 0, assists: 0, yellowCards: 1, redCards: 1, minutesPlayed: 67 },
    { id: 3, name: 'James Wilson', position: 'MF', goals: 0, assists: 1, yellowCards: 0, redCards: 0, minutesPlayed: 90 },
  ];

  // Function to get the event icon
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return <Target className="h-4 w-4 text-emerald-500" />;
      case 'yellowCard':
        return <div className="w-3 h-4 bg-yellow-500 rounded-sm"></div>;
      case 'redCard':
        return <div className="w-3 h-4 bg-red-500 rounded-sm"></div>;
      case 'substitution':
        return <Footprints className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  // If match data is not available
  if (!match) {
    return null;
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border-white/10 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Match Details</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* Match Summary */}
        <div className="bg-black/20 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 rounded-full mb-2"></div>
              <span className="font-semibold text-center">{match.homeTeam?.name || 'Home Team'}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <span>{match.homeScore || 3}</span>
                <span>:</span>
                <span>{match.awayScore || 1}</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">(HT: {match.halfTimeScore || '1:1'})</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 rounded-full mb-2"></div>
              <span className="font-semibold text-center">{match.awayTeam?.name || 'Away Team'}</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{match.date || '2023-04-15'}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              <span>{match.referee || 'John Referee'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>{match.league?.name || 'Premier League'}</span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 bg-muted/50 w-full rounded-md mb-4">
            <TabsTrigger value="events" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Events
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="lineups" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Lineups
            </TabsTrigger>
          </TabsList>

          {/* Events Tab Content */}
          <TabsContent value="events" className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Match Timeline
            </h3>
            
            <div className="space-y-2">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className={`flex items-center p-3 rounded-md ${event.team === 'home' ? 'bg-blue-500/10' : 'bg-red-500/10'}`}
                >
                  <div className="w-12 text-center font-bold">{event.minute}'</div>
                  <div className="mx-2">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold">{event.player}</div>
                    {event.additionalInfo && (
                      <div className="text-sm text-gray-400">{event.additionalInfo}</div>
                    )}
                  </div>
                  <div className={`text-sm ${event.team === 'home' ? 'text-blue-400' : 'text-red-400'}`}>
                    {event.team === 'home' ? match.homeTeam?.name || 'Home Team' : match.awayTeam?.name || 'Away Team'}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Stats Tab Content */}
          <TabsContent value="stats" className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <PieChart className="h-4 w-4 text-blue-500" />
              Match Statistics
            </h3>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center font-semibold">{match.homeTeam?.name || 'Home Team'}</div>
              <div className="text-center text-gray-400">Statistics</div>
              <div className="text-center font-semibold">{match.awayTeam?.name || 'Away Team'}</div>
              
              {/* Possession */}
              <div className="text-center text-lg">55%</div>
              <div className="text-center text-sm text-gray-400">Possession</div>
              <div className="text-center text-lg">45%</div>
              
              {/* Shots */}
              <div className="text-center">14</div>
              <div className="text-center text-sm text-gray-400">Shots</div>
              <div className="text-center">9</div>
              
              {/* Shots on Target */}
              <div className="text-center">7</div>
              <div className="text-center text-sm text-gray-400">Shots on Target</div>
              <div className="text-center">3</div>
              
              {/* Corners */}
              <div className="text-center">8</div>
              <div className="text-center text-sm text-gray-400">Corners</div>
              <div className="text-center">5</div>
              
              {/* Fouls */}
              <div className="text-center">12</div>
              <div className="text-center text-sm text-gray-400">Fouls</div>
              <div className="text-center">14</div>
              
              {/* Yellow Cards */}
              <div className="text-center">1</div>
              <div className="text-center text-sm text-gray-400">Yellow Cards</div>
              <div className="text-center">2</div>
              
              {/* Red Cards */}
              <div className="text-center">0</div>
              <div className="text-center text-sm text-gray-400">Red Cards</div>
              <div className="text-center">1</div>
            </div>
          </TabsContent>

          {/* Lineups Tab Content */}
          <TabsContent value="lineups" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Home Team */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-500" />
                  {match.homeTeam?.name || 'Home Team'}
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-white/10">
                      <th className="p-2">Player</th>
                      <th className="p-2 text-center">Pos</th>
                      <th className="p-2 text-center">G</th>
                      <th className="p-2 text-center">A</th>
                      <th className="p-2 text-center">Min</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homeTeamPlayers.map(player => (
                      <tr key={player.id} className="border-b border-white/5">
                        <td className="p-2 font-medium">{player.name}</td>
                        <td className="p-2 text-center">{player.position}</td>
                        <td className="p-2 text-center">{player.goals}</td>
                        <td className="p-2 text-center">{player.assists}</td>
                        <td className="p-2 text-center">{player.minutesPlayed}'</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Away Team */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-red-500" />
                  {match.awayTeam?.name || 'Away Team'}
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-white/10">
                      <th className="p-2">Player</th>
                      <th className="p-2 text-center">Pos</th>
                      <th className="p-2 text-center">G</th>
                      <th className="p-2 text-center">A</th>
                      <th className="p-2 text-center">Min</th>
                    </tr>
                  </thead>
                  <tbody>
                    {awayTeamPlayers.map(player => (
                      <tr key={player.id} className="border-b border-white/5">
                        <td className="p-2 font-medium">{player.name}</td>
                        <td className="p-2 text-center">{player.position}</td>
                        <td className="p-2 text-center">{player.goals}</td>
                        <td className="p-2 text-center">{player.assists}</td>
                        <td className="p-2 text-center">{player.minutesPlayed}'</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MatchDetail;
