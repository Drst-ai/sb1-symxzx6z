import React from 'react';
import { SortOption } from '../../types';

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-by\" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort-by"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="block py-1.5 pl-3 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
};