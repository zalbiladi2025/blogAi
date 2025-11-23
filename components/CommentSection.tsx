import React, { useState } from 'react';
import type { Comment } from '../types';
import { MessageSquareIcon } from './icons/MessageSquareIcon';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (author: string, content: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      setError('الرجاء ملء حقلي الاسم والتعليق.');
      return;
    }
    onAddComment(author, content);
    setAuthor('');
    setContent('');
    setError('');
  };

  return (
    <div className="mt-12 pt-8 border-t border-blue-500/20">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
        <MessageSquareIcon className="w-7 h-7 text-blue-400" />
        التعليقات ({comments.length})
      </h3>
      
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="bg-gray-800/50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="اسمك"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <textarea
            placeholder="أضف تعليقك هنا..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-4"
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors duration-300 disabled:bg-gray-600"
            disabled={!author.trim() || !content.trim()}
          >
            أضف تعليقًا
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-4">لا توجد تعليقات بعد. كن أول من يعلّق!</p>
        ) : (
          [...comments].reverse().map((comment) => (
            <div key={comment.id} className="bg-gray-800/50 p-4 rounded-lg flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white flex-shrink-0">
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-bold text-blue-300">{comment.author}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
