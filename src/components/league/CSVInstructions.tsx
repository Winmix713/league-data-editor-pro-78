
import { memo } from "react"

export const CSVInstructions = memo(() => {
  return (
    <div className="mt-3 text-xs text-gray-400">
      <p>Expected CSV format:</p>
      <code className="block mt-1 p-2 bg-black/30 rounded text-gray-300 font-mono text-xs overflow-x-auto">
        date,home_team,away_team,ht_home_score,ht_away_score,home_score,away_score<br/>
        21:10,Fulham,Brighton,0,1,1,1
      </code>
    </div>
  )
})

CSVInstructions.displayName = "CSVInstructions"
