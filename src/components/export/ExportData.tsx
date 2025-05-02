
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import type { LeagueData, Match } from "@/types";
import { calculateStandings, calculateTeamForms } from "@/utils/calculations";

interface ExportDataProps {
  league: LeagueData;
  matches: Match[];
}

const ExportData: React.FC<ExportDataProps> = ({ league, matches }) => {
  const [exportType, setExportType] = useState<'csv' | 'json'>('csv');
  const [dataType, setDataType] = useState<'matches' | 'standings' | 'form'>('matches');

  const handleExport = () => {
    let data: any;
    let filename: string;
    
    // Prepare the data based on selection
    if (dataType === 'matches') {
      data = matches;
      filename = `${league.name}-matches`;
    } else if (dataType === 'standings') {
      data = calculateStandings(matches);
      filename = `${league.name}-standings`;
    } else { // form
      data = calculateTeamForms(matches);
      filename = `${league.name}-team-forms`;
    }
    
    // Format the data based on export type
    let content: string;
    let mimeType: string;
    
    if (exportType === 'csv') {
      content = convertToCSV(data);
      mimeType = 'text/csv';
      filename += '.csv';
    } else { // json
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      filename += '.json';
    }
    
    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Export successful', {
      description: `${filename} has been downloaded successfully.`
    });
  };
  
  // Convert JSON data to CSV format
  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        // Handle arrays (like form data)
        if (Array.isArray(value)) {
          return `"${value.join(' ')}"`;
        }
        // Escape commas in string values
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  };

  return (
    <Card className="bg-black/20 border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download size={20} className="text-blue-500" />
          Export League Data
        </CardTitle>
        <CardDescription className="text-gray-400">
          Export league data in different formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Data Type</label>
          <Select value={dataType} onValueChange={(value: any) => setDataType(value)}>
            <SelectTrigger className="bg-black/30 border-white/10 text-white">
              <SelectValue placeholder="Select data type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="matches">Matches</SelectItem>
              <SelectItem value="standings">Standings</SelectItem>
              <SelectItem value="form">Team Forms</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Export Format</label>
          <Select value={exportType} onValueChange={(value: any) => setExportType(value)}>
            <SelectTrigger className="bg-black/30 border-white/10 text-white">
              <SelectValue placeholder="Select export format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleExport} 
          className="w-full bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
          disabled={matches.length === 0}
        >
          <Download size={16} />
          Export {dataType === 'matches' ? 'Matches' : dataType === 'standings' ? 'Standings' : 'Team Forms'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExportData;
