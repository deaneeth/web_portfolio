'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Achievement, formatDate, categoryIcons } from '@/lib/achievements';

interface AchievementCardProps {
  achievement: Achievement;
  featured?: boolean;
  viewMode?: 'compact' | 'detailed';
  onClick: () => void;
}

export function AchievementCard({ 
  achievement, 
  featured = false, 
  viewMode = 'detailed',
  onClick 
}: AchievementCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (viewMode === 'compact') {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -2,
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        className="group relative bg-white/[0.02] border border-white/[0.08] rounded-lg overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 h-20"
        style={{ boxShadow: 'none' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 4px 20px ${achievement.glowColor}`;
          e.currentTarget.style.borderColor = achievement.color + '40';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        }}
        onClick={onClick}
      >
        {/* Featured indicator - tiny star */}
        {achievement.featured && (
          <div className="absolute top-1 right-1">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: achievement.color }}
            />
          </div>
        )}

        <div className="p-2 h-full flex items-center space-x-2">
          {/* Issuer logo - tiny circular */}
          <img
            src={achievement.issuerLogo}
            alt={achievement.issuer}
            className="w-4 h-4 rounded-full object-cover border border-white/10 flex-shrink-0"
            loading="lazy"
          />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Title - single line */}
            <h3 className="font-medium text-white text-xs leading-tight truncate group-hover:text-gray-100 transition-colors">
              {achievement.title}
            </h3>
            
            {/* Issuer + Date */}
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="text-gray-400 text-xs truncate flex-1">
                {achievement.issuer}
              </span>
              <span className="text-gray-500 text-xs flex-shrink-0">
                {formatDate(achievement.dateAwarded)}
              </span>
            </div>

            {/* Tags - minimal */}
            <div className="flex items-center space-x-1 mt-1">
              {achievement.skills.slice(0, 1).map((skill) => (
                <span
                  key={skill}
                  className="text-xs text-gray-400 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.05]"
                >
                  {skill}
                </span>
              ))}
              {achievement.skills.length > 1 && (
                <span className="text-xs text-gray-500">
                  +{achievement.skills.length - 1}
                </span>
              )}
            </div>
          </div>

          {/* Right side indicators */}
          <div className="flex flex-col items-center space-y-1 flex-shrink-0">
            {/* Verification check */}
            {achievement.verificationUrl && (
              <CheckCircle className="h-3 w-3 text-green-400" />
            )}
            
            {/* Category icon */}
            <div className="text-xs opacity-60">
              {categoryIcons[achievement.category]}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: achievement.color }}
        />
      </motion.article>
    );
  }

  // Detailed view (original layout)
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className={`group relative bg-gray-900/80 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-2xl ${
        featured ? 'lg:col-span-1' : ''
      }`}
      style={{ boxShadow: 'none' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 60px ${achievement.glowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={onClick}
    >
      {/* Featured Badge */}
      {achievement.featured && (
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            className="featured-badge bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
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
      )}

      {/* Achievement Badge/Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-48' : 'h-40'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={achievement.badgeImage}
              alt={achievement.title}
              className="w-24 h-24 object-cover rounded-xl border-2 border-white/20 shadow-lg"
              loading="lazy"
            />
            <div 
              className="absolute inset-0 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              style={{ 
                boxShadow: `0 0 30px ${achievement.glowColor}`,
              }}
            ></div>
          </motion.div>
        </div>
        
        {/* Category Icon */}
        <div className="absolute top-4 left-4">
          <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-lg">
            {categoryIcons[achievement.category]}
          </div>
        </div>

        {/* Verification Badge */}
        {achievement.verificationUrl && (
          <div className="absolute bottom-4 left-4">
            <motion.div
              className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle className="h-3 w-3" />
              <span>Verified</span>
            </motion.div>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {achievement.verificationUrl && (
            <motion.a
              href={achievement.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glassy-button p-2 rounded-lg hover:scale-110 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4 text-white" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Achievement Content */}
      <div className="p-6">
        {/* Issuer Info */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={achievement.issuerLogo}
            alt={achievement.issuer}
            className="w-8 h-8 rounded-lg object-cover border border-gray-700"
          />
          <div className="flex-1">
            <p className="text-gray-400 text-sm font-medium">{achievement.issuer}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(achievement.dateAwarded)}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-200 line-clamp-2 ${
          featured ? 'text-xl' : 'text-lg'
        }`}>
          {achievement.title}
        </h3>

        {/* Description */}
        <p className={`text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-200 ${
          featured ? 'text-sm line-clamp-3' : 'text-sm line-clamp-2'
        }`}>
          {achievement.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {achievement.skills.slice(0, featured ? 4 : 3).map((skill) => (
            <motion.div
              key={skill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant="secondary"
                className="bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 transition-colors text-xs cursor-pointer"
              >
                {skill}
              </Badge>
            </motion.div>
          ))}
          {achievement.skills.length > (featured ? 4 : 3) && (
            <Badge
              variant="secondary"
              className="bg-white/5 text-gray-300 border-white/10 text-xs"
            >
              +{achievement.skills.length - (featured ? 4 : 3)}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Click to view details</span>
          
          {achievement.verificationUrl && (
            <motion.a
              href={achievement.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors text-sm flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              <span>Verify</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-opacity duration-200 opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: achievement.color }}
      ></div>
    </motion.article>
  );
}