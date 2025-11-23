export interface Article {
  id: number;
  toolName: string;
  title: string;
  summary: string;
  category: string;
  fullContent: string;
  cta: string;
}

export interface SeoPlan {
  seo: string;
  googleDiscover: string;
  socialMedia: string;
}

export interface BlogData {
  articles: Article[];
  seoPlan: SeoPlan;
  keywords: string[];
}

export interface SummarizedContent {
  keyFeatures: string[];
  benefits: string[];
  targetAudience: string;
  pricing: string;
  seoSummary: string;
}

export interface Comment {
  id: string;
  articleId: number;
  author: string;
  content: string;
  timestamp: string;
}