'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award, Star, Search, Medal, FileCheck, Sparkles, ExternalLink, Calendar, Filter } from 'lucide-react';
import { achievements, achievementCategories } from '@/data/achievements/achievementsDetailed';

const categories = ['All', ...achievementCategories];

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAchievements = (achievements || []).filter(achievement => {
    const matchesCategory = selectedCategory === 'All' || achievement.category === selectedCategory;
    const matchesSearch = achievement.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (achievement.skills || []).some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Certification':
        return FileCheck;
      case 'Achievement':
        return Trophy;
      case 'Academic':
        return Award;
      case 'Competition':
        return Medal;
      default:
        return Star;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Certification':
        return 'from-indigo-500/40 via-purple-500/40 to-pink-500/40';
      case 'Achievement':
        return 'from-emerald-500/40 via-teal-500/40 to-green-500/40';
      case 'Academic':
        return 'from-blue-500/40 via-cyan-500/40 to-sky-500/40';
      case 'Competition':
        return 'from-orange-500/40 via-amber-500/40 to-yellow-500/40';
      default:
        return 'from-gray-500/40 to-gray-600/40';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Certification':
        return 'bg-purple-500/80';
      case 'Achievement':
        return 'bg-emerald-500/80';
      case 'Academic':
        return 'bg-blue-500/80';
      case 'Competition':
        return 'bg-orange-500/80';
      default:
        return 'bg-gray-500/80';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="page-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="page-title">Achievement Wall</h1>
          </div>
          <p className="page-subtitle">
            Certifications, awards, and milestones throughout my journey in AI/ML and technology.
          </p>
        </motion.div>
      </div>

      {/* Achievement Summary - Moved to Top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 magnetic"
        whileHover={{ y: -4 }}
        data-cursor-text="Summary"
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Achievement Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {(achievements || []).filter(a => a.category === 'Certification').length}
              </div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {(achievements || []).filter(a => a.category === 'Achievement').length}
              </div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {(achievements || []).filter(a => a.category === 'Academic').length}
              </div>
              <div className="text-sm text-muted-foreground">Academic</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {new Set((achievements || []).flatMap(a => a.skills || [])).size}
              </div>
              <div className="text-sm text-muted-foreground">Skills Validated</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all magnetic ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-text={category}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-muted/50 border border-border text-foreground placeholder-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-full px-4 py-2.5 pl-10 w-full sm:w-64 transition-all magnetic"
            data-cursor-text="Search"
          />
        </div>
      </motion.div>

      {/* All Achievements - Modern Compact Cards */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-bold">All Achievements</h2>
          <span className="text-sm text-muted-foreground px-4 py-1.5 bg-muted/50 rounded-full">
            {filteredAchievements.length} achievement{filteredAchievements.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement, index) => {
              const CardIcon = getCategoryIcon(achievement.category);
              
              return (
                <motion.a
                  key={achievement.id}
                  href={achievement.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.05) }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${getCategoryGradient(achievement.category)} p-[1px] cursor-pointer magnetic`}
                  data-cursor-text="View"
                >
                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Card Content */}
                  <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl p-4 h-full flex flex-col">
                    {/* Top Badge */}
                    <div className="flex items-start justify-between mb-2.5">
                      <span className={`${getCategoryBadgeColor(achievement.category)} text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5`}>
                        <CardIcon className="w-3 h-3" />
                        {achievement.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-base text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs text-muted-foreground mb-2.5">
                      by <span className="font-medium text-foreground">{achievement.issuer}</span>
                    </p>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground/80 line-clamp-2 mb-3 flex-grow">
                      {achievement.description}
                    </p>

                    {/* Verify Link */}
                    <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-border/30">
                      <span className="text-xs text-muted-foreground/70">ID: {achievement.credentialId}</span>
                      <motion.div
                        className="flex items-center gap-1 text-xs font-medium text-primary/90"
                        whileHover={{ x: 2 }}
                      >
                        Verify
                        <ExternalLink className="w-3 h-3" />
                      </motion.div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-br ${getCategoryGradient(achievement.category)} blur-xl transition-opacity duration-300 pointer-events-none`} />
                  </div>
                </motion.a>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No achievements found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}