'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { articles } from '@/data/articles/articlesDetailed';
import { Article } from '@/data/types';

// Reusable Article Card Component
interface ArticleCardProps {
  article: Article;
  index: number;
}

function ArticleCard({ article, index }: ArticleCardProps) {
  const handleReadClick = () => {
    window.location.href = article.link;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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

        {/* Read Time & Read Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>

          <motion.button
            onClick={handleReadClick}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all duration-300 group/btn"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Read</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
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
  // Sort articles by date (latest first)
  const sortedArticles = [...(articles || [])].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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

      {/* Articles List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {sortedArticles && sortedArticles.length > 0 ? (
          sortedArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
            />
          ))
        ) : (
          <div className="card text-center py-12">
            <p className="text-muted-foreground">No articles available at the moment.</p>
          </div>
        )}
      </motion.div>

      {/* Load More Section (Optional) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center pt-8"
      >
        <p className="text-muted-foreground text-sm">
          {sortedArticles.length} articles published
        </p>
      </motion.div>
    </div>
  );
}