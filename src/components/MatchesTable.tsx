
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { Match } from "@/types"
import { useMatchSorting, SortField } from "@/hooks/useMatchSorting"
import { Loader } from "@/components/ui/loader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MatchesTableProps {
  matches: Match[]
  loading?: boolean
  onMatchClick?: (match: Match) => void
}

// Memoized component for better performance
export function MatchesTable({ matches, loading = false, onMatchClick }: MatchesTableProps) {
  const { sortConfig, requestSort, sortMatches, getSortIcon } = useMatchSorting();
  const navigate = useNavigate();
  
  // Memoize sorted matches to prevent unnecessary re-sorting
  const sortedMatches = useMemo(() => {
    return sortMatches(matches);
  }, [matches, sortMatches]);
  
  // Show loading state if there are no matches or loading prop is true
  if (loading) {
    return (
      <div className="py-6 flex flex-col items-center justify-center text-gray-400">
        <Loader className="w-8 h-8 animate-spin mb-2" />
        <p>Loading matches...</p>
      </div>
    );
  }
  
  // Show empty state if there are no matches
  if (!matches || matches.length === 0) {
    return (
      <div className="py-6 flex flex-col items-center justify-center text-gray-400">
        <p>No matches found.</p>
        <p className="text-sm">Upload a CSV file to add matches.</p>
      </div>
    );
  }
  
  const handleMatchClick = (match: Match) => {
    if (onMatchClick) {
      onMatchClick(match);
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-black/20">
          <TableRow className="border-b border-white/5 hover:bg-transparent">
            <TableHead className="text-gray-400 font-normal">
              <button
                onClick={() => requestSort('date' as SortField)}
                className="flex items-center hover:text-gray-100"
              >
                Date
                {getSortIcon('date' as SortField)}
              </button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal">
              <button
                onClick={() => requestSort('round' as SortField)}
                className="flex items-center hover:text-gray-100"
              >
                Round
                {getSortIcon('round' as SortField)}
              </button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal">
              <button
                onClick={() => requestSort('home_team' as SortField)}
                className="flex items-center hover:text-gray-100"
              >
                Home Team
                {getSortIcon('home_team' as SortField)}
              </button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal text-center">
              <button
                onClick={() => requestSort('goals' as SortField)}
                className="flex items-center justify-center hover:text-gray-100"
              >
                Score
                {getSortIcon('goals' as SortField)}
              </button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal">
              <button
                onClick={() => requestSort('away_team' as SortField)}
                className="flex items-center hover:text-gray-100"
              >
                Away Team
                {getSortIcon('away_team' as SortField)}
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMatches.map((match, index) => (
            <TableRow
              key={`${match.home_team}-${match.away_team}-${match.date}-${index}`}
              className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => handleMatchClick(match)}
            >
              <TableCell>{match.date}</TableCell>
              <TableCell>{match.round || "-"}</TableCell>
              <TableCell className={match.home_score > match.away_score ? "font-medium text-emerald-400" : ""}>
                {match.home_team}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <span className="text-sm font-semibold">{match.home_score}</span>
                  <span className="mx-2 text-gray-400">-</span>
                  <span className="text-sm font-semibold">{match.away_score}</span>
                </div>
              </TableCell>
              <TableCell className={match.away_score > match.home_score ? "font-medium text-emerald-400" : ""}>
                {match.away_team}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
