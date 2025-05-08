
import React from "react"
import { Info } from "lucide-react"

interface CSVInstructionsProps {
  className?: string
}

export const CSVInstructions: React.FC<CSVInstructionsProps> = ({ className = "" }) => {
  return (
    <div className={`mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 ${className}`}>
      <div className="flex gap-3">
        <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-white mb-2">CSV Format Instructions</h3>
          <p className="text-sm text-gray-400 mb-3">
            Your CSV file should include the following columns:
          </p>
          <div className="bg-black/30 p-3 rounded overflow-auto text-xs font-mono mb-2">
            <code>date,home_team,away_team,home_score,away_score,ht_home_score,ht_away_score,round,venue</code>
          </div>
          <ul className="space-y-1 text-xs text-gray-400 list-disc pl-4">
            <li>
              <strong>date</strong>: Use YYYY-MM-DD format, DD/MM/YYYY, or HH:MM for times
            </li>
            <li>
              <strong>home_team, away_team</strong>: Team names
            </li>
            <li>
              <strong>home_score, away_score</strong>: Final scores (numbers)
            </li>
            <li>
              <strong>ht_home_score, ht_away_score</strong>: Half-time scores (optional numbers)
            </li>
            <li>
              <strong>round</strong>: Match round/week number (optional)
            </li>
            <li>
              <strong>venue</strong>: Stadium or location (optional)
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CSVInstructions
