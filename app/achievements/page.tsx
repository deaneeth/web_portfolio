'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award, Star, Search, Medal, FileCheck, Sparkles, ExternalLink, Calendar, Filter } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Google Cloud ML Engineer Certification',
    description: 'Professional certification in machine learning engineering on Google Cloud Platform',
    category: 'Certification',
    date: '2024-11-15',
    issuer: 'Google Cloud',
    credentialId: 'GCP-ML-2024-001',
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['Machine Learning', 'Google Cloud', 'TensorFlow', 'MLOps'],
    featured: true
  },
  {
    id: 2,
    title: 'Top Rated Seller on Fiverr',
    description: 'Achieved Top Rated status serving 5,000+ clients with 99% satisfaction rate',
    category: 'Achievement',
    date: '2024-10-01',
    issuer: 'Fiverr',
    credentialId: 'FVR-TR-2024',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['Business', 'Client Relations', 'Design', 'Automation'],
    featured: true
  },
  {
    id: 3,
    title: 'AWS Solutions Architect Associate',
    description: 'Certified in designing distributed systems on Amazon Web Services',
    category: 'Certification',
    date: '2024-09-20',
    issuer: 'Amazon Web Services',
    credentialId: 'AWS-SAA-2024-789',
    image: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Infrastructure'],
    featured: false
  },
  {
    id: 4,
    title: 'University Dean\'s List',
    description: 'Academic excellence recognition for maintaining GPA above 3.8',
    category: 'Academic',
    date: '2024-08-15',
    issuer: 'University of Plymouth',
    credentialId: 'UOP-DL-2024',
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['Computer Science', 'Academic Excellence', 'Research'],
    featured: false
  },
  {
    id: 5,
    title: 'TensorFlow Developer Certificate',
    description: 'Demonstrated proficiency in using TensorFlow for machine learning',
    category: 'Certification',
    date: '2024-07-10',
    issuer: 'TensorFlow',
    credentialId: 'TF-DEV-2024-456',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['TensorFlow', 'Deep Learning', 'Neural Networks', 'Python'],
    featured: true
  }
];

const categories = ['All', 'Certification', 'Achievement', 'Academic', 'Competition'];

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'All' || achievement.category === selectedCategory;
    const matchesSearch = achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
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
        return 'from-indigo-500 via-purple-500 to-pink-500';
      case 'Achievement':
        return 'from-emerald-500 via-teal-500 to-green-500';
      case 'Academic':
        return 'from-blue-500 via-cyan-500 to-sky-500';
      case 'Competition':
        return 'from-orange-500 via-amber-500 to-yellow-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Certification':
        return 'bg-purple-500';
      case 'Achievement':
        return 'bg-emerald-500';
      case 'Academic':
        return 'bg-blue-500';
      case 'Competition':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
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
                {achievements.filter(a => a.category === 'Certification').length}
              </div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {achievements.filter(a => a.category === 'Achievement').length}
              </div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {achievements.filter(a => a.category === 'Academic').length}
              </div>
              <div className="text-sm text-muted-foreground">Academic</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {new Set(achievements.flatMap(a => a.skills)).size}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  whileHover={{ scale: 1.03, y: -5 }}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${getCategoryGradient(achievement.category)} p-[1px] cursor-pointer magnetic`}
                  data-cursor-text="View"
                >
                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Card Content */}
                  <div className="relative bg-card/95 backdrop-blur-xl rounded-3xl p-5 h-full flex flex-col">
                    {/* Top Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <span className={`${getCategoryBadgeColor(achievement.category)} text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}>
                        <CardIcon className="w-3.5 h-3.5" />
                        {achievement.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-sm text-muted-foreground mb-3">
                      by <span className="font-medium text-foreground">{achievement.issuer}</span>
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                      {achievement.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {achievement.skills.slice(0, 4).map(skill => (
                        <span
                          key={skill}
                          className="text-xs bg-muted/70 text-muted-foreground px-2.5 py-1 rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {achievement.skills.length > 4 && (
                        <span className="text-xs text-muted-foreground px-2.5 py-1">
                          +{achievement.skills.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Verify Link */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">ID: {achievement.credentialId}</span>
                      <motion.div
                        className="flex items-center gap-1.5 text-sm font-medium text-primary"
                        whileHover={{ x: 3 }}
                      >
                        Verify
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 bg-gradient-to-br ${getCategoryGradient(achievement.category)} blur-xl transition-opacity duration-300 pointer-events-none`} />
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