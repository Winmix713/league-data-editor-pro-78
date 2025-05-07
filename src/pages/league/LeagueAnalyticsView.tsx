
import { useState } from "react"
import { PieChart as PieChartIcon, BarChart3, TrendingUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line, 
} from "recharts"

// Mock data for general stats
const generalStatsData = [
  { name: "Home Wins", value: 45 },
  { name: "Away Wins", value: 30 },
  { name: "Draws", value: 25 },
];

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b"];

// Mock data for top scorers
const topScorersData = [
  { name: "Harry Kane", team: "Bayern Munich", goals: 25, assists: 5 },
  { name: "Erling Haaland", team: "Manchester City", goals: 24, assists: 3 },
  { name: "Kylian Mbappé", team: "PSG", goals: 22, assists: 7 },
  { name: "Robert Lewandowski", team: "Barcelona", goals: 20, assists: 4 },
  { name: "Mohamed Salah", team: "Liverpool", goals: 19, assists: 8 },
  { name: "Lionel Messi", team: "Inter Miami", goals: 18, assists: 12 },
  { name: "Cristiano Ronaldo", team: "Al-Nassr", goals: 17, assists: 2 },
  { name: "Lautaro Martinez", team: "Inter Milan", goals: 16, assists: 3 },
];

// Mock data for match patterns
const matchPatternsData = [
  { name: "1 - 0", count: 32 },
  { name: "2 - 1", count: 28 },
  { name: "1 - 1", count: 24 },
  { name: "2 - 0", count: 18 },
  { name: "0 - 0", count: 15 },
  { name: "3 - 1", count: 12 },
  { name: "3 - 2", count: 9 },
  { name: "4 - 0", count: 8 },
];

// Mock data for goal timing
const goalTimingData = [
  { name: "0-15", homeGoals: 35, awayGoals: 20 },
  { name: "16-30", homeGoals: 42, awayGoals: 28 },
  { name: "31-45", homeGoals: 51, awayGoals: 30 },
  { name: "46-60", homeGoals: 38, awayGoals: 33 },
  { name: "61-75", homeGoals: 45, awayGoals: 38 },
  { name: "76-90", homeGoals: 58, awayGoals: 42 },
];

export function LeagueAnalyticsView() {
  const [activeTab, setActiveTab] = useState("general")
  const [selectedLeague, setSelectedLeague] = useState("premier-league")
  const [selectedSeason, setSelectedSeason] = useState("2023-2024")

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">League Analytics</h2>
          <p className="text-gray-400">Detailed statistics and analysis of league performance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={selectedLeague} onValueChange={setSelectedLeague}>
            <SelectTrigger className="bg-black/30 border-white/10 text-white w-full sm:w-[180px]">
              <SelectValue placeholder="Select League" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="premier-league">Premier League</SelectItem>
              <SelectItem value="la-liga">La Liga</SelectItem>
              <SelectItem value="bundesliga">Bundesliga</SelectItem>
              <SelectItem value="serie-a">Serie A</SelectItem>
              <SelectItem value="ligue-1">Ligue 1</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger className="bg-black/30 border-white/10 text-white w-full sm:w-[180px]">
              <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2022-2023">2022-2023</SelectItem>
              <SelectItem value="2021-2022">2021-2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl">
          <TabsTrigger
            value="general"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <PieChartIcon className="h-4 w-4 mr-2" />
            General Stats
          </TabsTrigger>
          <TabsTrigger
            value="top-scorers"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Top Scorers
          </TabsTrigger>
          <TabsTrigger
            value="match-patterns"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Match Patterns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Match Outcomes</CardTitle>
                <CardDescription>Distribution of home wins, away wins, and draws</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={generalStatsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {generalStatsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
                        formatter={(value, name) => [`${value} matches`, name]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Goal Timing Analysis</CardTitle>
                <CardDescription>When goals are scored throughout matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={goalTimingData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="homeGoals" 
                        name="Home Goals" 
                        stroke="#3b82f6" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="awayGoals" 
                        name="Away Goals" 
                        stroke="#ef4444" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Total Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-5xl font-bold text-blue-400">380</p>
                  <p className="text-sm text-gray-400 mt-3">League matches played</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Average Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-5xl font-bold text-blue-400">2.8</p>
                  <p className="text-sm text-gray-400 mt-3">Goals per match</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Clean Sheets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-5xl font-bold text-blue-400">95</p>
                  <p className="text-sm text-gray-400 mt-3">Total clean sheets</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="top-scorers" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Top Goal Scorers</CardTitle>
              <CardDescription>Leading goal scorers in the {selectedLeague.replace('-', ' ')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topScorersData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                    <XAxis type="number" stroke="#888" />
                    <YAxis dataKey="name" type="category" stroke="#888" width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
                      formatter={(value, name, props) => [`${value} ${name}`, props.payload.team]}
                    />
                    <Legend />
                    <Bar dataKey="goals" name="Goals" fill="#3b82f6" barSize={20} radius={[0, 4, 4, 0]} />
                    <Bar dataKey="assists" name="Assists" fill="#10b981" barSize={20} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-4">Player Statistics</h4>
                <div className="overflow-x-auto rounded-lg bg-black/20 border border-white/5">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-black/40">
                      <tr>
                        <th className="px-6 py-3">Player</th>
                        <th className="px-6 py-3">Team</th>
                        <th className="px-6 py-3 text-center">Goals</th>
                        <th className="px-6 py-3 text-center">Assists</th>
                        <th className="px-6 py-3 text-center">G+A</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topScorersData.map((player, index) => (
                        <tr key={player.name} className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">{player.name}</td>
                          <td className="px-6 py-4 text-gray-300">{player.team}</td>
                          <td className="px-6 py-4 text-center font-bold text-blue-400">{player.goals}</td>
                          <td className="px-6 py-4 text-center font-medium text-emerald-400">{player.assists}</td>
                          <td className="px-6 py-4 text-center">{player.goals + player.assists}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="match-patterns" className="mt-6 space-y-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Common Match Scorelines</CardTitle>
              <CardDescription>Most frequent final scores in the league</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={matchPatternsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
                      formatter={(value, name, props) => [`${value} matches`, props.payload.name]}
                    />
                    <Bar dataKey="count" name="Frequency" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Scoring Patterns</CardTitle>
                <CardDescription>How teams score throughout the league</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">Teams scoring first win</span>
                      <span className="text-blue-400 font-medium">71%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '71%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">Comebacks from losing position</span>
                      <span className="text-blue-400 font-medium">18%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">Clean sheets</span>
                      <span className="text-blue-400 font-medium">25%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">Both teams score</span>
                      <span className="text-blue-400 font-medium">58%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">Matches with over 2.5 goals</span>
                      <span className="text-blue-400 font-medium">63%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '63%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Match Insights</CardTitle>
                <CardDescription>Key trends from match data analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-medium text-blue-400 mb-2">Home Advantage</h4>
                  <p className="text-sm text-gray-300">Home teams win 45% of matches, compared to 30% for away teams, showing a significant home advantage factor.</p>
                </div>
                
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-medium text-emerald-400 mb-2">Second Half Goals</h4>
                  <p className="text-sm text-gray-300">57% of all goals are scored in the second half, with the highest frequency coming in the final 15 minutes.</p>
                </div>
                
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <h4 className="font-medium text-amber-400 mb-2">Goal Distribution</h4>
                  <p className="text-sm text-gray-300">The most common scoreline is 1-0 (32 matches), followed by 2-1 (28 matches) and 1-1 (24 matches).</p>
                </div>
                
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-medium text-purple-400 mb-2">Seasonal Trends</h4>
                  <p className="text-sm text-gray-300">Teams in the top half of the table average 1.8 goals per game, while bottom half teams average 0.9 goals.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
