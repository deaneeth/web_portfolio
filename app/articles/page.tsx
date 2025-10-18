'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Search, Loader2, ExternalLink, X } from 'lucide-react';
import { articles as localArticles } from '@/data/articles/articlesDetailed';
import { Article } from '@/data/types';

// Constants
const ARTICLES_PER_PAGE = 6;
const ARTICLE_CATEGORIES = ['All', 'AI', 'Machine Learning', 'Creative Tech', 'Culture', 'Tutorial', 'Cloud', 'Design'];

// Extended Article type for external sources
interface ExtendedArticle extends Article {
  source?: 'local' | 'medium' | 'substack';
  externalUrl?: string;
}

// Merged Article type for handling articles from multiple sources
interface MergedArticle extends Omit<ExtendedArticle, 'source' | 'externalUrl'> {
  sources: Array<{
    platform: 'local' | 'medium' | 'substack';
    url: string;
  }>;
}

// Reusable Article Card Component
interface ArticleCardProps {
  article: MergedArticle;
  index: number;
}

function ArticleCard({ article, index }: ArticleCardProps) {
  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-border transition-all duration-300"
    >
      {/* Content Section */}
      <div className="flex-1 space-y-4">
        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Calendar className="w-4 h-4" />
          <time dateTime={article.date}>{article.date}</time>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="text-xl md:text-2xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300"
        >
          {article.title}
        </motion.h2>

        {/* Platform Badges (Clickable) */}
        {article.sources.length > 0 && article.sources.some(s => s.platform !== 'local') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.35 }}
            className="flex items-center gap-2 flex-wrap"
          >
            {article.sources.map((sourceInfo, idx) => {
              if (sourceInfo.platform === 'local') return null;
              
              return (
                <motion.button
                  key={`${sourceInfo.platform}-${idx}`}
                  onClick={() => handlePlatformClick(sourceInfo.url)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                    sourceInfo.platform === 'medium'
                      ? 'bg-white text-black hover:shadow-md border border-border/20'
                      : 'text-white hover:shadow-md'
                  }`}
                  style={sourceInfo.platform === 'substack' ? { backgroundColor: '#FF6719' } : {}}
                >
                  {sourceInfo.platform === 'medium' ? 'Medium' : 'Substack'}
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Read Time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Clock className="w-4 h-4" />
          <span>{article.readTime}</span>
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
        className="w-full md:w-32 lg:w-40 h-32 md:h-24 lg:h-28 flex-shrink-0"
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
      </motion.div>
    </motion.article>
  );
}

// Main Articles Page Component
export default function ArticlesPage() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedCount, setDisplayedCount] = useState(ARTICLES_PER_PAGE);
  const [allArticles, setAllArticles] = useState<MergedArticle[]>([]);
  const [isLoadingExternal, setIsLoadingExternal] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Function to merge duplicate articles by title
  const mergeArticles = (articles: ExtendedArticle[]): MergedArticle[] => {
    const articleMap = new Map<string, MergedArticle>();

    articles.forEach(article => {
      const normalizedTitle = article.title.trim().toLowerCase();
      
      if (articleMap.has(normalizedTitle)) {
        // Article already exists, add this source to it
        const existing = articleMap.get(normalizedTitle)!;
        const newSource = {
          platform: article.source || 'local',
          url: article.externalUrl || article.link
        };
        
        // Check if this platform is not already added
        const platformExists = existing.sources.some(s => s.platform === newSource.platform);
        if (!platformExists) {
          existing.sources.push(newSource);
        }
      } else {
        // New article, create merged version
        const merged: MergedArticle = {
          ...article,
          sources: [{
            platform: article.source || 'local',
            url: article.externalUrl || article.link
          }]
        };
        articleMap.set(normalizedTitle, merged);
      }
    });

    return Array.from(articleMap.values());
  };

  // Initialize articles with local data and fetch external articles
  useEffect(() => {
    const initializeArticles = async () => {
      // Add local articles
      const localArticlesWithSource: ExtendedArticle[] = localArticles.map(article => ({
        ...article,
        source: 'local' as const
      }));
      
      let combinedArticles = [...localArticlesWithSource];
      
      // Fetch external articles (Medium/Substack)
      try {
        setIsLoadingExternal(true);
        const { fetchAllExternalArticles } = await import('@/lib/utils/externalArticles');
        const externalArticles = await fetchAllExternalArticles();
        
        if (externalArticles.length > 0) {
          combinedArticles = [...combinedArticles, ...externalArticles];
        }
      } catch (error) {
        console.error('Error fetching external articles:', error);
      } finally {
        setIsLoadingExternal(false);
      }

      // Merge duplicate articles
      const mergedArticles = mergeArticles(combinedArticles);
      setAllArticles(mergedArticles);
    };
    
    initializeArticles();
  }, []);

  // Extract unique categories from articles
  const availableCategories = useMemo(() => {
    const categories = new Set<string>(['All']);
    allArticles.forEach(article => {
      article.tags?.forEach(tag => categories.add(tag));
    });
    return Array.from(categories);
  }, [allArticles]);

  // Filter and search logic
  const filteredArticles = useMemo(() => {
    let filtered = [...allArticles];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article =>
        article.tags?.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query) ||
        article.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by date (latest first)
    return filtered.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [allArticles, selectedCategory, searchQuery]);

  // Displayed articles based on pagination
  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, displayedCount);
  }, [filteredArticles, displayedCount]);

  // Check if there are more articles to load
  const hasMore = displayedCount < filteredArticles.length;

  // Load more handler
  const handleLoadMore = () => {
    setDisplayedCount(prev => Math.min(prev + ARTICLES_PER_PAGE, filteredArticles.length));
  };

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayedCount(ARTICLES_PER_PAGE);
  }, [selectedCategory, searchQuery]);

  // Handle search expansion
  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
    setSearchQuery('');
  };

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        if (isSearchExpanded && !searchQuery) {
          setIsSearchExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchExpanded, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Articles
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Stay ahead of the curve with the latest in AI, technology innovation, and creative insights
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {/* Search Bar - Expandable */}
        <div className="flex justify-center">
          <div ref={searchContainerRef} className="relative">
            <AnimatePresence mode="wait">
              {!isSearchExpanded ? (
                // Search Icon Button
                <motion.button
                  key="search-button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleSearchClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-card/50 border border-border/50 rounded-xl hover:bg-card/80 hover:border-border transition-all duration-300"
                >
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Search</span>
                </motion.button>
              ) : (
                // Expanded Search Input
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  <div className="relative w-[280px] sm:w-[400px] md:w-[500px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search articles by title, keywords, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 bg-card/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 text-foreground placeholder:text-muted-foreground/60"
                    />
                  </div>
                  <motion.button
                    onClick={handleSearchClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category Filters - Horizontally Scrollable */}
        <div className="flex justify-center px-4">
          <div className="overflow-x-auto scrollbar-hide max-w-full">
            <div className="flex gap-2 pb-2 min-w-max px-1">
              {ARTICLE_CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground"
        >
          {isLoadingExternal ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading articles...</span>
            </div>
          ) : (
            <span>
              Showing {displayedArticles.length} of {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Articles List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {displayedArticles.length > 0 ? (
            displayedArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card text-center py-12"
            >
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== 'All'
                  ? 'No articles found matching your criteria. Try adjusting your filters or search query.'
                  : 'No articles available at the moment.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-8"
        >
          <motion.button
            onClick={handleLoadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all duration-300"
          >
            <span>Load More Articles</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="text-muted-foreground text-sm mt-4">
            {filteredArticles.length - displayedCount} more article{filteredArticles.length - displayedCount !== 1 ? 's' : ''} available
          </p>
        </motion.div>
      )}
    </div>
  );
}