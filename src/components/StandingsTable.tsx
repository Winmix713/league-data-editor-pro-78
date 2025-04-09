
import React from 'react';
import { Team } from '@/types';

interface StandingsTableProps {
  teams: Team[];
}

const StandingsTable = ({ teams }: StandingsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b border-white/5">
            <th className="py-3 px-4">Pos</th>
            <th className="py-3 px-4">Club</th>
            <th className="py-3 px-4 text-center">MP</th>
            <th className="py-3 px-4 text-center">W</th>
            <th className="py-3 px-4 text-center">D</th>
            <th className="py-3 px-4 text-center">L</th>
            <th className="py-3 px-4 text-center">GF</th>
            <th className="py-3 px-4 text-center">GA</th>
            <th className="py-3 px-4 text-center">GD</th>
            <th className="py-3 px-4 text-center">Pts</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr 
              key={team.id}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="py-3 px-4 font-medium">{index + 1}</td>
              <td className="py-3 px-4">{team.name}</td>
              <td className="py-3 px-4 text-center">{team.played}</td>
              <td className="py-3 px-4 text-center">{team.wins}</td>
              <td className="py-3 px-4 text-center">{team.draws}</td>
              <td className="py-3 px-4 text-center">{team.losses}</td>
              <td className="py-3 px-4 text-center">{team.goalsFor}</td>
              <td className="py-3 px-4 text-center">{team.goalsAgainst}</td>
              <td className="py-3 px-4 text-center">
                <span className={`font-medium ${team.goalDiff > 0 ? 'text-emerald-500' : team.goalDiff < 0 ? 'text-red-500' : ''}`}>
                  {team.goalDiff > 0 && '+'}
                  {team.goalDiff}
                </span>
              </td>
              <td className="py-3 px-4 text-center font-bold">{team.points}</td>
            </tr>
          ))}
          
          {teams.length === 0 && (
            <tr>
              <td colSpan={10} className="py-8 text-center text-gray-400">
                No team data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
