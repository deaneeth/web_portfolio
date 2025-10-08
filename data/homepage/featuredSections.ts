import { FolderOpen, Briefcase, Trophy, Mail } from 'lucide-react';
import { FeaturedSection } from '../types';

/**
 * Featured Sections displayed on the homepage
 * These are the main navigation cards that lead to different portfolio sections
 */
export const featuredSections: FeaturedSection[] = [
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
