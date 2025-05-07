
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Match } from "@/types"
import { MatchDetailView } from "./matches/MatchDetailView"

interface MatchDetailProps {
  match: Match
  isOpen: boolean
  onClose: () => void
}

const MatchDetail = ({ match, isOpen, onClose }: MatchDetailProps) => {
  if (!match) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-[#0a0f14] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-center">
            Match Details
          </DialogTitle>
        </DialogHeader>
        
        <MatchDetailView match={match} />
      </DialogContent>
    </Dialog>
  )
}

export default MatchDetail
