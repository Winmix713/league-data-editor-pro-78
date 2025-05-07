
import { useState } from "react"
import { ArrowLeft, Maximize2, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { useLeagueState } from "@/hooks/league"
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts'

// Mock data for pattern visualization
const patternData = Array.from({ length: 20 }, (_, i) => ({
  name: `Week ${i + 1}`,
  homeGoals: Math.floor(Math.random() * 3) + 1,
  awayGoals: Math.floor(Math.random() * 2),
  draws: Math.random() > 0.7 ? 1 : 0,
}));

// Mock data for correlations
const correlationData = Array.from({ length: 20 }, (_, i) => ({
  x: Math.floor(Math.random() * 100),
  y: Math.floor(Math.random() * 100),
  z: Math.random() * 500 + 100,
  name: `Metric ${i + 1}`,
}));

// Mock pattern metrics
const patternMetrics = [
  { name: 'Home Win After Loss', value: '68%', trend: 'up' },
  { name: 'Away Win Following Draw', value: '42%', trend: 'down' },
  { name: 'Goals After 75th Min', value: '1.4/game', trend: 'up' },
  { name: 'Comeback From 0-1', value: '23%', trend: 'same' },
  { name: 'Clean Sheets At Home', value: '31%', trend: 'up' },
  { name: 'Both Teams Score', value: '58%', trend: 'up' },
];

export function AdvancedPatternView() {
  const [complexityLevel, setComplexityLevel] = useState([50])
  const [selectedFilter, setSelectedFilter] = useState("all-games")
  const [activeTab, setActiveTab] = useState("patterns")
  const { goBack } = useLeagueState()
  const { toast } = useToast()

  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Advanced pattern analysis report is being generated.",
    })
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 mr-4"
            onClick={goBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">Advanced Pattern Detection</h2>
            <p className="text-gray-400">Detailed statistical analysis of match patterns</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
          onClick={handleExport}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Analysis
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Analysis Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Complexity Level</label>
                <Slider
                  value={complexityLevel}
                  onValueChange={setComplexityLevel}
                  max={100}
                  step={10}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Simple</span>
                  <span>Complex</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Game Filter</label>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Filter games" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-games">All Games</SelectItem>
                    <SelectItem value="home-wins">Home Wins</SelectItem>
                    <SelectItem value="away-wins">Away Wins</SelectItem>
                    <SelectItem value="draws">Draws</SelectItem>
                    <SelectItem value="high-scoring">High Scoring (3+)</SelectItem>
                    <SelectItem value="low-scoring">Low Scoring (0-2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Time Period</label>
                <Select defaultValue="season">
                  <SelectTrigger className="bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="season">Full Season</SelectItem>
                    <SelectItem value="last-10">Last 10 Games</SelectItem>
                    <SelectItem value="last-5">Last 5 Games</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Filter className="h-4 w-4" /> Apply Filters
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Key Pattern Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patternMetrics.map((metric, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${
                        metric.trend === 'up' ? 'text-emerald-400' : 
                        metric.trend === 'down' ? 'text-red-400' : 
                        'text-amber-400'
                      }`}>{metric.value}</span>
                      <span className={`text-xs ${
                        metric.trend === 'up' ? 'text-emerald-400' : 
                        metric.trend === 'down' ? 'text-red-400' : 
                        'text-amber-400'
                      }`}>
                        {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl">
              <TabsTrigger
                value="patterns"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Pattern Visualization
              </TabsTrigger>
              <TabsTrigger
                value="correlations"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Statistical Correlations
              </TabsTrigger>
              <TabsTrigger
                value="predictions"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Advanced Predictions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patterns" className="mt-6 space-y-6">
              <Card className="bg-black/20 border-white/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-white text-lg">Goal Distribution Patterns</CardTitle>
                    <CardDescription>Analysis of scoring patterns throughout the season</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={patternData}
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
                        <Legend />
                        <Bar dataKey="homeGoals" name="Home Goals" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="awayGoals" name="Away Goals" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="draws" name="Draws" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/20 border-white/5">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Scoring Trends Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
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

                <Card className="bg-black/20 border-white/5">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Pattern Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-black/30 rounded-lg">
                        <h4 className="font-medium text-blue-400 mb-2">Key Findings</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li>• Home teams score 1.6x more goals in the first half compared to away teams</li>
                          <li>• Away team scoring increases by 35% in the last 15 minutes</li>
                          <li>• Teams that score first win 68% of matches</li>
                          <li>• Draw probability increases by 40% in high-stakes matches</li>
                          <li>• Clean sheet probability increases by 22% for teams in top positions</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2">Pattern Confidence Level</h4>
                        <div className="w-full bg-black/30 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>Based on 248 matches</span>
                          <span>78% confidence</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="correlations" className="mt-6 space-y-6">
              <Card className="bg-black/20 border-white/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-white text-lg">Statistical Correlations</CardTitle>
                    <CardDescription>Relationship between various match factors</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{
                          top: 20,
                          right: 20,
                          bottom: 20,
                          left: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis type="number" dataKey="x" name="Factor 1" stroke="#888" />
                        <YAxis type="number" dataKey="y" name="Factor 2" stroke="#888" />
                        <ZAxis type="number" dataKey="z" range={[100, 600]} name="Correlation" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value, name, props) => [value, name]}
                        />
                        <Legend />
                        <Scatter name="Statistical Correlations" data={correlationData} fill="#8884d8" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/20 border-white/5">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Correlation Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Possession vs Goals</span>
                        <span className="font-medium text-blue-400">0.62</span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <span className="text-gray-300">Shots on Target vs Goals</span>
                        <span className="font-medium text-blue-400">0.78</span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <span className="text-gray-300">Team Form vs Result</span>
                        <span className="font-medium text-blue-400">0.71</span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '71%' }}></div>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <span className="text-gray-300">Home Advantage vs Win</span>
                        <span className="font-medium text-blue-400">0.58</span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '58%' }}></div>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <span className="text-gray-300">Team Ranking vs Goals</span>
                        <span className="font-medium text-blue-400">0.46</span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '46%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/20 border-white/5">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Statistical Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <h4 className="font-medium text-emerald-400 mb-2">Strong Correlations</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Shots on target has a 78% correlation with goals scored</li>
                        <li>• Team form has a 71% correlation with match result</li>
                        <li>• Possession has a 62% correlation with goals scored</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <h4 className="font-medium text-amber-400 mb-2">Moderate Correlations</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Home advantage has a 58% correlation with wins</li>
                        <li>• Team ranking has a 46% correlation with goals scored</li>
                      </ul>
                    </div>
                    
                    <div className="text-sm text-gray-400 mt-3">
                      <p>Correlation coefficient ranges from 0 (no correlation) to 1 (perfect correlation).</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="predictions" className="mt-6">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-black/20 border-white/5">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Advanced Prediction Model</CardTitle>
                    <CardDescription>Pattern-based forecasting for upcoming matches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-5 bg-black/30 rounded-lg border border-white/5 mb-6">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-medium text-white">Manchester United vs Liverpool</h3>
                        <p className="text-gray-400">Upcoming Match | Premier League</p>
                      </div>
                      
                      <div className="flex justify-center mb-6">
                        <div className="w-32 text-center">
                          <div className="text-3xl font-bold text-blue-400">2</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Predicted</div>
                          <div className="text-sm text-gray-300">Manchester United</div>
                        </div>
                        <div className="w-12 flex items-center justify-center">
                          <div className="text-2xl font-bold text-gray-500">:</div>
                        </div>
                        <div className="w-32 text-center">
                          <div className="text-3xl font-bold text-blue-400">1</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Predicted</div>
                          <div className="text-sm text-gray-300">Liverpool</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-black/20 rounded-lg">
                          <div className="text-sm text-gray-400">Win Probability</div>
                          <div className="text-lg font-bold text-emerald-400">58%</div>
                          <div className="text-xs text-gray-500">Man United</div>
                        </div>
                        <div className="text-center p-3 bg-black/20 rounded-lg">
                          <div className="text-sm text-gray-400">Draw Probability</div>
                          <div className="text-lg font-bold text-amber-400">24%</div>
                        </div>
                        <div className="text-center p-3 bg-black/20 rounded-lg">
                          <div className="text-sm text-gray-400">Win Probability</div>
                          <div className="text-lg font-bold text-red-400">18%</div>
                          <div className="text-xs text-gray-500">Liverpool</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Key Prediction Factors</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-black/20 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Home Advantage</span>
                            <span className="text-sm font-medium text-emerald-400">Strong</span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-1.5">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-black/20 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Current Form</span>
                            <span className="text-sm font-medium text-emerald-400">Very Good</span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-1.5">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-black/20 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Historical Matchups</span>
                            <span className="text-sm font-medium text-amber-400">Mixed</span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-1.5">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-black/20 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Key Player Impact</span>
                            <span className="text-sm font-medium text-emerald-400">Significant</span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-1.5">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
