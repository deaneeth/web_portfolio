'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';
import { Achievement, formatDate } from '@/lib/achievements';

interface AchievementTooltipProps {
  achievement: Achievement | null;
  position: { x: number; y: number };
  isVisible: boolean;
}

export function AchievementTooltip({ achievement, position, isVisible }: AchievementTooltipProps) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div 
            className="bg-gray-900/95 border border-gray-700/50 rounded-xl p-4 backdrop-blur-md shadow-2xl max-w-xs"
            style={{
              boxShadow: `0 8px 32px ${achievement.glowColor}`,
            }}
          >
            {/* Header */}
            <div className="flex items-start space-x-3 mb-3">
              <img
                src={achievement.issuerLogo}
                alt={achievement.issuer}
                className="w-8 h-8 rounded-lg object-cover border border-gray-600"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm line-clamp-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-400 text-xs">
                  {achievement.issuer}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span className="text-gray-300 text-xs">
                {formatDate(achievement.dateAwarded)}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-3">
              {achievement.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {achievement.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {achievement.skills.length > 3 && (
                <span className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs">
                  +{achievement.skills.length - 3}
                </span>
              )}
            </div>

            {/* Featured Badge */}
            {achievement.featured && (
              <div className="flex items-center space-x-1 mt-3 pt-3 border-t border-gray-700/50">
                <Award className="h-3 w-3 text-orange-400" />
                <span className="text-orange-400 text-xs font-medium">Featured</span>
              </div>
            )}

            {/* Tooltip Arrow */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid rgba(17, 24, 39, 0.95)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}