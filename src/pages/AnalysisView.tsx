
import { useState } from "react"
import { BarChart3, Lightbulb, Calendar, ChevronRight, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useLeagueState } from "@/hooks/useLeagueState"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for pattern analysis
const patternData = [
  { name: '1-0', frequency: 34 },
  { name: '2-0', frequency: 22 },
  { name: '2-1', frequency: 28 },
  { name: '1-1', frequency: 42 },
  { name: '0-0', frequency: 18 },
  { name: '3-2', frequency: 12 },
  { name: '3-0', frequency: 8 },
];

// Mock data for prediction accuracy
const predictionData = [
  { name: 'Week 1', actual: 68, predicted: 72 },
  { name: 'Week 2', actual: 72, predicted: 70 },
  { name: 'Week 3', actual: 60, predicted: 64 },
  { name: 'Week 4', actual: 78, predicted: 75 },
  { name: 'Week 5', actual: 82, predicted: 80 },
  { name: 'Week 6', actual: 74, predicted: 72 },
];

// Mock match schedule data
const scheduleData = [
  { id: '1', date: '2023-11-05', homeTeam: 'Manchester United', awayTeam: 'Arsenal', predictedScore: '2-1' },
  { id: '2', date: '2023-11-06', homeTeam: 'Liverpool', awayTeam: 'Chelsea', predictedScore: '1-1' },
  { id: '3', date: '2023-11-12', homeTeam: 'Manchester City', awayTeam: 'Tottenham', predictedScore: '3-1' },
  { id: '4', date: '2023-11-13', homeTeam: 'Newcastle', awayTeam: 'Everton', predictedScore: '2-0' },
];

export function AnalysisView() {
  const [activeTab, setActiveTab] = useState("pattern-analysis")
  const [selectedLeague, setSelectedLeague] = useState<string>("premier-league")
  const [selectedSeason, setSelectedSeason] = useState<string>("2023-2024")
  const { navigate } = useLeagueState()
  const { toast } = useToast()

  const handleAdvancedPatternClick = () => {
    navigate("advanced-pattern")
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Match Analysis</h2>
          <p className="text-gray-400">View patterns, predictions and upcoming schedule</p>
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
            value="pattern-analysis"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Pattern Analysis
          </TabsTrigger>
          <TabsTrigger
            value="prediction-engine"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Prediction Engine
          </TabsTrigger>
          <TabsTrigger
            value="match-schedule"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Match Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pattern-analysis" className="mt-6 space-y-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">Score Pattern Distribution</CardTitle>
                  <CardDescription>Most common scorelines in {selectedLeague.replace('-', ' ')}</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                  onClick={handleAdvancedPatternClick}
                >
                  Advanced Pattern Detection
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={patternData}
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
                    <Bar dataKey="frequency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Home vs Away Goals</CardTitle>
                <CardDescription>Average goals scored by home and away teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-around py-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">1.8</p>
                    <p className="text-sm text-gray-400 mt-1">Home Goals per Game</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-400">1.2</p>
                    <p className="text-sm text-gray-400 mt-1">Away Goals per Game</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Match Outcomes</CardTitle>
                <CardDescription>Percentage of home wins, away wins and draws</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-around py-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">42%</p>
                    <p className="text-sm text-gray-400 mt-1">Home Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400">28%</p>
                    <p className="text-sm text-gray-400 mt-1">Draws</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-400">30%</p>
                    <p className="text-sm text-gray-400 mt-1">Away Wins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prediction-engine" className="mt-6 space-y-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Prediction Accuracy Over Time</CardTitle>
              <CardDescription>Comparing predicted vs. actual results week by week</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={predictionData}
                    margin={{
                      top: 20,
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
                    <Bar dataKey="actual" name="Actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="predicted" name="Predicted" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Overall Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-5xl font-bold text-blue-400">76%</p>
                  <p className="text-sm text-gray-400 mt-3">Prediction success rate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Confidence Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-5xl font-bold text-emerald-400">High</p>
                  <p className="text-sm text-gray-400 mt-3">Based on 248 matches</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Variance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-5xl font-bold text-amber-400">±8%</p>
                  <p className="text-sm text-gray-400 mt-3">Average deviation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="match-schedule" className="mt-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Upcoming Matches</h3>
              <p className="text-sm text-gray-400">With predicted outcomes based on our analysis</p>
            </div>
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 mt-2 md:mt-0">
              Filter Matches
            </Button>
          </div>

          <div className="space-y-4">
            {scheduleData.map((match) => (
              <Card key={match.id} className="bg-black/20 border-white/5">
                <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                  <div className="flex items-center gap-4 mb-3 md:mb-0">
                    <div className="bg-black/40 px-3 py-2 rounded-lg text-sm text-gray-300">
                      {match.date}
                    </div>
                    <div className="text-center md:text-left">
                      <p className="font-medium text-white">{match.homeTeam}</p>
                      <p className="text-sm text-gray-400">vs</p>
                      <p className="font-medium text-white">{match.awayTeam}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Predicted Score</p>
                      <p className="text-xl font-bold text-blue-400">{match.predictedScore}</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
