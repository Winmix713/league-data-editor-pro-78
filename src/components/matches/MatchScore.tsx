
import { memo, useMemo } from "react"
import type { Match } from "@/types"

interface MatchScoreProps {
  homeScore: number
  awayScore: number
  isHalfTime?: boolean
  size?: "small" | "medium" | "large"
  match?: Match
}

export const MatchScore = memo(({ homeScore, awayScore, isHalfTime, size = "medium" }: MatchScoreProps) => {
  const scoreClass = useMemo(() => {
    if (isHalfTime) return "text-gray-400"
    if (homeScore > awayScore) return "text-emerald-400"
    if (homeScore < awayScore) return "text-red-400"
    return "text-amber-400"
  }, [homeScore, awayScore, isHalfTime])

  const sizeClass = size === "large" ? "text-2xl" : size === "medium" ? "text-base" : "text-sm";

  return (
    <span className={`font-mono font-bold ${sizeClass} ${scoreClass}`}>
      {homeScore} - {awayScore}
    </span>
  )
})

MatchScore.displayName = "MatchScore"
