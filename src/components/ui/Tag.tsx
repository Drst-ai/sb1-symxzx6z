import React from 'react';
import { X } from 'lucide-react';

// Define vibrant colors for tags with higher contrast
const tagColors = [
  'bg-rose-100 text-rose-900 border-rose-200 hover:bg-rose-200',
  'bg-violet-100 text-violet-900 border-violet-200 hover:bg-violet-200',
  'bg-indigo-100 text-indigo-900 border-indigo-200 hover:bg-indigo-200',
  'bg-sky-100 text-sky-900 border-sky-200 hover:bg-sky-200',
  'bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-200',
  'bg-lime-100 text-lime-900 border-lime-200 hover:bg-lime-200',
  'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200',
  'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200 hover:bg-fuchsia-200',
  'bg-cyan-100 text-cyan-900 border-cyan-200 hover:bg-cyan-200',
  'bg-orange-100 text-orange-900 border-orange-200 hover:bg-orange-200',
];

// Get consistent color for a tag based on its text
function getTagColor(label: string): string {
  const hash = label.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return tagColors[Math.abs(hash) % tagColors.length];
}

interface TagProps {
  label: string;
  onRemove?: () => void;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  onRemove,
  onClick,
  active = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center text-sm px-3 py-1 rounded-full font-medium transition-colors border shadow-sm';
  const colorClasses = getTagColor(label);
  
  const stateClasses = active
    ? 'bg-indigo-200 text-indigo-900 border-indigo-300 hover:bg-indigo-300'
    : colorClasses;
  
  const cursorClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${stateClasses} ${cursorClass} ${className}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {onRemove && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1.5 opacity-70 hover:opacity-100 focus:outline-none transition-opacity"
          aria-label={`Remove ${label} tag`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};