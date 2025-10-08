import { Article } from '../types';

/**
 * Comprehensive articles collection with detailed metadata
 * Each article includes title, date, read time, cover image, and link
 */
export const articles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in Creative Industries: A Sri Lankan Perspective',
    date: 'December 15, 2024',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: '/blog#1',
    excerpt: 'Exploring how artificial intelligence is transforming creative work in developing nations, with insights from the Sri Lankan tech scene.',
    type: 'Article',
    description: 'Published new article on AI and creativity',
    tags: ['AI', 'Creativity', 'Industry Trends', 'Sri Lanka'],
    status: 'published',
    author: 'Dineth Hettiarachchi',
    slug: 'future-of-ai-creative-industries'
  },
  {
    id: '2',
    title: 'Building Neural Networks with TensorFlow: A Beginner\'s Journey',
    date: 'December 10, 2024',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: '/blog#2',
    excerpt: 'A comprehensive guide for beginners starting their journey with TensorFlow and deep learning, covering fundamental concepts and practical examples.',
    type: 'Article',
    description: 'A deep dive into TensorFlow for beginners',
    tags: ['TensorFlow', 'Deep Learning', 'Tutorial', 'Python'],
    status: 'published',
    author: 'Dineth Hettiarachchi',
    slug: 'building-neural-networks-tensorflow'
  },
  {
    id: '3',
    title: 'සිංහල කවියේ නව යුගය: Digital Poetry and Cultural Expression',
    date: 'December 5, 2024',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: '/blog#3',
    excerpt: 'Examining the intersection of traditional Sinhala poetry and modern digital platforms, exploring how technology preserves and evolves cultural heritage.',
    type: 'Article',
    description: 'Digital transformation of Sinhala poetry',
    tags: ['Culture', 'Poetry', 'Sinhala', 'Digital Art'],
    status: 'published',
    author: 'Dineth Hettiarachchi',
    slug: 'sinhala-poetry-digital-era'
  },
  {
    id: '4',
    title: 'The Psychology of User Experience: Lessons from 5,000+ Client Projects',
    date: 'November 28, 2024',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: '/blog#4',
    excerpt: 'Key psychological principles learned from working with thousands of clients, and how they influence effective UX design decisions.',
    type: 'Article',
    description: 'UX insights from extensive client work',
    tags: ['UX', 'Psychology', 'Design', 'Client Work'],
    status: 'published',
    author: 'Dineth Hettiarachchi',
    slug: 'psychology-of-user-experience'
  },
  {
    id: '5',
    title: 'Cloud Architecture for AI Applications: AWS vs Azure',
    date: 'November 20, 2024',
    readTime: '15 min read',
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: '/blog#5',
    excerpt: 'A detailed comparison of AWS and Azure cloud platforms for deploying and scaling AI/ML applications, with real-world performance benchmarks.',
    type: 'Article',
    description: 'Comparing cloud platforms for AI deployment',
    tags: ['AWS', 'Azure', 'Cloud', 'AI', 'Architecture'],
    status: 'published',
    author: 'Dineth Hettiarachchi',
    slug: 'cloud-architecture-ai-applications'
  }
];

/**
 * Get articles sorted by date (newest first)
 */
export const getArticlesSortedByDate = (): Article[] => {
  return [...articles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

/**
 * Get article by ID
 */
export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
};

/**
 * Get article by slug
 */
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

/**
 * Get published articles only
 */
export const getPublishedArticles = (): Article[] => {
  return articles.filter(article => article.status === 'published');
};

/**
 * Get articles by tag
 */
export const getArticlesByTag = (tag: string): Article[] => {
  return articles.filter(article => 
    article.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};
