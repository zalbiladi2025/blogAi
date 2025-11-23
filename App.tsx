import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ArticleGrid } from './components/ArticleGrid';
import { ArticleModal } from './components/ArticleModal';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CATEGORIES } from './constants';
import type { Article, BlogData, SummarizedContent, Comment } from './types';
import { summarizeContent } from './services/geminiService';
import { fetchMockBlogData } from './services/mockApiService';
import { SummarizationModule } from './components/SummarizationModule';
import { NewsletterSubscription } from './components/NewsletterSubscription';
import { AdminPage } from './components/AdminPage';

const App: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [route, setRoute] = useState(window.location.hash);


  // State for summarizer
  const [summarizerInput, setSummarizerInput] = useState<string>('');
  const [summary, setSummary] = useState<SummarizedContent | null>(null);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [summarizerError, setSummarizerError] = useState<string | null>(null);

  // State for newsletter
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchMockBlogData();
        setBlogData(data);
        setError(null);
      } catch (err) {
        setError('فشل في جلب البيانات. يرجى المحاولة مرة أخرى لاحقاً.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const loadComments = () => {
        try {
            const storedComments = localStorage.getItem('blogComments');
            if (storedComments) {
                setComments(JSON.parse(storedComments));
            }
        } catch (error) {
            console.error("Failed to load comments from localStorage:", error);
        }
    };
    
    const handleHashChange = () => {
        setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    loadData();
    loadComments();

    return () => {
        window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleAddComment = (articleId: number, author: string, content: string) => {
    const newComment: Comment = {
      id: `${new Date().toISOString()}-${Math.random()}`,
      articleId,
      author,
      content,
      timestamp: new Date().toISOString(),
    };

    const updatedComments = {
      ...comments,
      [articleId]: [...(comments[articleId] || []), newComment],
    };

    setComments(updatedComments);
    try {
        localStorage.setItem('blogComments', JSON.stringify(updatedComments));
    } catch (error) {
        console.error("Failed to save comments to localStorage:", error);
    }
  };

  const filteredArticles = useMemo(() => {
    if (!blogData) return [];

    let articles = blogData.articles;

    // Filter by category
    if (selectedCategory !== 'الكل') {
      articles = articles.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
        const lowercasedQuery = searchQuery.toLowerCase();
        articles = articles.filter(article => 
            article.title.toLowerCase().includes(lowercasedQuery) ||
            article.toolName.toLowerCase().includes(lowercasedQuery) ||
            article.summary.toLowerCase().includes(lowercasedQuery)
        );
    }
    
    return articles;
  }, [blogData, selectedCategory, searchQuery]);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  const handleSummarize = async () => {
    if (!summarizerInput.trim()) {
        setSummarizerError('الرجاء إدخال نص للتلخيص.');
        return;
    }
    setIsSummarizing(true);
    setSummarizerError(null);
    setSummary(null);
    try {
        const result = await summarizeContent(summarizerInput);
        setSummary(result);
    // FIX: Added opening brace for the catch block and corrected the syntax.
    } catch (err) {
        setSummarizerError('حدث خطأ أثناء التلخيص. يرجى المحاولة مرة أخرى.');
        console.error(err);
    } finally {
        setIsSummarizing(false);
    }
  };

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
        setSubscriptionMessage({ text: 'الرجاء إدخال بريد إلكتروني صالح.', type: 'error' });
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
        setSubscriptionMessage({ text: 'صيغة البريد الإلكتروني غير صحيحة.', type: 'error' });
        return;
    }

    setIsSubscribing(true);
    setSubscriptionMessage(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would handle success/error from your API
    setSubscriptionMessage({ text: 'شكراً لاشتراكك! سيصلك كل جديد قريباً.', type: 'success' });
    setNewsletterEmail('');
    setIsSubscribing(false);
  };

  if (route === '#/admin') {
      if (loading) return <LoadingSpinner />;
      if (error) return <p className="text-center text-red-400 text-xl">{error}</p>;
      return blogData ? <AdminPage seoPlan={blogData.seoPlan} keywords={blogData.keywords} /> : null;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        {loading && <LoadingSpinner />}
        {error && <p className="text-center text-red-400 text-xl">{error}</p>}
        
        {blogData && !loading && !error && (
          <>
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <ArticleGrid articles={filteredArticles} onSelectArticle={handleSelectArticle} />
            
            <SummarizationModule
                input={summarizerInput}
                onInputChange={setSummarizerInput}
                onSummarize={handleSummarize}
                summary={summary}
                isLoading={isSummarizing}
                error={summarizerError}
            />
            
            <NewsletterSubscription
              email={newsletterEmail}
              onEmailChange={setNewsletterEmail}
              onSubmit={handleNewsletterSubscribe}
              isLoading={isSubscribing}
              message={subscriptionMessage}
            />
          </>
        )}
      </main>
      
      {selectedArticle && (
        <ArticleModal 
            article={selectedArticle} 
            onClose={handleCloseModal}
            comments={comments[selectedArticle.id] || []}
            onAddComment={(author, content) => handleAddComment(selectedArticle.id, author, content)}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;