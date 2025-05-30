import React from 'react';
import { Edit2, Trash2, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { Prompt } from '../../types';

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, onEdit, onDelete }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.text)
      .then(() => {
        alert('Prompt copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{prompt.title}</h3>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(prompt.id)}
              aria-label="Edit prompt"
              icon={<Edit2 size={16} />}
            />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(prompt.id)}
              aria-label="Delete prompt"
              icon={<Trash2 size={16} className="text-red-500" />}
            />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{prompt.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {prompt.tags.map(tag => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className="text-xs text-gray-500">
          Updated {formatDate(prompt.updatedAt)}
        </div>
      </div>
      
      <div className="p-4 bg-gray-50">
        <div className="relative">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono bg-gray-100 p-3 rounded max-h-40 overflow-y-auto">
            {prompt.text}
          </pre>
          <Button 
            variant="ghost" 
            size="sm"
            className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100"
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
            icon={<Copy size={14} />}
          >
            Copy
          </Button>
        </div>
      </div>
      
      {prompt.comments && (
        <div className="p-3 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Notes:</span> {prompt.comments}
          </p>
        </div>
      )}
    </div>
  );
};