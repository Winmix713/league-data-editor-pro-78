
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface PredictionErrorProps {
  error: string | null
}

export function PredictionError({ error }: PredictionErrorProps) {
  if (!error) return null
  
  return (
    <Alert variant="destructive" className="bg-red-500/20 border-red-500/30">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}
