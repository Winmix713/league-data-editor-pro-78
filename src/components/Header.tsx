
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface HeaderProps {
  title: string;
  description: string;
  onCreateNew?: () => void;
  createButtonText?: string;
}

const Header = ({ title, description, onCreateNew, createButtonText }: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-400 mt-1">{description}</p>
      </div>
      
      {onCreateNew && (
        <Button 
          onClick={onCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {createButtonText || "Create New"}
        </Button>
      )}
    </div>
  );
};

export default Header;
