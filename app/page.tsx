'use client';

import React from 'react';
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
import { PersonalStory } from '@/components/sections/personal-story';
import { SocialButtons } from '@/components/ui/social-buttons';

const quickStats = [
  { label: 'Projects Completed', value: '25+' },
  { label: 'Clients Served', value: '5,000+' },
  { label: 'Years Experience', value: '3+' },
  { label: 'Technologies', value: '20+' }
];

const featuredSections = [
  {
    title: 'Featured Work',
    description: 'Deep-dive case studies of my best AI/ML and Computer Science projects',
    href: '/work',
    icon: FolderOpen,
    color: 'from-blue-500 to-purple-500',
    stats: '12 Projects'
  },
  {
    title: 'Creative Services',
    description: 'AI solutions, automation, web apps, and design consulting services',
    href: '/services',
    icon: Briefcase,
    color: 'from-green-500 to-teal-500',
    stats: '5 Services'
  },
  {
    title: 'Achievement Wall',
    description: 'Certifications, awards, and milestones throughout my journey',
    href: '/achievements',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500',
    stats: '15 Achievements'
  },
  {
    title: 'Get in Touch',
    description: 'Let\'s collaborate on your next AI/ML project or automation solution',
    href: '/contact',
    icon: Mail,
    color: 'from-teal-500 to-blue-500',
    stats: 'Available'
  }
];

const recentActivity = [
  {
    type: 'project',
    title: 'Neural Style Transfer Engine',
    description: 'Completed AI-powered image transformation system',
    time: '2 days ago',
    status: 'completed'
  },
  {
    type: 'article',
    title: 'The Future of AI in Creative Industries',
    description: 'Published new article on AI and creativity',
    time: '1 week ago',
    status: 'published'
  },
  {
    type: 'achievement',
    title: 'Google Cloud ML Engineer Certification',
    description: 'Earned professional certification',
    time: '2 weeks ago',
    status: 'earned'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-12">
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
          <Link href="/work" className="btn btn-primary">
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
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

      {/* Personal Story Section */}
      <PersonalStory />

      {/* Featured Sections */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-semibold">Explore My Work</h2>
          <span className="text-sm text-muted-foreground">{featuredSections.length} sections</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
              className="card"
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'project' ? 'bg-blue-500/10 text-blue-500' :
                  activity.type === 'article' ? 'bg-green-500/10 text-green-500' :
                  'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {activity.type === 'project' ? <Code className="w-4 h-4" /> :
                   activity.type === 'article' ? <BookOpen className="w-4 h-4" /> :
                   <Trophy className="w-4 h-4" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-1">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activity.time}</span>
                    <span>•</span>
                    <span className={`capitalize ${
                      activity.status === 'completed' ? 'text-green-500' :
                      activity.status === 'published' ? 'text-blue-500' :
                      'text-yellow-500'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
                
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
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