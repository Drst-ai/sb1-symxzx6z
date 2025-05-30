export interface Prompt {
  id: string;
  title: string;
  description: string;
  tags: string[];
  text: string;
  comments: string;
  createdAt: number;
  updatedAt: number;
}

export interface FilterOptions {
  searchText: string;
  selectedTags: string[];
  sortBy: SortOption;
}

export type SortOption = 'newest' | 'oldest' | 'alphabetical';

export type ViewMode = 'list' | 'edit' | 'create';