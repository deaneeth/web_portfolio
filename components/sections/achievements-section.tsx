'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Trophy, Filter, Award, Medal, BookOpen, GraduationCap, DollarSign, Grid, Map, Calendar, User } from 'lucide-react';
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
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const roadmapRef = useRef<HTMLDivElement>(null);
  const roadmapContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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
    return selectedCategory === 'all' ? achievements : achievements.filter(a => a.category === selectedCategory);
  }, [selectedCategory, viewMode, chronologicalAchievements, allAchievements]);

  // Get unique years for sidebar navigation
  const years = useMemo(() => {
    const yearSet = new Set(filteredAchievements.map(a => new Date(a.dateAwarded).getFullYear()));
    return Array.from(yearSet).sort((a, b) => a - b);
  }, [filteredAchievements]);

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
    if (achievement.featured) return; // Don't show tooltip for featured achievements
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

  const scrollToYear = (year: number) => {
    const yearAchievements = filteredAchievements.filter(a => 
      new Date(a.dateAwarded).getFullYear() === year
    );
    if (yearAchievements.length === 0) return;

    const firstAchievementIndex = filteredAchievements.findIndex(a => 
      new Date(a.dateAwarded).getFullYear() === year
    );
    
    if (roadmapContainerRef.current) {
      const targetY = firstAchievementIndex * 120; // Reduced spacing
      roadmapContainerRef.current.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  };

  // Generate SVG path for winding road with reduced spacing
  const generateRoadPath = (achievements: Achievement[]) => {
    if (achievements.length === 0) return '';
    
    const spacing = 120; // Reduced from 200
    const height = achievements.length * spacing;
    const width = 400;
    const centerX = width / 2;
    
    let path = `M ${centerX} 0`;
    
    achievements.forEach((_, index) => {
      const y = (index + 1) * spacing;
      const amplitude = 60; // Reduced amplitude
      const frequency = 0.03;
      const offsetX = Math.sin(y * frequency) * amplitude;
      
      if (index === 0) {
        path += ` L ${centerX + offsetX * 0.5} ${y}`;
      } else {
        path += ` Q ${centerX + offsetX} ${y - spacing/2} ${centerX + offsetX * 0.5} ${y}`;
      }
    });
    
    return path;
  };

  // Parallax effect for road
  const roadY = useTransform(smoothProgress, [0, 1], [0, -50]);
  const roadRotate = useTransform(smoothProgress, [0, 1], [0, 2]);

  // Avatar position along the road
  const avatarProgress = useTransform(smoothProgress, [0, 1], [0, filteredAchievements.length - 1]);

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

  // Update active year based on scroll position
  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((latest) => {
      const currentIndex = Math.floor(latest * filteredAchievements.length);
      if (currentIndex >= 0 && currentIndex < filteredAchievements.length) {
        const currentYear = new Date(filteredAchievements[currentIndex].dateAwarded).getFullYear();
        setActiveYear(currentYear);
      }
    });

    return unsubscribe;
  }, [smoothProgress, filteredAchievements]);

  return (
    <section id="achievements" className="py-24 bg-black relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
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
              Achievement <span className="projects-gradient-text">Journey</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Follow my path through milestones, certifications, and recognitions
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
                <span>Journey</span>
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
            <div className="flex gap-8">
              {/* Year Navigation Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="hidden lg:block sticky top-24 h-fit"
              >
                <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-4 text-sm">Jump to Year</h3>
                  <div className="space-y-2">
                    {years.map((year) => (
                      <motion.button
                        key={year}
                        onClick={() => scrollToYear(year)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                          activeYear === year
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">{year}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Roadmap View */}
              <motion.div
                ref={roadmapRef}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-1 relative"
              >
                <div 
                  ref={roadmapContainerRef}
                  className="relative overflow-x-auto lg:overflow-x-visible"
                  style={{ minHeight: `${filteredAchievements.length * 120 + 200}px` }}
                >
                  {/* Road SVG with parallax */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl"
                    style={{ y: roadY, rotateZ: roadRotate }}
                  >
                    <svg
                      width="100%"
                      height={filteredAchievements.length * 120 + 200}
                      viewBox={`0 0 400 ${filteredAchievements.length * 120 + 200}`}
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
                        strokeWidth="8"
                        fill="none"
                        filter="url(#roadGlow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />

                      {/* Year markers on the road */}
                      {years.map((year, yearIndex) => {
                        const yearAchievements = filteredAchievements.filter(a => 
                          new Date(a.dateAwarded).getFullYear() === year
                        );
                        if (yearAchievements.length === 0) return null;

                        const firstIndex = filteredAchievements.findIndex(a => 
                          new Date(a.dateAwarded).getFullYear() === year
                        );
                        const y = firstIndex * 120 + 60;
                        const amplitude = 60;
                        const frequency = 0.03;
                        const offsetX = Math.sin(y * frequency) * amplitude;

                        return (
                          <motion.g
                            key={year}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: yearIndex * 0.2 + 1 }}
                          >
                            <circle
                              cx={200 + offsetX * 0.5}
                              cy={y}
                              r="20"
                              fill="rgba(0, 0, 0, 0.8)"
                              stroke="url(#roadGradient)"
                              strokeWidth="2"
                            />
                            <text
                              x={200 + offsetX * 0.5}
                              y={y + 5}
                              textAnchor="middle"
                              fill="white"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              {year}
                            </text>
                          </motion.g>
                        );
                      })}
                    </svg>
                  </motion.div>

                  {/* Traveling Avatar */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
                    style={{
                      y: useTransform(avatarProgress, [0, filteredAchievements.length - 1], [60, filteredAchievements.length * 120 + 60])
                    }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 0 20px rgba(249, 115, 22, 0.5)',
                          '0 0 30px rgba(249, 115, 22, 0.8)',
                          '0 0 20px rgba(249, 115, 22, 0.5)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <User className="h-6 w-6 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Achievement Milestones */}
                  <div className="relative z-20 space-y-8 pt-16">
                    {filteredAchievements.map((achievement, index) => {
                      const y = index * 120;
                      const amplitude = 60;
                      const frequency = 0.03;
                      const offsetX = Math.sin(y * frequency) * amplitude;
                      const isLeft = offsetX < 0;
                      const isFeatured = achievement.featured;
                      
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 100
                          }}
                          viewport={{ once: true, margin: "-100px" }}
                          className={`flex items-center ${isLeft ? 'flex-row-reverse' : 'flex-row'} relative`}
                          style={{ 
                            paddingLeft: isLeft ? '0' : `${Math.max(220 + offsetX, 50)}px`,
                            paddingRight: isLeft ? `${Math.max(220 - offsetX, 50)}px` : '0'
                          }}
                        >
                          {/* Achievement Content Card */}
                          {isFeatured ? (
                            /* Full Card for Featured Achievements */
                            <motion.div
                              whileHover={{ scale: 1.02, y: -4 }}
                              className={`bg-gray-900/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm max-w-md cursor-pointer ${
                                isLeft ? 'mr-8' : 'ml-8'
                              }`}
                              style={{
                                boxShadow: `0 8px 32px ${achievement.glowColor}`,
                              }}
                              onClick={() => handleAchievementClick(achievement)}
                            >
                              <div className="flex items-start space-x-4">
                                <img
                                  src={achievement.issuerLogo}
                                  alt={achievement.issuer}
                                  className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="text-lg font-bold text-white">
                                      {achievement.title}
                                    </h3>
                                    <motion.div
                                      className="px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-xs font-semibold"
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
                          ) : (
                            /* Mini Card for Non-Featured Achievements */
                            <motion.div
                              whileHover={{ scale: 1.05, y: -2 }}
                              className={`bg-gray-900/60 border border-gray-800/30 rounded-xl p-3 backdrop-blur-sm max-w-xs cursor-pointer ${
                                isLeft ? 'mr-6' : 'ml-6'
                              }`}
                              style={{
                                boxShadow: `0 4px 16px ${achievement.glowColor}`,
                              }}
                              onClick={() => handleAchievementClick(achievement)}
                              onMouseEnter={(e) => handleMouseEnter(achievement, e)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  src={achievement.issuerLogo}
                                  alt={achievement.issuer}
                                  className="w-8 h-8 rounded-lg object-cover border border-gray-700"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-white truncate">
                                    {achievement.title}
                                  </h4>
                                  <p className="text-xs text-gray-400 truncate">
                                    {achievement.issuer}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(achievement.dateAwarded).getFullYear()}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Milestone Marker */}
                          <motion.div
                            className="relative z-30 cursor-pointer"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleAchievementClick(achievement)}
                          >
                            <div
                              className={`${isFeatured ? 'w-20 h-20' : 'w-12 h-12'} rounded-full border-4 border-white/20 flex items-center justify-center relative overflow-hidden`}
                              style={{ 
                                backgroundColor: categoryColors[achievement.category],
                                boxShadow: `0 0 ${isFeatured ? '30' : '20'}px ${achievement.glowColor}`,
                              }}
                            >
                              <img
                                src={achievement.badgeImage}
                                alt={achievement.title}
                                className={`${isFeatured ? 'w-12 h-12' : 'w-8 h-8'} object-cover rounded-lg`}
                              />
                              
                              {isFeatured && (
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
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
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

        {/* Tooltip for Mini Cards */}
        <AchievementTooltip
          achievement={hoveredAchievement ? allAchievements.find(a => a.id === hoveredAchievement) : null}
          position={tooltipPosition}
          isVisible={!!hoveredAchievement}
        />
      </div>
    </section>
  );
}