
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-8 flex justify-center flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
            ${selectedCategory === category
              ? 'bg-blue-500 text-white shadow-lg transform scale-105'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
