
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AnalysisHeaderProps {
  selectedLeague: string
  selectedSeason: string
  onLeagueChange: (value: string) => void
  onSeasonChange: (value: string) => void
}

export function AnalysisHeader({
  selectedLeague,
  selectedSeason,
  onLeagueChange,
  onSeasonChange
}: AnalysisHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Match Analysis</h2>
        <p className="text-gray-400">View patterns, predictions and upcoming schedule</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <Select value={selectedLeague} onValueChange={onLeagueChange}>
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
        <Select value={selectedSeason} onValueChange={onSeasonChange}>
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
  )
}
