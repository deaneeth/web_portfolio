export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  readingTime: number;
  author: {
    name: string;
    avatar: string;
    bio: string;
    mediumUrl?: string;
  };
  image: {
    url: string;
    alt: string;
  };
  mediumUrl?: string;
  views: number;
  likes: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
  };
}

// Mock data for demonstration - replace with your actual data source
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Creative Industries: A Sri Lankan Perspective',
    excerpt: 'Exploring how artificial intelligence is reshaping creative work in South Asia, from traditional art forms to modern digital expression.',
    content: `# The Future of AI in Creative Industries

Artificial intelligence is not just transforming technology—it's revolutionizing how we create, express, and connect with our cultural heritage...

## The Intersection of Tradition and Innovation

In Sri Lanka, we have a unique opportunity to blend our rich cultural traditions with cutting-edge AI technology...`,
    publishedAt: '2024-12-15',
    featured: true,
    published: true,
    tags: ['AI/ML', 'Creative Tech', 'Sri Lanka', 'Innovation'],
    readingTime: 8,
    author: {
      name: 'Dineth',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      bio: 'AI/ML Explorer & Creative Technologist',
      mediumUrl: 'https://medium.com/@dineth'
    },
    image: {
      url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'AI and Creative Technology'
    },
    mediumUrl: 'https://medium.com/@dineth/ai-creative-industries',
    views: 1250,
    likes: 89,
    seo: {
      metaTitle: 'The Future of AI in Creative Industries - Dineth',
      metaDescription: 'Exploring how AI is reshaping creative work in South Asia',
      keywords: ['AI', 'Creative Industries', 'Sri Lanka', 'Technology']
    }
  },
  {
    id: '2',
    title: 'Building Neural Networks with TensorFlow: A Beginner\'s Journey',
    excerpt: 'My experience learning deep learning fundamentals and building my first neural network from scratch.',
    content: `# Building Neural Networks with TensorFlow

Starting my journey into deep learning was both exciting and overwhelming...`,
    publishedAt: '2024-12-10',
    featured: true,
    published: true,
    tags: ['AI/ML', 'TensorFlow', 'Tutorial', 'Deep Learning'],
    readingTime: 12,
    author: {
      name: 'Dineth',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      bio: 'AI/ML Explorer & Creative Technologist'
    },
    image: {
      url: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Neural Networks and Deep Learning'
    },
    mediumUrl: 'https://medium.com/@dineth/tensorflow-beginners',
    views: 890,
    likes: 67,
    seo: {
      metaTitle: 'Building Neural Networks with TensorFlow - Dineth',
      metaDescription: 'A beginner\'s guide to deep learning with TensorFlow',
      keywords: ['TensorFlow', 'Neural Networks', 'Deep Learning', 'AI']
    }
  },
  {
    id: '3',
    title: 'සිංහල කවියේ නව යුගය: Digital Poetry and Cultural Expression',
    excerpt: 'How digital platforms are giving new life to Sinhala poetry and connecting young Sri Lankans with their literary heritage.',
    content: `# සිංහල කවියේ නව යුගය

Digital technology is opening new avenues for Sinhala poetry...`,
    publishedAt: '2024-12-05',
    featured: false,
    published: true,
    tags: ['Poetry', 'Sinhala Literature', 'Culture', 'Digital Art'],
    readingTime: 6,
    author: {
      name: 'Dineth',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      bio: 'AI/ML Explorer & Creative Technologist'
    },
    image: {
      url: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Digital Poetry and Culture'
    },
    views: 456,
    likes: 34,
    seo: {
      metaTitle: 'සිංහල කවියේ නව යුගය - Dineth',
      metaDescription: 'Digital poetry and cultural expression in Sri Lanka',
      keywords: ['Sinhala Poetry', 'Digital Art', 'Culture', 'Sri Lanka']
    }
  },
  {
    id: '4',
    title: 'The Psychology of User Experience: Lessons from 5,000+ Client Projects',
    excerpt: 'Insights gained from working with thousands of clients on presentation design and what it taught me about human psychology.',
    content: `# The Psychology of User Experience

After working with over 5,000 clients on Fiverr...`,
    publishedAt: '2024-11-28',
    featured: false,
    published: true,
    tags: ['UX Design', 'Psychology', 'Business', 'Freelancing'],
    readingTime: 10,
    author: {
      name: 'Dineth',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      bio: 'AI/ML Explorer & Creative Technologist'
    },
    image: {
      url: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'User Experience and Psychology'
    },
    mediumUrl: 'https://medium.com/@dineth/ux-psychology',
    views: 723,
    likes: 52,
    seo: {
      metaTitle: 'The Psychology of User Experience - Dineth',
      metaDescription: 'UX insights from 5,000+ client projects',
      keywords: ['UX Design', 'Psychology', 'User Experience', 'Design']
    }
  },
  {
    id: '5',
    title: 'Cloud Architecture for AI Applications: AWS vs Azure',
    excerpt: 'Comparing cloud platforms for deploying machine learning models and AI applications at scale.',
    content: `# Cloud Architecture for AI Applications

When deploying AI applications at scale...`,
    publishedAt: '2024-11-20',
    featured: false,
    published: true,
    tags: ['Cloud Computing', 'AWS', 'Azure', 'AI/ML', 'DevOps'],
    readingTime: 15,
    author: {
      name: 'Dineth',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      bio: 'AI/ML Explorer & Creative Technologist'
    },
    image: {
      url: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Cloud Architecture'
    },
    views: 634,
    likes: 41,
    seo: {
      metaTitle: 'Cloud Architecture for AI Applications - Dineth',
      metaDescription: 'Comparing AWS vs Azure for AI deployment',
      keywords: ['Cloud Computing', 'AWS', 'Azure', 'AI', 'DevOps']
    }
  },
  {
    id: '6',
    title: 'Reflections on University Life: A Computer Science Journey',
    excerpt: 'Personal thoughts on studying Computer Science at University of Plymouth, Sri Lanka, and the lessons learned along the way.',
    content: `# Reflections on University Life

My journey through Computer Science at University of Plymouth...`,
    publishedAt: '2024-11-15',
    featured: false,
    published: true,
    tags: ['University', 'Personal', 'Computer Science', 'Education'],
    readingTime: 7,
    author: {
      name: 'Dineth',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      bio: 'AI/ML Explorer & Creative Technologist'
    },
    image: {
      url: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'University Life'
    },
    views: 389,
    likes: 28,
    seo: {
      metaTitle: 'University Life Reflections - Dineth',
      metaDescription: 'Computer Science journey at University of Plymouth',
      keywords: ['University', 'Computer Science', 'Education', 'Personal']
    }
  }
];

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured && post.published);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published).sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id && post.published);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.published && post.tags.includes(tag)
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach(post => {
    if (post.published) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

export function getRelatedPosts(currentPostId: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostById(currentPostId);
  if (!currentPost) return [];

  const relatedPosts = blogPosts
    .filter(post => 
      post.published && 
      post.id !== currentPostId &&
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .sort((a, b) => {
      const aCommonTags = a.tags.filter(tag => currentPost.tags.includes(tag)).length;
      const bCommonTags = b.tags.filter(tag => currentPost.tags.includes(tag)).length;
      return bCommonTags - aCommonTags;
    })
    .slice(0, limit);

  return relatedPosts;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}