
import { useRef, useState, memo } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { parseMatchesCSV } from "@/utils/csvParser"
import CSVInstructions from "../matches/CSVInstructions"
import type { Match } from "@/types"
import logger from "@/utils/logger"

interface CSVUploaderProps {
  onMatchesUpdate: (matches: Match[]) => void
  onDataLoaded: (loaded: boolean) => void
}

export const CSVUploader = memo(({ onMatchesUpdate, onDataLoaded }: CSVUploaderProps) => {
  const [fileName, setFileName] = useState<string | null>(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setImportError(null)
    
    try {
      const parsedMatches = await parseMatchesCSV(file)
      onMatchesUpdate(parsedMatches)
      setDataLoaded(true)
      onDataLoaded(true)
      toast.success(`${parsedMatches.length} matches imported successfully`)
    } catch (error) {
      logger.error("CSV upload error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to process CSV file"
      setImportError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <div className="w-full">
      <label htmlFor="csv-upload" className="block text-gray-300 text-sm mb-2">
        Upload Matches Data (CSV)
      </label>
      <input
        ref={fileInputRef}
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />

      {importError && (
        <Alert variant="destructive" className="mb-4 bg-red-950/50 border-red-800 text-red-200">
          <AlertDescription>
            {importError}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-3">
        <Button
          onClick={triggerFileUpload}
          variant="outline"
          className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <Upload className="w-4 h-4" />
          Choose CSV File
        </Button>
        <span className={`text-sm ${fileName ? "text-gray-400" : "text-gray-500"}`}>
          {fileName || "No file chosen"}
        </span>
      </div>
      
      {dataLoaded && (
        <p className="text-sm text-emerald-400 mt-2 flex items-center">
          <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
          Data loaded successfully
        </p>
      )}
      
      <CSVInstructions />
    </div>
  )
})

CSVUploader.displayName = "CSVUploader"
