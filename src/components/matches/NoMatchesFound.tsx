
import { memo } from "react"
import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NoMatchesFoundProps {
  message?: string
  actionLabel?: string
  onAction?: () => void
}

export const NoMatchesFound = memo(({ 
  message = "No matches available for this league yet.", 
  actionLabel,
  onAction
}: NoMatchesFoundProps) => {
  return (
    <Card className="bg-black/20 border-white/5">
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="w-8 h-8 text-gray-500" />
          <p className="text-gray-400">{message}</p>
          {actionLabel && onAction && (
            <Button 
              onClick={onAction}
              variant="outline" 
              className="mt-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
})

NoMatchesFound.displayName = "NoMatchesFound"
