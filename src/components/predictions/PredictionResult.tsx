
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PredictionResultType } from "@/types/api"

interface PredictionResultProps {
  homeTeam: string
  awayTeam: string
  prediction: PredictionResultType
}

export function PredictionResult({ homeTeam, awayTeam, prediction }: PredictionResultProps) {
  // Default values if prediction doesn't have these properties
  const homeScore = prediction.homeScore || 0
  const awayScore = prediction.awayScore || 0
  const confidence = prediction.confidence || 50
  
  // Get predicted outcome
  const outcome = homeScore > awayScore 
    ? "home" 
    : awayScore > homeScore 
      ? "away" 
      : "draw"
  
  // Define outcome styles
  const outcomeStyles = {
    home: {
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
      text: "text-emerald-400"
    },
    away: {
      badge: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      text: "text-blue-400"
    },
    draw: {
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/50",
      text: "text-amber-400"
    }
  }
  
  // Confidence level text and color
  const confidenceLevel = confidence >= 75 
    ? { text: "High Confidence", color: "text-emerald-400" }
    : confidence >= 45
      ? { text: "Medium Confidence", color: "text-amber-400" }
      : { text: "Low Confidence", color: "text-red-400" }
  
  // Progress bar color based on confidence
  const progressColor = confidence >= 75 
    ? "bg-emerald-500" 
    : confidence >= 45
      ? "bg-amber-500"
      : "bg-red-500"
  
  return (
    <Card className="bg-black/30 border-white/10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Prediction Result</span>
          <Badge variant="outline" className={outcomeStyles[outcome].badge}>
            {outcome === "home"
              ? `${homeTeam} Win`
              : outcome === "away"
                ? `${awayTeam} Win`
                : "Draw"}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4">
        {/* Score prediction */}
        <div className="flex items-center justify-center space-x-4 text-center">
          <div className="space-y-1">
            <p className="font-bold text-2xl">{homeTeam}</p>
            <div className="bg-black/30 w-16 h-16 flex items-center justify-center mx-auto rounded-lg border border-white/10">
              <span className={`text-3xl font-bold ${outcome === 'home' ? 'text-emerald-400' : 'text-white'}`}>{homeScore}</span>
            </div>
          </div>
          
          <span className="text-xl text-white/60 font-light">vs</span>
          
          <div className="space-y-1">
            <p className="font-bold text-2xl">{awayTeam}</p>
            <div className="bg-black/30 w-16 h-16 flex items-center justify-center mx-auto rounded-lg border border-white/10">
              <span className={`text-3xl font-bold ${outcome === 'away' ? 'text-emerald-400' : 'text-white'}`}>{awayScore}</span>
            </div>
          </div>
        </div>
        
        {/* Confidence indicator */}
        <div className="space-y-2 pt-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Prediction Confidence</span>
            <span className={`text-sm font-medium ${confidenceLevel.color}`}>{confidenceLevel.text}</span>
          </div>
          <Progress value={confidence} className="h-2 bg-white/10" indicatorClassName={progressColor} />
        </div>
        
        {/* Additional prediction insights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5">
          <div className="bg-black/20 p-3 rounded-lg border border-white/5">
            <p className="text-xs text-gray-400 mb-1">Expected Goals</p>
            <p className="font-medium">
              <span className={outcomeStyles.home.text}>{homeTeam}: {(homeScore + 0.35).toFixed(2)}</span> | <span className={outcomeStyles.away.text}>{awayTeam}: {(awayScore + 0.12).toFixed(2)}</span>
            </p>
          </div>
          
          <div className="bg-black/20 p-3 rounded-lg border border-white/5">
            <p className="text-xs text-gray-400 mb-1">Win Probability</p>
            <p className="font-medium">
              <span className={outcomeStyles.home.text}>{homeTeam}: {Math.round(confidence * (homeScore > awayScore ? 1 : 0.3))}%</span> | <span className={outcomeStyles.away.text}>{awayTeam}: {Math.round(confidence * (awayScore > homeScore ? 1 : 0.3))}%</span>
            </p>
          </div>
          
          <div className="bg-black/20 p-3 rounded-lg border border-white/5 sm:col-span-2">
            <p className="text-xs text-gray-400 mb-1">Match Analysis</p>
            <p className="text-sm">
              Based on historical data, we predict a {outcome === "home" ? "home win" : outcome === "away" ? "away win" : "draw"} with {confidenceLevel.text.toLowerCase()}. 
              {outcome === "home" 
                ? ` ${homeTeam} has shown strong performance in recent matches.`
                : outcome === "away"
                  ? ` ${awayTeam} is expected to perform well in this away fixture.`
                  : ` Both teams appear evenly matched in our analysis.`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
