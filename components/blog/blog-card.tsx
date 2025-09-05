'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Eye, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogPost, formatDate, formatReadingTime } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  onClick: () => void;
}

export function BlogCard({ post, featured = false, onClick }: BlogCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className={`group relative bg-gray-900/80 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-2xl ${
        featured ? 'lg:col-span-2' : ''
      }`}
      style={{ boxShadow: 'none' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={onClick}
    >
      {/* Featured Badge */}
      {post.featured && (
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            className="featured-badge bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
            animate={{
              boxShadow: [
                '0 0 10px rgba(249, 115, 22, 0.5)',
                '0 0 20px rgba(249, 115, 22, 0.8)',
                '0 0 10px rgba(249, 115, 22, 0.5)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            Featured
          </motion.div>
        </div>
      )}

      {/* Post Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
        <img
          src={post.image.url}
          alt={post.image.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        
        {/* Hover Actions */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-2 rounded-lg hover:scale-110 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="h-4 w-4 text-white" />
          </motion.div>
          {post.mediumUrl && (
            <motion.a
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-2 rounded-lg hover:scale-110 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4 text-white" />
            </motion.a>
          )}
        </div>

        {/* Stats Overlay */}
        <div className="absolute top-4 left-4 flex space-x-3">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 px-2 py-1 rounded-lg flex items-center space-x-1">
            <Eye className="h-3 w-3 text-white" />
            <span className="text-white text-xs">{post.views}</span>
          </div>
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 px-2 py-1 rounded-lg flex items-center space-x-1">
            <Heart className="h-3 w-3 text-red-400" />
            <span className="text-white text-xs">{post.likes}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatReadingTime(post.readingTime)}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-200 line-clamp-2 ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-200 ${
          featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
        }`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, featured ? 4 : 3).map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant="secondary"
                className="bg-gray-800/60 text-gray-300 border-gray-600/40 hover:bg-gray-700/80 transition-colors text-xs cursor-pointer"
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
          {post.tags.length > (featured ? 4 : 3) && (
            <Badge
              variant="secondary"
              className="bg-gray-800/60 text-gray-300 border-gray-600/40 text-xs"
            >
              +{post.tags.length - (featured ? 4 : 3)}
            </Badge>
          )}
        </div>

        {/* Author & Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full border border-gray-700"
            />
            <div>
              <p className="text-white text-sm font-medium">{post.author.name}</p>
              <p className="text-gray-400 text-xs">{post.author.bio}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 transition-colors"
          >
            Read More
          </Button>
        </div>

        {/* Medium Link */}
        {post.mediumUrl && (
          <div className="mt-4 pt-4 border-t border-gray-800/50">
            <a
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              <span>Also available on Medium</span>
            </a>
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 rounded-b-2xl transition-opacity duration-200 opacity-0 group-hover:opacity-100"></div>
    </motion.article>
  );
}