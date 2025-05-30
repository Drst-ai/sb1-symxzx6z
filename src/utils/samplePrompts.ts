import { Prompt } from '../types';
import { v4 as uuidv4 } from 'uuid';

const now = Date.now();

export const samplePrompts: Prompt[] = [
  {
    id: uuidv4(),
    title: 'Creative Story Writer',
    description: 'Generates creative short stories based on a few keywords',
    tags: ['creative', 'writing', 'stories'],
    text: 'Write a creative short story (300-500 words) based on the following keywords: [KEYWORDS]. Include a compelling character, an interesting setting, and a surprising twist at the end.',
    comments: 'Works best with 3-5 descriptive keywords. Great for creative inspiration.',
    createdAt: now - 7 * 24 * 60 * 60 * 1000,
    updatedAt: now - 5 * 24 * 60 * 60 * 1000
  },
  {
    id: uuidv4(),
    title: 'Code Refactoring Assistant',
    description: 'Helps improve and optimize existing code',
    tags: ['programming', 'coding', 'refactoring'],
    text: 'Review the following code and suggest improvements for readability, performance, and best practices without changing its core functionality:\n\n```\n[CODE]\n```',
    comments: 'Very helpful for learning better coding practices and understanding optimization techniques.',
    createdAt: now - 5 * 24 * 60 * 60 * 1000,
    updatedAt: now - 2 * 24 * 60 * 60 * 1000
  },
  {
    id: uuidv4(),
    title: 'Recipe Creator',
    description: 'Creates recipes based on available ingredients',
    tags: ['cooking', 'food', 'recipes'],
    text: 'Create a detailed recipe using only the following ingredients: [INGREDIENTS]. Include cooking instructions, approximate cooking time, difficulty level, and potential substitutions for common allergens.',
    comments: 'Great for meal planning and using up leftover ingredients.',
    createdAt: now - 3 * 24 * 60 * 60 * 1000,
    updatedAt: now - 3 * 24 * 60 * 60 * 1000
  },
  {
    id: uuidv4(),
    title: 'Learning Concept Explainer',
    description: 'Explains complex concepts in simple terms',
    tags: ['learning', 'education', 'explanation'],
    text: 'Explain [CONCEPT] as if you were teaching it to a [AGE] year old. Use simple language, helpful analogies, and break down complex ideas into manageable parts.',
    comments: 'Excellent for understanding difficult concepts or preparing to teach others.',
    createdAt: now - 1 * 24 * 60 * 60 * 1000,
    updatedAt: now - 12 * 60 * 60 * 1000
  }
];