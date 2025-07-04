'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Filter, Award, Medal, BookOpen, GraduationCap, DollarSign, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AchievementCard } from '@/components/achievements/achievement-card';
import { AchievementModal } from '@/components/achievements/achievement-modal';
import { 
  getAllAchievements, 
  getFeaturedAchievements, 
  getAchievementsByCategory,
  getAchievementStats,
  Achievement,
  categoryLabels 
} from '@/lib/achievements';

type CategoryFilter = 'all' | 'certificate' | 'award' | 'competition' | 'publication' | 'scholarship';
type ViewMode = 'compact' | 'detailed';

const categoryIcons = {
  all: Award,
  certificate: GraduationCap,
  award: Trophy,
  competition: Medal,
  publication: BookOpen,
  scholarship: DollarSign
};

export function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('compact');

  const allAchievements = getAllAchievements();
  const featuredAchievements = getFeaturedAchievements();
  const stats = getAchievementStats();

  const filteredAchievements = useMemo(() => {
    return getAchievementsByCategory(selectedCategory);
  }, [selectedCategory]);

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Handle ESC key
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Grid classes based on view mode
  const getGridClasses = () => {
    if (viewMode === 'compact') {
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
    }
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
  };

  return (
    <section id="achievements" className="py-24 bg-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div 
              className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl mr-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Trophy className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Achievements <span className="projects-gradient-text">Wall</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            A showcase of milestones, certifications, and recognitions earned throughout my journey
          </p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-6 text-center"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                {stats.certificates} Certificates
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                {stats.awards} Awards
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                {stats.competitions} Competitions
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                {stats.publications} Publications
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* All Achievements Section */}
        <div className="max-w-7xl mx-auto">
          {/* Controls Row: Category Filters + View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {Object.entries(categoryLabels).map(([key, label], index) => {
                const IconComponent = categoryIcons[key as CategoryFilter];
                return (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(key as CategoryFilter)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-lg'
                        : 'bg-white/[0.03] text-gray-300 border-white/[0.1] hover:bg-white/[0.06] hover:border-white/[0.2]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4" />
                      <span>{label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-center">
              <div className="flex bg-white/[0.03] border border-white/[0.1] rounded-xl p-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setViewMode('compact')}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    viewMode === 'compact' 
                      ? 'bg-teal-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                  <span className="text-sm font-medium">Compact</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setViewMode('detailed')}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    viewMode === 'detailed' 
                      ? 'bg-teal-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span className="text-sm font-medium">Detailed</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            layout
            className={`grid ${getGridClasses()}`}
          >
            <AnimatePresence mode="wait">
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <AchievementCard
                    achievement={achievement}
                    viewMode={viewMode}
                    onClick={() => handleAchievementClick(achievement)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results State */}
          {filteredAchievements.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="p-4 bg-gray-800/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No achievements found</h3>
              <p className="text-gray-400 mb-6">
                Try selecting a different category
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory('all')}
                className="border-gray-600 text-gray-300 hover:bg-white/10"
              >
                Show All Achievements
              </Button>
            </motion.div>
          )}

          {/* Achievement Count */}
          {filteredAchievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8"
            >
              <p className="text-gray-500 text-sm">
                Showing {filteredAchievements.length} achievement{filteredAchievements.length !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && ` in ${categoryLabels[selectedCategory].toLowerCase()}`}
              </p>
            </motion.div>
          )}
        </div>

        {/* Achievement Modal */}
        <AchievementModal
          achievement={selectedAchievement}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}