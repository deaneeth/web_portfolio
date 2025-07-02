'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  ExternalLink,
  Award,
  CheckCircle,
  Share2,
  Download,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Achievement, formatDate, categoryIcons } from '@/lib/achievements';

interface AchievementModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementModal({ achievement, isOpen, onClose }: AchievementModalProps) {
  if (!achievement) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: achievement.title,
        text: `Check out my ${achievement.title} from ${achievement.issuer}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/95 border border-gray-800/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                  {categoryIcons[achievement.category]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white line-clamp-1">
                    {achievement.title}
                  </h2>
                  <p className="text-gray-400 text-sm">{achievement.issuer}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Share2 className="h-5 w-5" />
                </motion.button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Achievement Badge */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative inline-block"
                >
                  <img
                    src={achievement.badgeImage}
                    alt={achievement.title}
                    className="w-32 h-32 object-cover rounded-2xl border-4 border-white/20 shadow-2xl mx-auto"
                  />
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-50"
                    style={{ 
                      boxShadow: `0 0 40px ${achievement.glowColor}`,
                    }}
                  ></div>
                  
                  {/* Featured Badge */}
                  {achievement.featured && (
                    <div className="absolute -top-2 -right-2">
                      <motion.div
                        className="featured-badge bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
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
                </motion.div>
              </div>

              {/* Achievement Details */}
              <div className="space-y-6">
                {/* Issuer Info */}
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={achievement.issuerLogo}
                      alt={achievement.issuer}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{achievement.issuer}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(achievement.dateAwarded)}</span>
                      </div>
                    </div>
                  </div>

                  {achievement.verificationUrl && (
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-white font-semibold mb-3">About This Achievement</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Skills Demonstrated</h4>
                  <div className="flex flex-wrap gap-2">
                    {achievement.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-800/50">
                  {achievement.verificationUrl && (
                    <Button
                      className="flex-1 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold hover:scale-105 transition-all duration-300"
                      asChild
                    >
                      <a
                        href={achievement.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Certificate
                      </a>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-white/10"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Achievement
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}