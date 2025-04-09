
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormTable from './FormTable';
import { LeagueFormData } from '@/types';

interface NewLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string, season: string, matches: any[] }) => void;
  initialData?: LeagueFormData;
}

const NewLeagueModal = ({ isOpen, onClose, onSubmit, initialData }: NewLeagueModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#0a0f14] border-white/10 relative overflow-hidden">
        {/* Background blur effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-xl font-bold text-white">
            {initialData ? 'Edit League' : 'Create New League'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {initialData 
              ? 'Update your league information and team setup.'
              : 'Create a new league, add teams, and generate the match schedule.'}
          </DialogDescription>
        </DialogHeader>

        <div className="relative z-10">
          <FormTable 
            onSubmit={onSubmit}
            initialData={initialData}
          />
        </div>
        
        <DialogFooter className="gap-2 sm:justify-start relative z-10">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
        </DialogFooter>
        
        {/* Top border gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        {/* Bottom border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeagueModal;
