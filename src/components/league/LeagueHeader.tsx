
"use client"

import { ArrowLeft, Edit, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LeagueHeaderProps {
  isEditing: boolean
  onBack: () => void
  onToggleEdit: () => void
}

export const LeagueHeader = ({ isEditing, onBack, onToggleEdit }: LeagueHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={onBack}
        variant="outline"
        className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Leagues
      </Button>
      <Button
        onClick={onToggleEdit}
        variant={isEditing ? "default" : "outline"}
        className={`gap-2 ${isEditing ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}
      >
        {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
        {isEditing ? "Save" : "Edit League"}
      </Button>
    </div>
  )
}
