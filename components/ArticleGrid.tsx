import React from 'react';
import { ArticleCard } from './ArticleCard';
import type { Article } from '../types';
import { AdSenseUnit } from './AdSenseUnit';

interface ArticleGridProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, onSelectArticle }) => {
  
  const articlesWithAds: React.ReactNode[] = [];
  articles.forEach((article, index) => {
    articlesWithAds.push(
      <ArticleCard key={article.id} article={article} onSelectArticle={onSelectArticle} />
    );
    // Insert an ad unit after the 4th article
    if (index === 3) {
      articlesWithAds.push(<AdSenseUnit key="ad-unit-1" />);
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articlesWithAds}
    </div>
  );
};