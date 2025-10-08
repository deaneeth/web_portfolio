// Centralized TypeScript interfaces for all data schemas

import { LucideIcon } from 'lucide-react';

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ActivityType = 'project' | 'article' | 'achievement' | 'service';

export interface RecentActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: Date; // Normalized to Date object for sorting
  dateDisplay: string; // Original display format
  image?: string;
  link?: string;
  category?: string;
  tags?: string[];
  metadata?: {
    readTime?: string; // For articles
    skills?: string[]; // For achievements
    techStack?: string[]; // For projects
    pricing?: string; // For services
  };
  originalData: Project | Article | Achievement | Service; // Reference to original object
}

// ============================================================================
// HOMEPAGE TYPES
// ============================================================================

export interface QuickStat {
  label: string;
  value: string;
}

export interface FeaturedSection {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  stats: string;
}

// ============================================================================
// SKILLS TYPES
// ============================================================================

export interface Skill {
  name: string;
  icon: LucideIcon;
  category?: 'aiMl' | 'roboticsIot' | 'cloudTools' | 'dataViz';
  level?: number; // 1-10 proficiency
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

// ============================================================================
// PROJECTS TYPES
// ============================================================================

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: number | string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
  featured: boolean;
  impact?: string;
  status: 'Completed' | 'In Progress' | 'Planning';
  date: string; // ISO format YYYY-MM-DD
  problem?: string;
  solution?: string;
  technologies?: string[];
  metrics?: ProjectMetric[];
  type?: 'Project';
  link?: string;
}

// ============================================================================
// SERVICES TYPES
// ============================================================================

export interface Service {
  id: number | string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
  deliverables: string;
  timeline: string;
  startingPrice: string;
  popular: boolean;
  type?: 'Service';
  date?: string;
  link?: string;
  tags?: string[];
  status?: string;
  category?: string;
}

export interface Testimonial {
  id?: number | string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar: string;
  date?: string;
  verifyUrl?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon?: LucideIcon;
}

// ============================================================================
// ARTICLES TYPES
// ============================================================================

export interface Article {
  id: string;
  title: string;
  date: string; // Display format or ISO
  readTime: string;
  image: string;
  link: string;
  excerpt?: string;
  type?: 'Article';
  description?: string;
  tags?: string[];
  status?: 'published' | 'draft';
  author?: string;
  slug?: string;
}

// ============================================================================
// ACHIEVEMENTS TYPES
// ============================================================================

export interface Achievement {
  id: number | string;
  title: string;
  description: string;
  category: 'Certification' | 'Achievement' | 'Academic' | 'Competition';
  date: string; // ISO format YYYY-MM-DD
  issuer: string;
  credentialId?: string;
  image: string;
  verifyUrl?: string;
  skills: string[];
  featured: boolean;
  type?: 'Achievement' | 'Certification';
  link?: string;
  tags?: string[];
  status?: string;
  provider?: string;
}

// ============================================================================
// EXPERIENCE & EDUCATION TYPES (Already defined in their files)
// ============================================================================

export interface Experience {
  location: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  highlights: string[];
}

export interface Education {
  location: string;
  institution: string;
  degree: string;
  description: string;
  period: string;
  startDate: string;
}

// ============================================================================
// RECENT ACTIVITY TYPES
// ============================================================================

export interface RecentActivityItem {
  id: string;
  title: string;
  type: 'Project' | 'Certification' | 'Achievement' | 'Article' | 'Service' | 'Academic';
  date: string;
  description: string;
  link: string;
  tags: string[];
  status: string;
  [key: string]: any;
}
