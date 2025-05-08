
import React from 'react';
import { VirtualScroll } from '@/components/ui/virtual-scroll';
import { Match } from '@/types';
import { MatchRow } from './MatchRow';

interface MatchesTableProps {
  matches: Match[];
}

export function MatchesTable({ matches }: MatchesTableProps) {
  return (
    <div className="matches-table-container">
      <div className="matches-table-header">
        <div className="table-cell">Date</div>
        <div className="table-cell">Home Team</div>
        <div className="table-cell">Score</div>
        <div className="table-cell">Away Team</div>
        <div className="table-cell">Actions</div>
      </div>
      
      <VirtualScroll
        items={matches}
        height={400}
        itemHeight={48}
        renderItem={(match, index) => (
          <MatchRow match={match} index={index} />
        )}
      />
    </div>
  );
}