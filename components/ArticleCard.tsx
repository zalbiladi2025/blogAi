
import React from 'react';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelectArticle }) => {
  const imageUrl = `https://picsum.photos/seed/${article.id}/500/300`;

  return (
    <div
      onClick={() => onSelectArticle(article)}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer group flex flex-col h-full"
    >
      <img src={imageUrl} alt={article.title} className="w-full h-40 object-cover" />
      <div className="p-5 flex-grow flex flex-col">
        <span className="text-xs font-semibold text-blue-400 bg-blue-900/50 px-2 py-1 rounded-full self-start mb-2">{article.category}</span>
        <h3 className="text-lg font-bold text-white mb-2 flex-grow group-hover:text-blue-300 transition-colors">{article.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{article.summary}</p>
      </div>
    </div>
  );
};
