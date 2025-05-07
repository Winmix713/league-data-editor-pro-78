
import { useState, useCallback } from "react"

interface SortConfig {
  key: string
  direction: "asc" | "desc"
}

export function useMatchSorting() {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const requestSort = useCallback((key: string) => {
    setSortConfig((currentSortConfig) => {
      if (currentSortConfig && currentSortConfig.key === key) {
        return {
          key,
          direction: currentSortConfig.direction === "asc" ? "desc" : "asc"
        }
      }
      return { key, direction: "asc" }
    })
  }, [])

  const getSortIcon = useCallback((key: string) => {
    const ArrowUpDown = require("lucide-react").ArrowUpDown
    const ChevronUp = require("lucide-react").ChevronUp
    const ChevronDown = require("lucide-react").ChevronDown

    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    )
  }, [sortConfig])

  return {
    sortConfig,
    requestSort,
    getSortIcon
  }
}
