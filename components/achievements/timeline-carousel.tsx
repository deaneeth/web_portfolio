'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useDragControls } from 'framer-motion';
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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [visibleAchievements, setVisibleAchievements] = useState<Set<string>>(new Set());

  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 300, restDelta: 0.001 });

  // Sort achievements chronologically (oldest to newest)
  const sortedAchievements = [...achievements].sort((a, b) => 
    new Date(a.dateAwarded).getTime() - new Date(b.dateAwarded).getTime()
  );

  // Calculate timeline dimensions
  const CARD_WIDTH = 320;
  const CARD_SPACING = 80;
  const TIMELINE_WIDTH = sortedAchievements.length * (CARD_WIDTH + CARD_SPACING);

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

  // Calculate scroll progress
  const scrollProgress = useTransform(springX, (value) => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.clientWidth;
    const maxScroll = Math.max(0, TIMELINE_WIDTH - containerWidth);
    return maxScroll > 0 ? Math.abs(value) / maxScroll : 0;
  });

  // Update scroll buttons based on current position
  const updateScrollButtons = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const maxScroll = Math.max(0, TIMELINE_WIDTH - containerWidth);
    const currentScroll = Math.abs(x.get());
    
    setCanScrollLeft(currentScroll > 10);
    setCanScrollRight(currentScroll < maxScroll - 10);
  }, [x, TIMELINE_WIDTH]);

  // Scroll to specific position
  const scrollTo = useCallback((direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const scrollAmount = Math.min(containerWidth * 0.8, CARD_WIDTH * 2);
    const currentX = x.get();
    const maxScroll = Math.max(0, TIMELINE_WIDTH - containerWidth);
    
    let newX;
    if (direction === 'left') {
      newX = Math.min(0, currentX + scrollAmount);
    } else {
      newX = Math.max(-maxScroll, currentX - scrollAmount);
    }
    
    x.set(newX);
  }, [x, TIMELINE_WIDTH, CARD_WIDTH]);

  // Handle wheel events for horizontal scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return;
      
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      const currentX = x.get();
      const containerWidth = containerRef.current.clientWidth;
      const maxScroll = Math.max(0, TIMELINE_WIDTH - containerWidth);
      
      const newX = Math.max(-maxScroll, Math.min(0, currentX - delta));
      x.set(newX);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [x, TIMELINE_WIDTH]);

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
  }, [scrollTo]);

  // Update scroll buttons when x changes
  useEffect(() => {
    const unsubscribe = x.on('change', updateScrollButtons);
    return unsubscribe;
  }, [x, updateScrollButtons]);

  // Handle drag constraints
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const maxScroll = Math.max(0, TIMELINE_WIDTH - containerWidth);
    const currentX = x.get();
    
    // Snap to bounds
    if (currentX > 0) {
      x.set(0);
    } else if (currentX < -maxScroll) {
      x.set(-maxScroll);
    }
  }, [x, TIMELINE_WIDTH]);

  // Intersection Observer for animations
  useEffect(() => {
    if (!isClient || !timelineRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const achievementId = entry.target.getAttribute('data-achievement-id');
          if (achievementId) {
            setVisibleAchievements(prev => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(achievementId);
              } else {
                newSet.delete(achievementId);
              }
              return newSet;
            });
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.3,
        rootMargin: '50px'
      }
    );

    const achievementElements = timelineRef.current.querySelectorAll('[data-achievement-id]');
    achievementElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isClient, sortedAchievements]);

  if (!isClient) {
    return (
      <div className="w-full h-64 bg-gray-900/50 rounded-2xl animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading timeline...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" tabIndex={0}>
      {/* Navigation Arrows */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollTo('left')}
              className="w-12 h-12 rounded-full bg-gray-900/90 border border-gray-700/50 backdrop-blur-md hover:bg-gray-800/90 transition-all duration-300 shadow-xl hover:scale-110"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollTo('right')}
              className="w-12 h-12 rounded-full bg-gray-900/90 border border-gray-700/50 backdrop-blur-md hover:bg-gray-800/90 transition-all duration-300 shadow-xl hover:scale-110"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Container */}
      <div className="relative py-12 px-16">
        <motion.div
          ref={timelineRef}
          className="relative flex items-start"
          style={{ 
            x: springX,
            width: TIMELINE_WIDTH
          }}
          drag="x"
          dragControls={dragControls}
          dragConstraints={{
            left: -Math.max(0, TIMELINE_WIDTH - (containerRef.current?.clientWidth || 0)),
            right: 0
          }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: 'grabbing' }}
        >
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-teal-500/30 via-purple-500/30 via-orange-500/30 to-pink-500/30 -translate-y-1/2 rounded-full"></div>

          {/* Achievement Points */}
          {sortedAchievements.map((achievement, index) => {
            const isVisible = visibleAchievements.has(achievement.id);
            const isHovered = hoveredId === achievement.id;
            
            return (
              <motion.div
                key={achievement.id}
                data-achievement-id={achievement.id}
                className="relative flex-shrink-0"
                style={{ 
                  width: CARD_WIDTH,
                  marginRight: index < sortedAchievements.length - 1 ? CARD_SPACING : 0
                }}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0.3, 
                  y: isVisible ? 0 : 20, 
                  scale: isVisible ? 1 : 0.9 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: isVisible ? index * 0.1 : 0,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {/* Timeline Point */}
                <motion.div
                  className="relative z-20 w-8 h-8 rounded-full border-4 border-gray-900 cursor-pointer mx-auto"
                  style={{ 
                    backgroundColor: achievement.color,
                    boxShadow: `0 0 20px ${achievement.glowColor}`
                  }}
                  whileHover={{ 
                    scale: 1.4,
                    boxShadow: `0 0 40px ${achievement.glowColor}`,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => !isMobileView && setHoveredId(achievement.id)}
                  onHoverEnd={() => !isMobileView && setHoveredId(null)}
                  onClick={() => onAchievementClick(achievement)}
                  animate={{
                    boxShadow: isHovered 
                      ? `0 0 40px ${achievement.glowColor}` 
                      : `0 0 20px ${achievement.glowColor}`
                  }}
                />

                {/* Achievement Card */}
                <motion.div
                  className="absolute top-16 left-0 w-full z-10"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ 
                    opacity: isMobileView || isHovered ? 1 : 0.7,
                    y: isMobileView || isHovered ? 0 : 10,
                    scale: isMobileView || isHovered ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <motion.div
                    className="bg-gray-900/95 border border-gray-800/50 rounded-2xl p-5 backdrop-blur-md shadow-2xl cursor-pointer relative overflow-hidden"
                    style={{
                      boxShadow: isHovered 
                        ? `0 25px 80px ${achievement.glowColor}` 
                        : `0 15px 40px ${achievement.glowColor}`,
                    }}
                    whileHover={{ 
                      y: -6,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onAchievementClick(achievement)}
                  >
                    {/* Featured Badge */}
                    {achievement.featured && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <motion.div
                          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1"
                          animate={{
                            boxShadow: [
                              '0 0 10px rgba(249, 115, 22, 0.5)',
                              '0 0 25px rgba(249, 115, 22, 0.8)',
                              '0 0 10px rgba(249, 115, 22, 0.5)'
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        >
                          <Star className="h-3 w-3 fill-current" />
                          <span>Featured</span>
                        </motion.div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start space-x-3 mb-4">
                      <motion.img
                        src={achievement.issuerLogo}
                        alt={achievement.issuer}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-gray-700"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-base line-clamp-2 mb-2 leading-tight">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2 font-medium">{achievement.issuer}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(achievement.dateAwarded)}</span>
                        </div>
                      </div>
                      
                      {/* Verification Badge */}
                      {achievement.verificationUrl && (
                        <motion.div 
                          className="flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs border border-green-500/30">
                            <CheckCircle className="h-3 w-3" />
                            <span>Verified</span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {achievement.skills.slice(0, 3).map((skill) => (
                        <motion.div
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-white/5 text-gray-300 border-white/10 text-xs px-3 py-1 hover:bg-white/10 transition-colors"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                      {achievement.skills.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-white/5 text-gray-300 border-white/10 text-xs px-3 py-1"
                        >
                          +{achievement.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs font-medium">Click for full details</span>
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
                          <ExternalLink className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
                        </motion.a>
                      )}
                    </div>

                    {/* Gradient border effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${achievement.color}20, transparent, ${achievement.color}10)`,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 px-16">
        <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 rounded-full origin-left"
            style={{
              scaleX: useTransform(scrollProgress, [0, 1], [0.05, 1])
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>Oldest</span>
          <span className="text-gray-400 font-medium">
            {Math.round(scrollProgress.get() * 100)}% explored
          </span>
          <span>Newest</span>
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center mt-6 text-gray-500 text-sm"
      >
        {isMobileView ? (
          <span>Swipe left/right to explore • Tap points for details</span>
        ) : (
          <span>Scroll wheel or drag to explore • Hover points for preview • Click for details</span>
        )}
      </motion.div>
    </div>
  );
}