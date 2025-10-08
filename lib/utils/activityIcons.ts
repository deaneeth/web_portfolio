/**
 * Centralized icon mapping for Recent Activity feed
 * Maps activity types to their corresponding Lucide icons and colors
 */

import { 
  Code2,           // Projects
  Trophy,          // Achievements
  Award,           // Certifications
  FileText,        // Articles
  Wrench,          // Services
  GraduationCap,   // Education/Academic
  Briefcase,       // Work Experience
  Brain,           // AI/ML Skills
  Zap,             // Automation
  Palette,         // Design
  MessageSquare,   // Testimonials
  Medal,           // Competitions
  Sparkles,        // Default/fallback
  LucideIcon
} from 'lucide-react';

export interface ActivityIconStyle {
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  label: string;
}

/**
 * Get icon configuration for activity type
 */
export function getActivityIconStyle(type: string, category?: string, tags?: string[]): ActivityIconStyle {
  // Normalize type for comparison
  const normalizedType = type.toLowerCase();

  // Check for specific categories or tags for more granular icon selection
  if (tags && tags.length > 0) {
    const tagString = tags.join(' ').toLowerCase();
    
    // AI/ML related
    if (tagString.includes('ai') || tagString.includes('machine learning') || tagString.includes('ml')) {
      return {
        icon: Brain,
        bgColor: 'bg-purple-500/10',
        textColor: 'text-purple-500',
        label: 'AI/ML'
      };
    }
    
    // Automation related
    if (tagString.includes('automation') || tagString.includes('workflow')) {
      return {
        icon: Zap,
        bgColor: 'bg-orange-500/10',
        textColor: 'text-orange-500',
        label: 'Automation'
      };
    }
    
    // Design related
    if (tagString.includes('design') || tagString.includes('ui') || tagString.includes('ux')) {
      return {
        icon: Palette,
        bgColor: 'bg-pink-500/10',
        textColor: 'text-pink-500',
        label: 'Design'
      };
    }
  }

  // Type-based icon mapping
  switch (normalizedType) {
    case 'project':
      return {
        icon: Code2,
        bgColor: 'bg-blue-500/10',
        textColor: 'text-blue-500',
        label: 'Project'
      };

    case 'article':
      return {
        icon: FileText,
        bgColor: 'bg-green-500/10',
        textColor: 'text-green-500',
        label: 'Article'
      };

    case 'achievement':
      return {
        icon: Trophy,
        bgColor: 'bg-yellow-500/10',
        textColor: 'text-yellow-500',
        label: 'Achievement'
      };

    case 'certification':
      return {
        icon: Award,
        bgColor: 'bg-amber-500/10',
        textColor: 'text-amber-500',
        label: 'Certification'
      };

    case 'service':
      return {
        icon: Wrench,
        bgColor: 'bg-purple-500/10',
        textColor: 'text-purple-500',
        label: 'Service'
      };

    case 'academic':
      return {
        icon: GraduationCap,
        bgColor: 'bg-indigo-500/10',
        textColor: 'text-indigo-500',
        label: 'Academic'
      };

    case 'experience':
      return {
        icon: Briefcase,
        bgColor: 'bg-slate-500/10',
        textColor: 'text-slate-500',
        label: 'Experience'
      };

    case 'testimonial':
      return {
        icon: MessageSquare,
        bgColor: 'bg-teal-500/10',
        textColor: 'text-teal-500',
        label: 'Testimonial'
      };

    case 'competition':
      return {
        icon: Medal,
        bgColor: 'bg-rose-500/10',
        textColor: 'text-rose-500',
        label: 'Competition'
      };

    default:
      return {
        icon: Sparkles,
        bgColor: 'bg-gray-500/10',
        textColor: 'text-gray-500',
        label: 'Update'
      };
  }
}

/**
 * Get status color for activity status badge
 */
export function getStatusColor(status: string): string {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case 'completed':
    case 'published':
    case 'earned':
    case 'verified':
      return 'text-green-500';

    case 'in-progress':
    case 'in progress':
    case 'ongoing':
      return 'text-blue-500';

    case 'available':
    case 'active':
      return 'text-purple-500';

    case 'draft':
    case 'pending':
      return 'text-yellow-500';

    default:
      return 'text-gray-500';
  }
}
