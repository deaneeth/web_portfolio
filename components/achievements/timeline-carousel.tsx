'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ExternalLink, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Achievement, formatDate } from '@/lib/achievements';

interface TimelineCarouselProps {
  achievements: Achievement[];
  onAchievementClick: (achievement: Achievement) => void;
}

export function TimelineCarousel({ achievements, onAchievementClick }: TimelineCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const x = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 300 });

  // Sort achievements chronologically (oldest to newest)
  const sortedAchievements = [...achievements].sort((a, b) => 
    new Date(a.dateAwarded).getTime() - new Date(b.dateAwarded).getTime()
  );

  // Calculate scroll progress
  const scrollProgress = useTransform(springX, (value) => {
    if (!scrollRef.current) return 0;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    return Math.abs(value) / maxScroll;
  });

  // Set isClient to true and check mobile view after component mounts
  useEffect(() => {
    setIsClient(true);
    
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    const newScrollLeft = direction === 'left' 
      ? scrollRef.current.scrollLeft - scrollAmount
      : scrollRef.current.scrollLeft + scrollAmount;
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  // Handle wheel events for horizontal scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!scrollRef.current || !containerRef.current?.contains(e.target as Node)) return;
      
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      scrollRef.current.scrollLeft += delta;
      updateScrollButtons();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollTo('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollTo('right');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', updateScrollButtons);
      return () => scrollElement.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Timeline Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollTo('left')}
                className="w-12 h-12 rounded-full bg-gray-900/80 border border-gray-700/50 backdrop-blur-md hover:bg-gray-800/80 transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {canScrollRight && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollTo('right')}
                className="w-12 h-12 rounded-full bg-gray-900/80 border border-gray-700/50 backdrop-blur-md hover:bg-gray-800/80 transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Timeline */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide py-8 px-16"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="relative flex items-center space-x-8 min-w-max">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500/30 via-purple-500/30 to-orange-500/30 -translate-y-1/2"></div>

            {/* Achievement Points */}
            {sortedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative flex-shrink-0"
              >
                {/* Timeline Point */}
                <motion.div
                  className="relative z-10 w-6 h-6 rounded-full border-4 border-gray-900 cursor-pointer"
                  style={{ 
                    backgroundColor: achievement.color,
                    boxShadow: `0 0 20px ${achievement.glowColor}`
                  }}
                  whileHover={{ 
                    scale: 1.3,
                    boxShadow: `0 0 30px ${achievement.glowColor}`
                  }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => setHoveredId(achievement.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => onAchievementClick(achievement)}
                />

                {/* Achievement Card - Desktop/Tablet */}
                <AnimatePresence>
                  {(isClient && !isMobileView && hoveredId === achievement.id) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      transition={{ duration: 0.3, type: "spring" }}
                      className="absolute top-12 left-1/2 -translate-x-1/2 w-80 z-20"
                    >
                      <motion.div
                        className="bg-gray-900/95 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-md shadow-2xl cursor-pointer"
                        style={{
                          boxShadow: `0 20px 60px ${achievement.glowColor}`,
                        }}
                        whileHover={{ y: -4 }}
                        onClick={() => onAchievementClick(achievement)}
                      >
                        {/* Featured Badge */}
                        {achievement.featured && (
                          <div className="absolute -top-2 -right-2">
                            <motion.div
                              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
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
                              <Star className="h-3 w-3 inline mr-1 fill-current" />
                              Featured
                            </motion.div>
                          </div>
                        )}

                        {/* Header */}
                        <div className="flex items-start space-x-3 mb-4">
                          <img
                            src={achievement.issuerLogo}
                            alt={achievement.issuer}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-700"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold text-sm line-clamp-1 mb-1">
                              {achievement.title}
                            </h4>
                            <p className="text-gray-400 text-xs mb-1">{achievement.issuer}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(achievement.dateAwarded)}</span>
                            </div>
                          </div>
                          
                          {/* Verification Badge */}
                          {achievement.verificationUrl && (
                            <div className="flex-shrink-0">
                              <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs">
                                <CheckCircle className="h-3 w-3" />
                                <span>Verified</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {achievement.skills.slice(0, 2).map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="bg-white/5 text-gray-300 border-white/10 text-xs px-2 py-1"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {achievement.skills.length > 2 && (
                            <Badge
                              variant="secondary"
                              className="bg-white/5 text-gray-300 border-white/10 text-xs px-2 py-1"
                            >
                              +{achievement.skills.length - 2}
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-xs">Click for details</span>
                          {achievement.verificationUrl && (
                            <motion.a
                              href={achievement.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-3 w-3 text-gray-400" />
                            </motion.a>
                          )}
                        </div>

                        {/* Pointer */}
                        <div 
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b border-gray-800/50"
                          style={{ backgroundColor: 'rgb(17 24 39 / 0.95)' }}
                        ></div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile Card */}
                {isClient && isMobileView && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-72">
                    <motion.div
                      className="bg-gray-900/95 border border-gray-800/50 rounded-2xl p-4 backdrop-blur-md shadow-2xl cursor-pointer"
                      style={{
                        boxShadow: `0 20px 60px ${achievement.glowColor}`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onAchievementClick(achievement)}
                    >
                      {/* Featured Badge */}
                      {achievement.featured && (
                        <div className="absolute -top-1 -right-1">
                          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            <Star className="h-2 w-2 inline mr-1 fill-current" />
                          </div>
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-start space-x-3 mb-3">
                        <img
                          src={achievement.issuerLogo}
                          alt={achievement.issuer}
                          className="w-8 h-8 rounded-lg object-cover border border-gray-700"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold text-sm line-clamp-1 mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-gray-400 text-xs">{achievement.issuer}</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {achievement.skills.slice(0, 2).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-white/5 text-gray-300 border-white/10 text-xs px-2 py-1"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {achievement.skills.length > 2 && (
                          <Badge
                            variant="secondary"
                            className="bg-white/5 text-gray-300 border-white/10 text-xs px-2 py-1"
                          >
                            +{achievement.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 px-16">
          <div className="w-full h-1 bg-gray-800/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"
              style={{
                scaleX: useTransform(scrollProgress, [0, 1], [0.1, 1]),
                originX: 0
              }}
            />
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}