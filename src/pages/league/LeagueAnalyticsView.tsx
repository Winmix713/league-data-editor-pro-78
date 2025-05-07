
import { memo } from "react"
import { BarChart3, Trophy, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const LeagueAnalyticsView = memo(() => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">League Analytics</h2>
        <Select defaultValue="premier-league-2023">
          <SelectTrigger className="w-[280px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Select league" />
          </SelectTrigger>
          <SelectContent className="bg-[#0a0f14] border-white/10 text-white">
            <SelectItem value="premier-league-2023">Premier League - 2023/24</SelectItem>
            <SelectItem value="la-liga-2023">La Liga - 2023/24</SelectItem>
            <SelectItem value="bundesliga-2023">Bundesliga - 2023/24</SelectItem>
            <SelectItem value="serie-a-2023">Serie A - 2023/24</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-black/20 border-white/5">
        <CardHeader className="pb-0">
          <CardTitle className="text-white">League Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl mb-6">
              <TabsTrigger
                value="general"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>General Stats</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="scorers"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span>Top Scorers</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="patterns"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Match Patterns</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium mb-4">General Statistics</h3>
                <p className="text-gray-400 mb-8">
                  Overview of key league statistics including goals per game, win/draw/loss ratios,
                  and team performance metrics.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                    <h4 className="text-gray-400 text-sm mb-2">Avg. Goals per Match</h4>
                    <p className="text-2xl font-bold text-white">2.7</p>
                    <div className="mt-2 text-xs text-gray-500">Based on 120 matches</div>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                    <h4 className="text-gray-400 text-sm mb-2">Home Win Percentage</h4>
                    <p className="text-2xl font-bold text-white">46%</p>
                    <div className="mt-2 text-xs text-gray-500">55 home wins</div>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                    <h4 className="text-gray-400 text-sm mb-2">Most Common Score</h4>
                    <p className="text-2xl font-bold text-white">1-0</p>
                    <div className="mt-2 text-xs text-gray-500">22 occurrences</div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <div className="text-center p-8 text-gray-500">
                    Detailed statistics charts will be implemented here
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="scorers">
              <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium mb-4">Top Scorers</h3>
                <p className="text-gray-400 mb-8">
                  Leading goal scorers in the league with detailed statistics and performance metrics.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-white/10">
                        <th className="p-3">#</th>
                        <th className="p-3">Player</th>
                        <th className="p-3">Team</th>
                        <th className="p-3 text-center">Goals</th>
                        <th className="p-3 text-center">Assists</th>
                        <th className="p-3 text-center">Matches</th>
                        <th className="p-3 text-center">Goals/Match</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-3 font-medium">{i}</td>
                          <td className="p-3">Player {i}</td>
                          <td className="p-3">Team {i}</td>
                          <td className="p-3 text-center">{20 - i * 2}</td>
                          <td className="p-3 text-center">{10 - i}</td>
                          <td className="p-3 text-center">20</td>
                          <td className="p-3 text-center">{((20 - i * 2) / 20).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="patterns">
              <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium mb-4">Match Patterns</h3>
                <p className="text-gray-400 mb-8">
                  Analysis of common match patterns, scorelines, and significant statistical trends.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                    <h4 className="text-white font-medium mb-4">Common Scorelines</h4>
                    <div className="space-y-3">
                      {[
                        { score: "1-0", percent: 70 },
                        { score: "2-1", percent: 60 },
                        { score: "0-0", percent: 45 },
                        { score: "2-0", percent: 35 },
                        { score: "1-1", percent: 30 },
                      ].map((item) => (
                        <div key={item.score}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.score}</span>
                            <span>{item.percent}%</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${item.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                    <h4 className="text-white font-medium mb-4">Goal Timing Patterns</h4>
                    <div className="mt-8 flex justify-center">
                      <div className="text-center p-8 text-gray-500">
                        Goal timing chart will be implemented here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
})

LeagueAnalyticsView.displayName = "LeagueAnalyticsView"
