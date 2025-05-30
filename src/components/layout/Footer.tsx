import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} AI Prompt Organizer
          </p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a 
              href="#" 
              className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
              aria-label="GitHub repository"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};