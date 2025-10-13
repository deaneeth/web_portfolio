import { FolderOpen, Briefcase, Trophy, Mail } from 'lucide-react';
import { FeaturedSection } from '../types.d';
import { projects } from '../featuredWork/allProjects';
import { services } from '../services/servicesDetailed';
import { achievements } from '../achievements/achievementsDetailed';

/**
 * Featured Sections displayed on the homepage
 * These are the main navigation cards that lead to different portfolio sections
 * 
 * AUTOMATIC COUNTING:
 * Stats are dynamically calculated from actual data sources to ensure accuracy.
 * Counts update automatically when items are added/removed from data files.
 */
export const featuredSections: FeaturedSection[] = [
  {
    title: 'Featured Work',
    description: 'Deep-dive case studies of my best AI/ML and Computer Science projects',
    href: '/work',
    icon: FolderOpen,
    color: 'from-blue-500 to-purple-500',
    stats: `${projects?.length || 0} Project${projects?.length !== 1 ? 's' : ''}`
  },
  {
    title: 'Creative Services',
    description: 'AI solutions, automation, web apps, and design consulting services',
    href: '/services',
    icon: Briefcase,
    color: 'from-green-500 to-teal-500',
    stats: `${services?.length || 0} Service${services?.length !== 1 ? 's' : ''}`
  },
  {
    title: 'Achievement Wall',
    description: 'Certifications, awards, and milestones throughout my journey',
    href: '/achievements',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500',
    stats: `${achievements?.length || 0} Achievement${achievements?.length !== 1 ? 's' : ''}`
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
