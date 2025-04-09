
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
      <DialogContent className="sm:max-w-[600px] bg-card border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {initialData ? 'Edit League' : 'Create New League'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {initialData 
              ? 'Update your league information and team setup.'
              : 'Create a new league, add teams, and generate the match schedule.'}
          </DialogDescription>
        </DialogHeader>

        <FormTable 
          onSubmit={onSubmit}
          initialData={initialData}
        />
        
        <DialogFooter className="gap-2 sm:justify-start">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeagueModal;
