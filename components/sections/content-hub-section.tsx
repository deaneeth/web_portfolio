'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogModal } from '@/components/blog/blog-modal';
import { getFeaturedPosts, getAllPosts, BlogPost } from '@/lib/blog';

export function ContentHubSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredPosts = getFeaturedPosts();
  const allPosts = getAllPosts().slice(0, 6); // Show first 6 posts

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
    // Modal stays open, just changes content
  };

  return (
    <section id="content-hub" className="py-24 bg-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div 
              className="p-4 bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl mr-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <BookOpen className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Content <span className="projects-gradient-text">Hub</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Exploring the intersection of technology, creativity, and culture through writing
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="max-w-7xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Featured Articles</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span>Handpicked highlights</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  featured={index === 0}
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Latest Articles</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post)}
              />
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300"
              onClick={() => window.location.href = '/blog'}
            >
              <span>Explore All Articles</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-24"
        >
          <div className="relative bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-orange-500/10 border border-gray-800/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-orange-500/5 animate-gradient-x"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Get notified when I publish new articles about AI, technology, and creative expression
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
                <Button
                  className="bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                No spam, unsubscribe at any time
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blog Modal */}
      <BlogModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPostSelect={handlePostSelect}
      />
    </section>
  );
}