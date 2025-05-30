import React from 'react';
import { BrainCog, Plus, Download, Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { downloadPrompts, uploadPrompts } from '../../utils/exportImport';

interface HeaderProps {
  onCreateNew: () => void;
  onImportSuccess: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateNew, onImportSuccess }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const success = await uploadPrompts(file);
      if (success) {
        onImportSuccess();
        alert('Prompts imported successfully!');
      } else {
        alert('Failed to import prompts. Please check the file format.');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('Error importing prompts. Please try again.');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <BrainCog size={28} className="text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">AI Prompt Organizer</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="primary"
              icon={<Plus size={18} />}
              onClick={onCreateNew}
            >
              New Prompt
            </Button>
            
            <Button 
              variant="outline"
              icon={<Download size={18} />}
              onClick={() => downloadPrompts()}
            >
              Export
            </Button>
            
            <Button 
              variant="outline"
              icon={<Upload size={18} />}
              onClick={() => fileInputRef.current?.click()}
            >
              Import
            </Button>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".json"
              onChange={handleImport}
            />
          </div>
        </div>
      </div>
    </header>
  );
};