
import { mockBlogData } from '../data/mockData';
import type { BlogData } from '../types';

export const fetchMockBlogData = (): Promise<BlogData> => {
  return new Promise((resolve) => {
    // Simulate a network delay of 500ms
    setTimeout(() => {
      resolve(mockBlogData);
    }, 500);
  });
};
