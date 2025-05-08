
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Match } from "@/types"
import { MatchDetailView } from "./matches/MatchDetailView"
import { Button } from "./ui/button"
import { useState } from "react"
import { HeadToHeadView } from "./matches/HeadToHeadView"

interface MatchDetailProps {
  match: Match
  isOpen: boolean
  onClose: () => void
}

const MatchDetail = ({ match, isOpen, onClose }: MatchDetailProps) => {
  const [view, setView] = useState<'details' | 'h2h'>('details')
  
  if (!match) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-[#0a0f14] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-center">
            Match Details
          </DialogTitle>
          <div className="flex justify-center mt-4 gap-2">
            <Button 
              variant={view === 'details' ? "default" : "outline"}
              size="sm"
              onClick={() => setView('details')}
              className={view === 'details' ? "bg-blue-500" : ""}
            >
              Details
            </Button>
            <Button 
              variant={view === 'h2h' ? "default" : "outline"}
              size="sm"
              onClick={() => setView('h2h')}
              className={view === 'h2h' ? "bg-blue-500" : ""}
            >
              Head-to-Head
            </Button>
          </div>
        </DialogHeader>
        
        {view === 'details' ? (
          <MatchDetailView match={match} onClose={onClose} />
        ) : (
          <HeadToHeadView homeTeam={match.home_team} awayTeam={match.away_team} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default MatchDetail
