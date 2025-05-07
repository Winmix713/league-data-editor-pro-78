
import { memo } from "react"

export const CSVInstructions = memo(() => {
  return (
    <div className="mt-3 text-xs text-gray-400">
      <p>Expected CSV format:</p>
      <code className="block mt-1 p-2 bg-black/30 rounded text-gray-300 font-mono text-xs overflow-x-auto">
        date,home_team,away_team,ht_home_score,ht_away_score,home_score,away_score<br/>
        04:58,Fulham,Brighton,0,1,1,1<br/>
        04:58,Arsenal,Liverpool,1,0,3,1
      </code>
      <p className="mt-1">Note: All matches with the same timestamp will be grouped into the same round.</p>
    </div>
  )
})

CSVInstructions.displayName = "CSVInstructions"
