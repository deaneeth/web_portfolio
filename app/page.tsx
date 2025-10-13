'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  FolderOpen, 
  Briefcase, 
  BookOpen, 
  Trophy, 
  Code, 
  Mail,
  Sparkles,
  ExternalLink,
  Calendar,
  MapPin
} from 'lucide-react';
import { CuriosityTrigger } from '@/components/easter-egg/curiosity-trigger';
import { SocialButtons } from '@/components/ui/social-buttons';
import { getRecentActivityWithTime } from '@/lib/utils/recentActivity';
import { getActivityIconStyle, getStatusColor } from '@/lib/utils/activityIcons';
import { quickStats } from '@/data/homepage/quickStats';
import { featuredSections } from '@/data/homepage/featuredSections';

export default function HomePage() {
  // Get recent activity dynamically from data sources (top 5 most recent)
  const recentActivity = useMemo(() => getRecentActivityWithTime(5), []);

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="page-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Hey, I'm <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Deaneeth</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Builder of Futures. AI/ML Explorer.
          </p>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            19-year-old Computer Science undergraduate at University of Plymouth, Sri Lanka. 
            Specializing in AI/ML and intelligent automation, turning ideas into reality through code.
          </p>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Sri Lanka</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Graduating Dec 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Available for projects</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <Link href="/work" className="btn btn-primary magnetic" data-cursor-text="View Work">
            <FolderOpen className="w-4 h-4" />
            View Projects
          </Link>
          <Link href="/contact" className="btn btn-outline">
            <Mail className="w-4 h-4" />
            Get in Touch
          </Link>
          <CuriosityTrigger triggerType="main" />
        </motion.div>

        {/* Social Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <SocialButtons variant="horizontal" size="md" />
        </motion.div>
      </div>

      {/* Quick Stats */}
      {quickStats && quickStats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {quickStats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="card text-center"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Featured Sections */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-semibold">Explore My Work</h2>
          <span className="text-sm text-muted-foreground">{featuredSections?.length || 0} sections</span>
        </motion.div>

        {featuredSections && featuredSections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
              >
                <Link href={section.href} className="block group">
                  <motion.div 
                    className="card hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color} bg-opacity-10`}>
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                        {section.stats}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {section.description}
                    </p>
                  <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-muted-foreground">No featured sections available at the moment.</p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          <Link href="/blog" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </motion.div>

        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            // Get icon configuration based on type, category, and tags
            const iconStyle = getActivityIconStyle(activity.type, activity.category, activity.tags);
            const ActivityIcon = iconStyle.icon;
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                className="card group"
                whileHover={{ x: 4 }}
              >
                <Link href={activity.link} className="block">
                  <div className="flex items-start gap-4">
                    {/* Icon with dynamic color and background */}
                    <div className={`p-2.5 rounded-lg ${iconStyle.bgColor} ${iconStyle.textColor} flex-shrink-0`}>
                      <ActivityIcon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                        {activity.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {activity.description}
                      </p>
                      
                      {/* Time and Status */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">{activity.time}</span>
                        <span>•</span>
                        <span className={`capitalize font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                        {activity.tags && activity.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-muted-foreground/70">
                              {activity.tags[0]}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* External link indicator */}
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20"
        whileHover={{ y: -4 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold mb-1">Ready to collaborate?</h3>
            <p className="text-sm text-muted-foreground">
              Let's build something amazing together with AI and intelligent automation.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/services" className="btn btn-outline">
              View Services
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Start Project
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}