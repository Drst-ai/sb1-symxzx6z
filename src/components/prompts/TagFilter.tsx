import React from 'react';
import { Tag } from '../ui/Tag';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  allTags,
  selectedTags,
  onToggleTag
}) => {
  if (allTags.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        No tags available
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium text-gray-700 mb-2">Filter by tags</h3>
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <Tag
            key={tag}
            label={tag}
            active={selectedTags.includes(tag)}
            onClick={() => onToggleTag(tag)}
          />
        ))}
      </div>
    </div>
  );
};