import React from 'react';
import { PromptCard } from './PromptCard';
import { Prompt } from '../../types';
import { Trash2 } from 'lucide-react';

interface PromptListProps {
  prompts: Prompt[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export const PromptList: React.FC<PromptListProps> = ({
  prompts,
  onEdit,
  onDelete,
  loading
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-indigo-200 rounded-full mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Trash2 size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No prompts found</h3>
          <p className="text-gray-500 max-w-md">
            No prompts match your current filters or search terms. Try adjusting your filters or create a new prompt.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prompts.map(prompt => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};