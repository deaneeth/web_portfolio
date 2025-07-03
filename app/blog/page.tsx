'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  BookOpen,
  Tag,
  ArrowLeft,
  SortAsc,
  Grid,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogModal } from '@/components/blog/blog-modal';
import { 
  getAllPosts, 
  getFeaturedPosts, 
  getAllTags, 
  getPostsByTag,
  BlogPost 
} from '@/lib/blog';

type SortOption = 'latest' | 'oldest' | 'most-viewed' | 'most-liked';
type ViewMode = 'grid' | 'list';

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const allTags = getAllTags();

  const filteredAndSortedPosts = useMemo(() => {
    let posts = allPosts;

    // Filter by search query
    if (searchQuery) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by tag
    if (selectedTag) {
      posts = getPostsByTag(selectedTag);
    }

    // Sort posts
    switch (sortBy) {
      case 'latest':
        posts = posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'oldest':
        posts = posts.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'most-viewed':
        posts = posts.sort((a, b) => b.views - a.views);
        break;
      case 'most-liked':
        posts = posts.sort((a, b) => b.likes - a.likes);
        break;
    }

    return posts;
  }, [allPosts, searchQuery, selectedTag, sortBy]);

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
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSortBy('latest');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <motion.div 
                  className="p-4 bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl mr-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookOpen className="h-8 w-8 text-white" />
                </motion.div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  Content <span className="projects-gradient-text">Hub</span>
                </h1>
              </div>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
                Exploring technology, creativity, and culture through thoughtful writing
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold stats-gradient-text">{allPosts.length}</div>
                  <div className="text-gray-400 text-sm">Articles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold stats-gradient-text">{allTags.length}</div>
                  <div className="text-gray-400 text-sm">Topics</div>
                </div>
                <div>
                  <div className="text-2xl font-bold stats-gradient-text">
                    {allPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Total Views</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-black">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Articles</h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
          </section>
        )}

        {/* Search and Filters */}
        <section className="py-8 bg-gray-900/50 border-y border-gray-800/50">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              {/* Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most-viewed">Most Viewed</option>
                    <option value="most-liked">Most Liked</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-teal-500 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-teal-500 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Filter Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="border-gray-600 text-gray-300 hover:bg-white/10"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              {/* Filter Tags */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-medium">Filter by Topic</h3>
                        {(selectedTag || searchQuery) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-gray-400 hover:text-white"
                          >
                            Clear All
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                          <motion.div
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge
                              variant={selectedTag === tag ? "default" : "secondary"}
                              className={`cursor-pointer transition-colors ${
                                selectedTag === tag
                                  ? 'bg-teal-500 text-white hover:bg-teal-600'
                                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                              }`}
                              onClick={() => handleTagClick(tag)}
                            >
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Filters */}
              {(selectedTag || searchQuery) && (
                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-gray-400 text-sm">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      Search: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery('')}
                        className="ml-2 hover:text-white"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedTag && (
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      Topic: {selectedTag}
                      <button
                        onClick={() => setSelectedTag(null)}
                        className="ml-2 hover:text-white"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* All Articles */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {selectedTag ? `Articles tagged "${selectedTag}"` : 'All Articles'}
                  <span className="text-gray-400 text-lg ml-2">
                    ({filteredAndSortedPosts.length})
                  </span>
                </h2>
              </div>

              {/* Articles Grid/List */}
              {filteredAndSortedPosts.length > 0 ? (
                <div className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredAndSortedPosts.map((post, index) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      onClick={() => handlePostClick(post)}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="p-4 bg-gray-800/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-gray-600 text-gray-300 hover:bg-white/10"
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Blog Modal */}
      <BlogModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPostSelect={handlePostSelect}
      />
    </div>
  );
}