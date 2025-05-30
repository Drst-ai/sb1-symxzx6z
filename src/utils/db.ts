import { openDB, DBSchema } from 'idb';
import { Prompt } from '../types';
import { samplePrompts } from './samplePrompts';

interface PromptDB extends DBSchema {
  prompts: {
    key: string;
    value: Prompt;
    indexes: {
      'by-created-at': number;
      'by-updated-at': number;
      'by-title': string;
    };
  };
}

const DB_NAME = 'ai-prompt-organizer';
const DB_VERSION = 1;

export async function initDB() {
  const db = await openDB<PromptDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore('prompts', { keyPath: 'id' });
      store.createIndex('by-created-at', 'createdAt');
      store.createIndex('by-updated-at', 'updatedAt');
      store.createIndex('by-title', 'title');
    },
  });

  // Check if this is the first time and we need to add sample prompts
  const count = await db.count('prompts');
  if (count === 0) {
    const tx = db.transaction('prompts', 'readwrite');
    for (const prompt of samplePrompts) {
      await tx.store.add(prompt);
    }
    await tx.done;
  }

  return db;
}

export async function getAllPrompts() {
  const db = await initDB();
  return db.getAll('prompts');
}

export async function getPrompt(id: string) {
  const db = await initDB();
  return db.get('prompts', id);
}

export async function addPrompt(prompt: Prompt) {
  const db = await initDB();
  return db.add('prompts', prompt);
}

export async function updatePrompt(prompt: Prompt) {
  const db = await initDB();
  return db.put('prompts', prompt);
}

export async function deletePrompt(id: string) {
  const db = await initDB();
  return db.delete('prompts', id);
}

export async function exportPrompts() {
  const db = await initDB();
  const prompts = await db.getAll('prompts');
  return JSON.stringify(prompts, null, 2);
}

export async function importPrompts(jsonData: string) {
  try {
    const prompts = JSON.parse(jsonData) as Prompt[];
    const db = await initDB();
    const tx = db.transaction('prompts', 'readwrite');
    
    for (const prompt of prompts) {
      await tx.store.put(prompt);
    }
    
    await tx.done;
    return true;
  } catch (error) {
    console.error('Error importing prompts:', error);
    return false;
  }
}