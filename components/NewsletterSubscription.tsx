
import React from 'react';
import { MailIcon } from './icons/MailIcon';

interface NewsletterSubscriptionProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  message: { text: string; type: 'success' | 'error' } | null;
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  email,
  onEmailChange,
  onSubmit,
  isLoading,
  message,
}) => {
  return (
    <section className="my-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white">
          ابق على اطلاع دائم
        </h2>
        <p className="text-gray-300 mt-2 mb-6">
          اشترك في قائمتنا البريدية للحصول على أحدث أدوات ومقالات الذكاء الاصطناعي مباشرة في بريدك الإلكتروني.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-900/70 border-2 border-gray-700 rounded-full text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/30 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isLoading ? 'جاري الاشتراك...' : 'اشترك الآن'}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message.text}
          </p>
        )}
      </div>
    </section>
  );
};
