'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Calendar, ExternalLink, Filter, Search, Medal, AlignCenterVertical as Certificate, Target } from 'lucide-react';

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

  const featuredAchievements = achievements.filter(a => a.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Certification':
        return Certificate;
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Certification':
        return 'from-blue-500 to-purple-500';
      case 'Achievement':
        return 'from-yellow-500 to-orange-500';
      case 'Academic':
        return 'from-green-500 to-teal-500';
      case 'Competition':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
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
          <h1 className="page-title">Achievement Wall</h1>
          <p className="page-subtitle">
            Certifications, awards, and milestones throughout my journey in AI/ML and technology.
          </p>
        </motion.div>
      </div>

      {/* Featured Achievements */}
      {featuredAchievements.length > 0 && (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Featured Achievements</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="card hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                whileHover={{ y: -4 }}
              >
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(achievement.category)} bg-opacity-90`}>
                      {React.createElement(getCategoryIcon(achievement.category), {
                        className: "w-4 h-4 text-white"
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {achievement.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(achievement.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {achievement.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">by {achievement.issuer}</span>
                    <motion.a
                      href={achievement.verifyUrl}
                      className="text-primary hover:text-primary/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {achievement.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {achievement.skills.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{achievement.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-10 w-64"
          />
        </div>
      </motion.div>

      {/* All Achievements */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-xl font-semibold">All Achievements</h2>
          <span className="text-sm text-muted-foreground">
            {filteredAchievements.length} achievement{filteredAchievements.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                className="card hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                whileHover={{ y: -4 }}
              >
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(achievement.category)} bg-opacity-90`}>
                      {React.createElement(getCategoryIcon(achievement.category), {
                        className: "w-4 h-4 text-white"
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {achievement.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(achievement.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {achievement.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">by {achievement.issuer}</span>
                    <motion.a
                      href={achievement.verifyUrl}
                      className="text-primary hover:text-primary/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {achievement.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {achievement.skills.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{achievement.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No achievements found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20"
        whileHover={{ y: -4 }}
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
    </div>
  );
}