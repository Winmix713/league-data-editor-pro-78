
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/custom-input";
import { LeagueFormData } from '@/types';
import { toast } from "sonner";
import { X, Plus, Save } from 'lucide-react';
import { generateMatchSchedule } from '@/utils/calculations';

interface FormTableProps {
  onSubmit: (data: { name: string, season: string, matches: any[] }) => void;
  initialData?: LeagueFormData;
}

const FormTable = ({ onSubmit, initialData }: FormTableProps) => {
  const [formData, setFormData] = useState<LeagueFormData>(
    initialData || {
      name: '',
      season: '',
      teams: ['', '']
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (index: number, value: string) => {
    const newTeams = [...formData.teams];
    newTeams[index] = value;
    setFormData(prev => ({ ...prev, teams: newTeams }));
  };

  const addTeam = () => {
    setFormData(prev => ({ ...prev, teams: [...prev.teams, ''] }));
  };

  const removeTeam = (index: number) => {
    if (formData.teams.length > 2) {
      const newTeams = [...formData.teams];
      newTeams.splice(index, 1);
      setFormData(prev => ({ ...prev, teams: newTeams }));
    } else {
      toast.error("League must have at least 2 teams");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      toast.error("League name is required");
      return;
    }
    
    if (!formData.season.trim()) {
      toast.error("Season is required");
      return;
    }
    
    // Check if all teams have names
    const emptyTeamIndex = formData.teams.findIndex(team => !team.trim());
    if (emptyTeamIndex !== -1) {
      toast.error(`Team #${emptyTeamIndex + 1} name is required`);
      return;
    }
    
    // Check for duplicate team names
    const teamNames = formData.teams.map(name => name.trim().toLowerCase());
    const uniqueTeams = new Set(teamNames);
    if (uniqueTeams.size !== formData.teams.length) {
      toast.error("All team names must be unique");
      return;
    }
    
    // Generate match schedule
    const matches = generateMatchSchedule(formData.teams);
    
    onSubmit({ 
      name: formData.name, 
      season: formData.season,
      matches: matches
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">League Name</label>
          <CustomInput 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Premier League"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Season</label>
          <CustomInput 
            name="season"
            value={formData.season}
            onChange={handleInputChange}
            placeholder="2023-2024"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Teams</h3>
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            className="bg-black/20 border-white/10 text-white hover:bg-black/30"
            onClick={addTeam}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Team
          </Button>
        </div>
        
        <div className="space-y-2">
          {formData.teams.map((team, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1">
                <CustomInput
                  value={team}
                  onChange={(e) => handleTeamChange(index, e.target.value)}
                  placeholder={`Team ${index + 1}`}
                />
              </div>
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/5"
                onClick={() => removeTeam(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save League
        </Button>
      </div>
    </form>
  );
};

export default FormTable;
