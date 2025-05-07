
import { memo } from "react"
import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const NoMatchesFound = memo(() => {
  return (
    <Card className="bg-black/20 border-white/5">
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="w-8 h-8 text-gray-500" />
          <p className="text-gray-400">No matches available for this league yet.</p>
        </div>
      </CardContent>
    </Card>
  )
})

NoMatchesFound.displayName = "NoMatchesFound"
