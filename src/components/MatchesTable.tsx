import { useNavigate } from "react-router-dom"
import { Match } from "@/types"
import { useMatchSorting } from "@/components/matches/useMatchSorting"
import { Loader } from "@/components/ui/loader"

interface MatchesTableProps {
  matches: Match[]
  loading?: boolean
}

// Fix the sorting icon issue by ensuring getSortIcon returns JSX elements
export function MatchesTable({ matches, loading = false }: MatchesTableProps) {
  const { sortConfig, requestSort, sortMatches, getSortIcon } = useMatchSorting();
  const navigate = useNavigate();
  
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

  // Sort the matches
  const sortedMatches = sortMatches(matches);
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/5">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
              <button
                onClick={() => requestSort('date')}
                className="flex items-center hover:text-gray-100"
              >
                Date
                {getSortIcon('date')}
              </button>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
              <button
                onClick={() => requestSort('round')}
                className="flex items-center hover:text-gray-100"
              >
                Round
                {getSortIcon('round')}
              </button>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
              <button
                onClick={() => requestSort('home_team')}
                className="flex items-center hover:text-gray-100"
              >
                Home Team
                {getSortIcon('home_team')}
              </button>
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
              <button
                onClick={() => requestSort('goals')}
                className="flex items-center justify-center hover:text-gray-100"
              >
                Score
                {getSortIcon('goals')}
              </button>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
              <button
                onClick={() => requestSort('away_team')}
                className="flex items-center hover:text-gray-100"
              >
                Away Team
                {getSortIcon('away_team')}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedMatches.map((match, index) => (
            <tr
              key={`${match.home_team}-${match.away_team}-${match.date}-${index}`}
              className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => {
                // Handle match click - could navigate to a match detail page
              }}
            >
              <td className="px-4 py-3 text-sm">{match.date}</td>
              <td className="px-4 py-3 text-sm">{match.round}</td>
              <td className="px-4 py-3 text-sm">{match.home_team}</td>
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center">
                  <span className="text-sm font-semibold">{match.home_score}</span>
                  <span className="mx-2 text-gray-400">-</span>
                  <span className="text-sm font-semibold">{match.away_score}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{match.away_team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
