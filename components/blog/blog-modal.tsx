'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  ExternalLink,
  ArrowLeft,
  MessageCircle,
  Bookmark,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost, formatDate, formatReadingTime, getRelatedPosts } from '@/lib/blog';
import { BlogCard } from './blog-card';

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onPostSelect: (post: BlogPost) => void;
}

export function BlogModal({ post, isOpen, onClose, onPostSelect }: BlogModalProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!post) return null;

  const relatedPosts = getRelatedPosts(post.id, 3);

  const handleLike = () => {
    setLiked(!liked);
    // Here you would typically update the like count in your backend
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // Here you would typically save to user's bookmarks
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
      copy: () => navigator.clipboard.writeText(window.location.href)
    };

    if (platform === 'copy') {
      shareUrls.copy();
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls] as string, '_blank');
    }
    setShowShareMenu(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/95 border border-gray-800/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden backdrop-blur-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-white line-clamp-1">
                    {post.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
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
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    liked 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-gray-800/50 text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    bookmarked 
                      ? 'bg-yellow-500/20 text-yellow-400' 
                      : 'bg-gray-800/50 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/80 transition-all duration-200"
                  >
                    <Share2 className="h-5 w-5" />
                  </motion.button>

                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        className="absolute right-0 top-12 bg-gray-800 border border-gray-700 rounded-lg p-2 min-w-[150px] z-10"
                      >
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                        >
                          Share on Twitter
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                        >
                          Share on LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                        >
                          Share on Facebook
                        </button>
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                        >
                          Copy Link
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Hero Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image.url}
                  alt={post.image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Featured Badge */}
                {post.featured && (
                  <div className="absolute top-4 right-4">
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

                {/* Stats */}
                <div className="absolute bottom-4 left-4 flex space-x-3">
                  <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 px-3 py-1 rounded-lg flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-white" />
                    <span className="text-white text-sm">{post.views} views</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 px-3 py-1 rounded-lg flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span className="text-white text-sm">{post.likes} likes</span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                {/* Author Info */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800/50">
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-700"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{post.author.name}</h3>
                      <p className="text-gray-400 text-sm">{post.author.bio}</p>
                    </div>
                  </div>

                  {post.mediumUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-white/10 hover:border-white/20"
                      asChild
                    >
                      <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Read on Medium
                      </a>
                    </Button>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <motion.div
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-gray-800/60 text-gray-300 border-gray-600/40 hover:bg-gray-700/80 transition-colors cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                {/* Article Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </div>
                </div>

                {/* Engagement Actions */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-800/50">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        liked 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                      <span>{post.likes + (liked ? 1 : 0)}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Comment</span>
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/80 transition-all duration-200"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </motion.button>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-16">
                    <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <BlogCard
                          key={relatedPost.id}
                          post={relatedPost}
                          onClick={() => onPostSelect(relatedPost)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}