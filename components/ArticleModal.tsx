import React, { useState } from 'react';
import type { Article, Comment } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { CommentSection } from './CommentSection';
import { ShareIcon } from './icons/ShareIcon';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (author: string, content: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, comments, onAddComment }) => {
  const imageUrl = `https://picsum.photos/seed/${article.id}/800/400`;
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.summary,
      url: window.location.href, // In a real app, this would be the article's specific URL
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide message after 2 seconds
      } catch (err) {
        console.error("Failed to copy:", err);
        alert("فشل نسخ الرابط.");
      }
    }
  };


  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-blue-900/50 w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={imageUrl} alt={article.title} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
          <button 
            onClick={onClose} 
            className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors"
            aria-label="إغلاق"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-grow">
            <span className="text-sm font-semibold text-blue-300 bg-blue-900/60 px-3 py-1 rounded-full self-start mb-4 inline-block">{article.category}</span>
            <h2 className="text-3xl font-extrabold text-white mb-4">{article.title}</h2>
            
            <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-strong:text-blue-300 max-w-none text-lg leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: article.fullContent.replace(/\n/g, '<br />') }} />
        
            <CommentSection comments={comments} onAddComment={onAddComment} />
        </div>
        
        <div className="p-6 bg-gray-900/50 border-t border-blue-500/20 mt-auto flex items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm hidden sm:block">أداة: <span className="font-bold text-white">{article.toolName}</span></p>
                <div className="relative">
                    <button
                        onClick={handleShare}
                        className="p-3 sm:p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                        aria-label="مشاركة المقال"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </button>
                    {copied && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-600 text-white text-xs rounded-md whitespace-nowrap animate-fade-in">
                            تم نسخ الرابط!
                        </div>
                    )}
                </div>
            </div>
            <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30"
            >
                {article.cta}
                <ExternalLinkIcon className="w-5 h-5" />
            </a>
        </div>
      </div>
       <style jsx>{`
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.4s ease-out forwards;
            }
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(4px) translateX(-50%); }
                to { opacity: 1; transform: translateY(0) translateX(-50%); }
            }
            .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
};
