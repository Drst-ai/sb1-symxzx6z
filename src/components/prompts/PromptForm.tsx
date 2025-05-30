import React, { useState, useEffect } from 'react';
import { Prompt } from '../../types';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { X, Plus } from 'lucide-react';

interface PromptFormProps {
  prompt?: Prompt;
  onSave: (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(prompt?.title || '');
  const [description, setDescription] = useState(prompt?.description || '');
  const [text, setText] = useState(prompt?.text || '');
  const [comments, setComments] = useState(prompt?.comments || '');
  const [tags, setTags] = useState<string[]>(prompt?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!text.trim()) newErrors.text = 'Prompt text is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSave({
      title: title.trim(),
      description: description.trim(),
      text,
      comments,
      tags
    });
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Give your prompt a descriptive title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Brief description of what this prompt does"
        />
      </div>
      
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <div className="flex items-center">
          <input
            id="tags"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add tag and press Enter"
          />
          <Button
            type="button"
            onClick={handleAddTag}
            className="rounded-l-none"
            icon={<Plus size={16} />}
            aria-label="Add tag"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(tag => (
            <Tag
              key={tag}
              label={tag}
              onRemove={() => removeTag(tag)}
            />
          ))}
          {tags.length === 0 && (
            <p className="text-sm text-gray-500">No tags added yet</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Prompt Text *
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className={`w-full px-3 py-2 border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.text ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your prompt text here..."
        />
        {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text}</p>}
      </div>
      
      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
          Notes / Comments
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add any notes or tips for using this prompt effectively"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
        >
          {prompt ? 'Update Prompt' : 'Create Prompt'}
        </Button>
      </div>
    </form>
  );
};