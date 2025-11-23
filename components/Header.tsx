
import React from 'react';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { SearchIcon } from './icons/SearchIcon';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-blue-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <BrainCircuitIcon className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            مدونة أدوات الذكاء الاصطناعي
          </h1>
        </div>
        <div className="relative w-full sm:w-auto sm:max-w-xs">
          <input
            type="text"
            placeholder="ابحث عن أداة..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};
