'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Award, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  if (viewMode === 'compact') {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -4,
          transition: { duration: 0.2 }
        }}
        className="group relative bg-gray-900/80 border border-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-lg"
        style={{ boxShadow: 'none' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 24px ${achievement.glowColor}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
        onClick={onClick}
      >
        {/* Featured Badge - Smaller */}
        {achievement.featured && (
          <div className="absolute top-2 right-2 z-20">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm"
              animate={{
                boxShadow: [
                  '0 0 6px rgba(249, 115, 22, 0.4)',
                  '0 0 12px rgba(249, 115, 22, 0.6)',
                  '0 0 6px rgba(249, 115, 22, 0.4)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              ★
            </motion.div>
          </div>
        )}

        <div className="p-3">
          {/* Top Row: Badge Image + Category Icon */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <img
                src={achievement.badgeImage}
                alt={achievement.title}
                className="w-8 h-8 object-cover rounded-lg border border-gray-700"
                loading="lazy"
              />
              <div className="w-5 h-5 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center text-xs">
                {categoryIcons[achievement.category]}
              </div>
            </div>
            
            {/* Verification Badge */}
            {achievement.verificationUrl && (
              <div className="flex items-center space-x-1 text-green-400">
                <CheckCircle className="h-3 w-3" />
                <span className="text-xs font-medium">✓</span>
              </div>
            )}
          </div>

          {/* Title - Single Line */}
          <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-gray-100 transition-colors duration-200 line-clamp-1">
            {achievement.title}
          </h3>

          {/* Issuer + Date Row */}
          <div className="flex items-center space-x-2 mb-2">
            <img
              src={achievement.issuerLogo}
              alt={achievement.issuer}
              className="w-4 h-4 rounded object-cover border border-gray-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-xs font-medium truncate">{achievement.issuer}</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar className="h-2.5 w-2.5" />
                <span>{formatDate(achievement.dateAwarded)}</span>
              </div>
            </div>
          </div>

          {/* Skills - Max 2 + Counter */}
          <div className="flex flex-wrap gap-1 mb-2">
            {achievement.skills.slice(0, 2).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-white/5 text-gray-300 border-white/10 text-xs px-1.5 py-0.5 h-auto"
              >
                {skill}
              </Badge>
            ))}
            {achievement.skills.length > 2 && (
              <Badge
                variant="secondary"
                className="bg-white/5 text-gray-300 border-white/10 text-xs px-1.5 py-0.5 h-auto"
              >
                +{achievement.skills.length - 2}
              </Badge>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors p-1 h-auto text-xs"
            >
              <Award className="mr-1 h-3 w-3" />
              View
            </Button>
            
            {achievement.verificationUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 transition-colors p-1 h-auto text-xs"
                asChild
              >
                <a
                  href={achievement.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: achievement.color }}
        ></div>
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
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Award className="mr-2 h-4 w-4" />
            View Details
          </Button>
          
          {achievement.verificationUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 transition-colors"
              asChild
            >
              <a
                href={achievement.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Verify
              </a>
            </Button>
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