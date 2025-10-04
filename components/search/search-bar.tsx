'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  FileText,
  FolderOpen,
  Mail,
  Trophy,
  Briefcase,
  Clock,
  ArrowRight,
  Command,
  BookOpen
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'page' | 'project' | 'service' | 'achievement' | 'article';
  href: string;
}

const searchableContent: SearchResult[] = [
  // Pages
  { id: '1', title: 'Homepage', description: 'Main landing page featuring overview and quick stats', category: 'page', href: '/' },
  { id: '2', title: 'Featured Work', description: 'Deep-dive case studies of AI/ML and CS projects', category: 'page', href: '/work' },
  { id: '3', title: 'Creative Services', description: 'AI solutions, automation, web apps, and design consulting', category: 'page', href: '/services' },
  { id: '4', title: 'Achievement Wall', description: 'Certifications, awards, and milestones', category: 'page', href: '/achievements' },
  { id: '5', title: 'Get in Touch', description: 'Contact form and collaboration opportunities', category: 'page', href: '/contact' },
  { id: '6', title: 'Articles', description: 'Technical articles and blog posts', category: 'page', href: '/articles' },

  // Projects (example data - can be expanded)
  { id: '7', title: 'Neural Style Transfer Engine', description: 'AI-powered image transformation system', category: 'project', href: '/work#neural-style' },
  { id: '8', title: 'Machine Learning Pipeline', description: 'End-to-end ML automation system', category: 'project', href: '/work#ml-pipeline' },
  { id: '9', title: 'AI Chat Assistant', description: 'Intelligent conversational AI with NLP', category: 'project', href: '/work#ai-chat' },

  // Services
  { id: '10', title: 'AI/ML Solutions', description: 'Custom machine learning model development', category: 'service', href: '/services#ai-ml' },
  { id: '11', title: 'Automation Services', description: 'Workflow automation and process optimization', category: 'service', href: '/services#automation' },
  { id: '12', title: 'Web Development', description: 'Full-stack web application development', category: 'service', href: '/services#web-dev' },

  // Achievements
  { id: '13', title: 'Google Cloud ML Engineer', description: 'Professional certification in ML engineering', category: 'achievement', href: '/achievements#google-ml' },
  { id: '14', title: 'AWS Solutions Architect', description: 'Cloud architecture certification', category: 'achievement', href: '/achievements#aws' },

  // Articles
  { id: '15', title: 'The Future of AI in Creative Industries', description: 'Exploring AI and creativity intersection', category: 'article', href: '/articles#ai-creative' },
  { id: '16', title: 'Building Scalable ML Systems', description: 'Best practices for production ML', category: 'article', href: '/articles#scalable-ml' },
];

const categoryConfig = {
  page: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  project: { icon: FolderOpen, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  service: { icon: Briefcase, color: 'text-green-500', bg: 'bg-green-500/10' },
  achievement: { icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  article: { icon: BookOpen, color: 'text-teal-500', bg: 'bg-teal-500/10' },
};

interface SearchBarProps {
  isCollapsed?: boolean;
}

export function SearchBar({ isCollapsed = false }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Handle keyboard shortcuts (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = searchableContent.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    setSearchResults(results);
  }, [searchQuery]);

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const updated = [result.title, ...recentSearches.filter(s => s !== result.title)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    // Navigate to result
    window.location.href = result.href;
    handleClose();
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Group results by category
  const groupedResults = searchResults.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <>
      {/* Search Trigger */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-auto"
      >
        <button
          onClick={handleSearchClick}
          className="w-full p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-all duration-300 flex items-center gap-2 group"
          aria-label="Open search"
        >
          <Search className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          {!isCollapsed && (
            <>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1 text-left">
                Search...
              </span>
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <Command className="h-3 w-3" />K
              </kbd>
            </>
          )}
        </button>
      </motion.div>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
            >
              <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-border">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search pages, projects, services, and more..."
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={handleClose}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Search Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {searchQuery.trim() === '' ? (
                    // Recent Searches or Empty State
                    <div className="p-4">
                      {recentSearches.length > 0 ? (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Recent Searches</span>
                            </div>
                            <button
                              onClick={clearRecentSearches}
                              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                              Clear
                            </button>
                          </div>
                          <div className="space-y-1">
                            {recentSearches.map((search, index) => (
                              <button
                                key={index}
                                onClick={() => handleRecentSearchClick(search)}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p className="text-sm">Start typing to search...</p>
                          <p className="text-xs mt-1">Search through all pages, projects, and content</p>
                        </div>
                      )}

                      {/* Quick Links */}
                      <div className="mt-6">
                        <div className="text-xs text-muted-foreground mb-2 font-medium">QUICK LINKS</div>
                        <div className="grid grid-cols-2 gap-2">
                          {['/', '/work', '/services', '/contact'].map((href) => {
                            const item = searchableContent.find(c => c.href === href);
                            if (!item) return null;
                            const config = categoryConfig[item.category];
                            const Icon = config.icon;

                            return (
                              <a
                                key={href}
                                href={href}
                                onClick={handleClose}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors group"
                              >
                                <div className={`p-1.5 rounded-md ${config.bg}`}>
                                  <Icon className={`h-3 w-3 ${config.color}`} />
                                </div>
                                <span className="text-xs font-medium">{item.title}</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    // Search Results
                    <div className="p-2">
                      {Object.entries(groupedResults).map(([category, results]) => {
                        const config = categoryConfig[category as keyof typeof categoryConfig];
                        const Icon = config.icon;

                        return (
                          <div key={category} className="mb-4 last:mb-0">
                            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                              {category}s ({results.length})
                            </div>
                            <div className="space-y-1">
                              {results.map((result) => (
                                <motion.button
                                  key={result.id}
                                  onClick={() => handleResultClick(result)}
                                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors group"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-md ${config.bg} flex-shrink-0`}>
                                      <Icon className={`h-4 w-4 ${config.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                                        {result.title}
                                      </div>
                                      <div className="text-xs text-muted-foreground line-clamp-1">
                                        {result.description}
                                      </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // No Results
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm font-medium">No results found</p>
                      <p className="text-xs mt-1">Try searching for something else</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-border bg-muted/30">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">↑↓</kbd>
                        <span>Navigate</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">↵</kbd>
                        <span>Select</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">ESC</kbd>
                        <span>Close</span>
                      </div>
                    </div>
                    <span>{searchResults.length} results</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
