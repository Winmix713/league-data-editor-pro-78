
import { memo } from "react"
import { BarChart3, TrendingUp } from "lucide-react"
import { MatchPredictionPanel } from "@/components/predictions/MatchPredictionPanel"
import { useLeagueState } from "@/hooks/league"

export const PredictionsView = memo(() => {
  const { currentMatches } = useLeagueState()
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Match Predictions</h2>
          <p className="text-gray-400">
            Use historical data to predict match outcomes
          </p>
        </div>
        
        <div className="hidden md:flex items-center space-x-1 bg-black/20 p-2 rounded-lg border border-white/5">
          <BarChart3 className="h-4 w-4 text-blue-400" />
          <span className="text-sm text-white">Prediction Engine</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main prediction panel */}
        <div className="lg:col-span-2">
          <MatchPredictionPanel matches={currentMatches} />
        </div>
        
        {/* Sidebar with recent predictions and insights */}
        <div className="space-y-6">
          <div className="bg-black/20 border-white/5 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-medium text-white">Prediction Insights</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <p className="text-sm text-gray-400">Predictions are based on:</p>
                <ul className="text-sm mt-2 space-y-1 pl-5 list-disc">
                  <li>Historical match data</li>
                  <li>Team performance trends</li>
                  <li>Head-to-head records</li>
                  <li>Home/away form analysis</li>
                </ul>
              </div>
              
              <p className="text-xs text-gray-500">
                Prediction accuracy improves with more available match data. Upload multiple seasons
                of match data to increase prediction confidence.
              </p>
            </div>
          </div>
          
          <div className="bg-black/20 border-white/5 rounded-xl p-5">
            <h3 className="font-medium text-white mb-3">Most Accurate Predictions</h3>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-2 bg-black/30 rounded-md border border-white/5">
                  <div className="text-sm">
                    <span className="text-blue-400">Team {i}A</span>
                    <span className="mx-1 text-gray-500">vs</span>
                    <span className="text-blue-400">Team {i}B</span>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                    {90 - i * 5}% accurate
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

PredictionsView.displayName = "PredictionsView"
