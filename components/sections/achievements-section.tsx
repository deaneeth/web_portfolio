'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Filter, Award, Medal, BookOpen, GraduationCap, DollarSign } from 'lucide-react';
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

  return (
    <section id="achievements" className="py-24 bg-black">
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
            className="flex flex-wrap justify-center items-center gap-8 text-center"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                {stats.certificates} Certificates
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                {stats.awards} Awards
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                {stats.competitions} Competitions
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                {stats.publications} Publications
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Achievements Carousel */}
        {featuredAchievements.length > 0 && (
          <div className="max-w-7xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Featured Achievements</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span>Top accomplishments</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAchievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  featured={true}
                  onClick={() => handleAchievementClick(achievement)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Achievements Section */}
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {Object.entries(categoryLabels).map(([key, label], index) => {
              const IconComponent = categoryIcons[key as CategoryFilter];
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(key as CategoryFilter)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm border ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-lg'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AchievementCard
                    achievement={achievement}
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