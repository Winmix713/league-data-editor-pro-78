
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";

interface PatternHeaderProps {
  onBack: () => void;
  onExport: () => void;
}

export function PatternHeader({ onBack, onExport }: PatternHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center">
        <Button
          variant="outline"
          className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 mr-4"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Pattern Detection</h2>
          <p className="text-gray-400">Detailed statistical analysis of match patterns</p>
        </div>
      </div>

      <Button
        variant="outline"
        className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
        onClick={onExport}
      >
        <Download className="mr-2 h-4 w-4" />
        Export Analysis
      </Button>
    </div>
  );
}
