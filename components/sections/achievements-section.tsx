'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Trophy, Filter, Award, Medal, BookOpen, GraduationCap, DollarSign, Grid, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AchievementCard } from '@/components/achievements/achievement-card';
import { AchievementModal } from '@/components/achievements/achievement-modal';
import { AchievementTooltip } from '@/components/achievements/achievement-tooltip';
import { 
  getAllAchievements, 
  getFeaturedAchievements, 
  getAchievementsByCategory,
  getAchievementStats,
  Achievement,
  categoryLabels 
} from '@/lib/achievements';

type CategoryFilter = 'all' | 'certificate' | 'award' | 'competition' | 'publication' | 'scholarship';
type ViewMode = 'roadmap' | 'grid';

const categoryIcons = {
  all: Award,
  certificate: GraduationCap,
  award: Trophy,
  competition: Medal,
  publication: BookOpen,
  scholarship: DollarSign
};

const categoryColors = {
  certificate: '#14b8a6',
  award: '#f97316', 
  competition: '#a855f7',
  publication: '#3b82f6',
  scholarship: '#22c55e'
};

export function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('roadmap');
  const [hoveredAchievement, setHoveredAchievement] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const roadmapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start end", "end start"]
  });

  const allAchievements = getAllAchievements();
  const featuredAchievements = getFeaturedAchievements();
  const stats = getAchievementStats();

  // Sort achievements chronologically for roadmap
  const chronologicalAchievements = useMemo(() => {
    return [...allAchievements].sort((a, b) => 
      new Date(a.dateAwarded).getTime() - new Date(b.dateAwarded).getTime()
    );
  }, [allAchievements]);

  const filteredAchievements = useMemo(() => {
    const achievements = viewMode === 'roadmap' ? chronologicalAchievements : allAchievements;
    return getAchievementsByCategory(selectedCategory);
  }, [selectedCategory, viewMode, chronologicalAchievements, allAchievements]);

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

  const handleMouseEnter = (achievement: Achievement, event: React.MouseEvent) => {
    setHoveredAchievement(achievement.id);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setHoveredAchievement(null);
  };

  // Generate SVG path for winding road
  const generateRoadPath = (achievements: Achievement[]) => {
    if (achievements.length === 0) return '';
    
    const height = achievements.length * 200;
    const width = 400;
    const centerX = width / 2;
    
    let path = `M ${centerX} 0`;
    
    achievements.forEach((_, index) => {
      const y = (index + 1) * 200;
      const amplitude = 80;
      const frequency = 0.02;
      const offsetX = Math.sin(y * frequency) * amplitude;
      
      path += ` Q ${centerX + offsetX} ${y - 100} ${centerX + offsetX * 0.5} ${y}`;
    });
    
    return path;
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="achievements" className="py-24 bg-black relative overflow-hidden">
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
              Achievement <span className="projects-gradient-text">Roadmap</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Follow my journey through milestones, certifications, and recognitions
          </p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 text-center mb-8"
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

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('roadmap')}
                className={`flex items-center space-x-2 px-4 py-2 rounded transition-all duration-300 ${
                  viewMode === 'roadmap' 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Map className="h-4 w-4" />
                <span>Roadmap</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-2 px-4 py-2 rounded transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
                <span>Grid</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {viewMode === 'roadmap' ? (
            /* Roadmap View */
            <motion.div
              ref={roadmapRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Road SVG */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
                <svg
                  width="100%"
                  height={filteredAchievements.length * 200 + 100}
                  viewBox={`0 0 400 ${filteredAchievements.length * 200 + 100}`}
                  className="overflow-visible"
                >
                  <defs>
                    <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                      <stop offset="25%" stopColor="#f97316" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                      <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="roadGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <motion.path
                    d={generateRoadPath(filteredAchievements)}
                    stroke="url(#roadGradient)"
                    strokeWidth="6"
                    fill="none"
                    filter="url(#roadGlow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              {/* Achievement Milestones */}
              <div className="relative z-10 space-y-32 pt-16">
                {filteredAchievements.map((achievement, index) => {
                  const y = index * 200;
                  const amplitude = 80;
                  const frequency = 0.02;
                  const offsetX = Math.sin(y * frequency) * amplitude;
                  const isLeft = offsetX < 0;
                  
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                      className={`flex items-center ${isLeft ? 'flex-row-reverse' : 'flex-row'} relative`}
                      style={{ 
                        paddingLeft: isLeft ? '0' : `${200 + offsetX}px`,
                        paddingRight: isLeft ? `${200 - offsetX}px` : '0'
                      }}
                    >
                      {/* Achievement Content Card */}
                      <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        className={`bg-gray-900/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm max-w-md ${
                          isLeft ? 'mr-8' : 'ml-8'
                        }`}
                        style={{
                          boxShadow: `0 8px 32px ${achievement.glowColor}`,
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={achievement.issuerLogo}
                            alt={achievement.issuer}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">
                              {achievement.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">
                              {achievement.issuer}
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                              {achievement.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {achievement.skills.slice(0, 3).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Milestone Marker */}
                      <motion.div
                        className="relative z-20 cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAchievementClick(achievement)}
                        onMouseEnter={(e) => handleMouseEnter(achievement, e)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div
                          className={`w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center relative overflow-hidden ${
                            achievement.featured ? 'animate-pulse' : ''
                          }`}
                          style={{ 
                            backgroundColor: categoryColors[achievement.category],
                            boxShadow: `0 0 20px ${achievement.glowColor}`,
                          }}
                        >
                          <img
                            src={achievement.badgeImage}
                            alt={achievement.title}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          
                          {achievement.featured && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-orange-500"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                        </div>
                        
                        {/* Date Label */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <span className="text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">
                            {new Date(achievement.dateAwarded).getFullYear()}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Grid View */
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
          )}

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

        {/* Tooltip */}
        <AchievementTooltip
          achievement={hoveredAchievement ? allAchievements.find(a => a.id === hoveredAchievement) : null}
          position={tooltipPosition}
          isVisible={!!hoveredAchievement}
        />
      </div>
    </section>
  );
}