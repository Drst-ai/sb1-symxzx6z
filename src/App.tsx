import React, { useState, useCallback } from 'react';
import { usePrompts } from './hooks/usePrompts';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { PromptList } from './components/prompts/PromptList';
import { PromptForm } from './components/prompts/PromptForm';
import { SearchBar } from './components/prompts/SearchBar';
import { TagFilter } from './components/prompts/TagFilter';
import { SortSelector } from './components/prompts/SortSelector';
import { ConfirmDialog } from './components/prompts/ConfirmDialog';
import { Modal } from './components/ui/Modal';
import { Prompt, ViewMode } from './types';

function App() {
  const {
    prompts,
    allTags,
    loading,
    filters,
    createPrompt,
    editPrompt,
    removePrompt,
    updateFilters,
    setSortBy,
    toggleTag,
    refresh
  } = usePrompts();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentPromptId, setCurrentPromptId] = useState<string | null>(null);
  const [deletePromptId, setDeletePromptId] = useState<string | null>(null);

  // Track online status
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync data when coming back online
  React.useEffect(() => {
    if (isOnline) {
      refresh();
    }
  }, [isOnline, refresh]);

  // Form handlers
  const handleCreatePrompt = useCallback(async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    await createPrompt(promptData);
    setViewMode('list');
  }, [createPrompt]);

  const handleEditPrompt = useCallback(async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentPromptId) {
      await editPrompt(currentPromptId, promptData);
      setCurrentPromptId(null);
      setViewMode('list');
    }
  }, [currentPromptId, editPrompt]);

  const handleDeletePrompt = useCallback(async () => {
    if (deletePromptId) {
      await removePrompt(deletePromptId);
      setDeletePromptId(null);
    }
  }, [deletePromptId, removePrompt]);

  // Find current prompt if in edit mode
  const currentPrompt = prompts.find(p => p.id === currentPromptId);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        onCreateNew={() => {
          setCurrentPromptId(null);
          setViewMode('create');
        }}
        onImportSuccess={refresh}
      />

      {!isOnline && (
        <div className="bg-amber-100 text-amber-800 text-sm px-4 py-2 text-center">
          You are currently offline. Changes will be saved locally and synchronized when you're back online.
        </div>
      )}
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {viewMode === 'list' ? (
          <>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <div className="lg:w-1/4 space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <SearchBar 
                    value={filters.searchText}
                    onChange={(value) => updateFilters({ searchText: value })}
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <TagFilter 
                    allTags={allTags}
                    selectedTags={filters.selectedTags}
                    onToggleTag={toggleTag}
                  />
                </div>
              </div>

              {/* Main content */}
              <div className="lg:w-3/4">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Your Prompts {prompts.length > 0 && `(${prompts.length})`}
                  </h2>
                  <SortSelector 
                    value={filters.sortBy}
                    onChange={setSortBy}
                  />
                </div>
                
                <PromptList
                  prompts={prompts}
                  loading={loading}
                  onEdit={(id) => {
                    setCurrentPromptId(id);
                    setViewMode('edit');
                  }}
                  onDelete={(id) => setDeletePromptId(id)}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {viewMode === 'create' ? 'Create New Prompt' : 'Edit Prompt'}
            </h2>
            <PromptForm
              prompt={currentPrompt}
              onSave={viewMode === 'create' ? handleCreatePrompt : handleEditPrompt}
              onCancel={() => {
                setCurrentPromptId(null);
                setViewMode('list');
              }}
            />
          </div>
        )}
      </main>

      <Footer />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deletePromptId !== null}
        onClose={() => setDeletePromptId(null)}
        onConfirm={handleDeletePrompt}
        title="Delete Prompt"
        message="Are you sure you want to delete this prompt? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}

export default App;