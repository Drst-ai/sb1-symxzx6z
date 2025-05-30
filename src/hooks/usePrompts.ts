import { useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Prompt, FilterOptions, SortOption } from '../types';
import { getAllPrompts, addPrompt, updatePrompt, deletePrompt } from '../utils/db';

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterOptions>({
    searchText: '',
    selectedTags: [],
    sortBy: 'newest'
  });

  const loadPrompts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllPrompts();
      setPrompts(data);
      
      // Extract all unique tags
      const tags = new Set<string>();
      data.forEach(prompt => {
        prompt.tags.forEach(tag => tags.add(tag));
      });
      setAllTags(Array.from(tags).sort());
    } catch (error) {
      console.error('Error loading prompts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPrompts();
  }, [loadPrompts]);

  const createPrompt = useCallback(async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now();
    const newPrompt: Prompt = {
      id: uuidv4(),
      ...promptData,
      createdAt: now,
      updatedAt: now
    };
    
    await addPrompt(newPrompt);
    await loadPrompts();
    return newPrompt.id;
  }, [loadPrompts]);

  const editPrompt = useCallback(async (id: string, promptData: Partial<Prompt>) => {
    const existingPrompt = prompts.find(p => p.id === id);
    if (!existingPrompt) return false;
    
    const updatedPrompt: Prompt = {
      ...existingPrompt,
      ...promptData,
      updatedAt: Date.now()
    };
    
    await updatePrompt(updatedPrompt);
    await loadPrompts();
    return true;
  }, [prompts, loadPrompts]);

  const removePrompt = useCallback(async (id: string) => {
    await deletePrompt(id);
    await loadPrompts();
  }, [loadPrompts]);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const setSortBy = useCallback((sortBy: SortOption) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setFilters(prev => {
      const isSelected = prev.selectedTags.includes(tag);
      return {
        ...prev,
        selectedTags: isSelected
          ? prev.selectedTags.filter(t => t !== tag)
          : [...prev.selectedTags, tag]
      };
    });
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts
      .filter(prompt => {
        // Filter by search text
        if (filters.searchText) {
          const searchLower = filters.searchText.toLowerCase();
          const matchesTitle = prompt.title.toLowerCase().includes(searchLower);
          const matchesDescription = prompt.description.toLowerCase().includes(searchLower);
          const matchesText = prompt.text.toLowerCase().includes(searchLower);
          
          if (!(matchesTitle || matchesDescription || matchesText)) {
            return false;
          }
        }
        
        // Filter by selected tags
        if (filters.selectedTags.length > 0) {
          const hasSelectedTag = filters.selectedTags.some(tag => 
            prompt.tags.includes(tag)
          );
          
          if (!hasSelectedTag) {
            return false;
          }
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by selected option
        switch (filters.sortBy) {
          case 'newest':
            return b.updatedAt - a.updatedAt;
          case 'oldest':
            return a.updatedAt - b.updatedAt;
          case 'alphabetical':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [prompts, filters]);

  return {
    prompts: filteredPrompts,
    allPrompts: prompts,
    allTags,
    loading,
    filters,
    createPrompt,
    editPrompt,
    removePrompt,
    updateFilters,
    setSortBy,
    toggleTag,
    refresh: loadPrompts
  };
};