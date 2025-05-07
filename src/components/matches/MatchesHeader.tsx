
import { memo } from "react"
import { LayoutGrid, Table, SquareStack } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MatchesHeaderProps {
  viewType: "rounds" | "all" | "cards"
  onViewTypeChange: (viewType: "rounds" | "all" | "cards") => void
  onRequestSort: (key: string) => void
  getSortIcon: (key: string) => JSX.Element
}

export const MatchesHeader = memo(({
  viewType,
  onViewTypeChange,
  onRequestSort,
  getSortIcon
}: MatchesHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
      <div className="flex gap-3 p-1 bg-black/30 rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewTypeChange("rounds")}
          className={`gap-2 rounded-md px-3 ${
            viewType === "rounds"
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <SquareStack className="h-4 w-4" />
          <span className="hidden md:inline">By Rounds</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewTypeChange("all")}
          className={`gap-2 rounded-md px-3 ${
            viewType === "all"
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Table className="h-4 w-4" />
          <span className="hidden md:inline">Table View</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewTypeChange("cards")}
          className={`gap-2 rounded-md px-3 ${
            viewType === "cards"
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="hidden md:inline">Card View</span>
        </Button>
      </div>
      
      {viewType === "all" && (
        <div className="flex gap-2 text-xs text-gray-400">
          <button
            onClick={() => onRequestSort("date")}
            className="flex items-center hover:text-white"
          >
            Date {getSortIcon("date")}
          </button>
          <span>•</span>
          <button
            onClick={() => onRequestSort("homeTeam")}
            className="flex items-center hover:text-white"
          >
            Team {getSortIcon("homeTeam")}
          </button>
          <span>•</span>
          <button
            onClick={() => onRequestSort("round")}
            className="flex items-center hover:text-white"
          >
            Round {getSortIcon("round")}
          </button>
        </div>
      )}
    </div>
  )
})

MatchesHeader.displayName = "MatchesHeader"
