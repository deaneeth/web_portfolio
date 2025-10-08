/**
 * Recent Activity Aggregator
 * 
 * Merges data from multiple sources (projects, articles, achievements, services)
 * and creates a unified timeline sorted by date.
 */

import { projects } from '../work/allProjects';
import { articles } from '../articles/articlesDetailed';
import { achievements } from '../achievements/achievementsDetailed';
import { services } from '../services/servicesDetailed';
import type { Project, Article, Achievement, Service } from '../types';

// ============================================================================
// UNIFIED ACTIVITY TYPE
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
// DATE PARSING UTILITIES
// ============================================================================

/**
 * Parse various date formats to Date object
 * Handles:
 * - ISO format: "2024-12-01"
 * - Display format: "December 15, 2024"
 * - Partial dates: "2024-12" (assumes first day of month)
 */
function parseDate(dateString: string): Date {
  // Try ISO format first (YYYY-MM-DD)
  const isoMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return new Date(dateString);
  }

  // Try partial ISO format (YYYY-MM)
  const partialIsoMatch = dateString.match(/^(\d{4})-(\d{2})$/);
  if (partialIsoMatch) {
    return new Date(`${dateString}-01`);
  }

  // Try display format (e.g., "December 15, 2024")
  const displayDate = new Date(dateString);
  if (!isNaN(displayDate.getTime())) {
    return displayDate;
  }

  // Fallback: return current date if parsing fails
  console.warn(`Unable to parse date: ${dateString}. Using current date as fallback.`);
  return new Date();
}

/**
 * Normalize date to ISO format (YYYY-MM-DD)
 */
function normalizeDate(dateString: string): string {
  const date = parseDate(dateString);
  return date.toISOString().split('T')[0];
}

// ============================================================================
// ACTIVITY TRANSFORMERS
// ============================================================================

/**
 * Transform Project to RecentActivity
 */
function projectToActivity(project: Project): RecentActivity {
  return {
    id: `project-${project.id}`,
    type: 'project',
    title: project.title,
    description: project.description,
    date: parseDate(project.date),
    dateDisplay: project.date,
    image: project.image,
    link: project.demo || project.github || project.link,
    category: project.category,
    tags: project.tags,
    metadata: {
      techStack: project.technologies,
    },
    originalData: project,
  };
}

/**
 * Transform Article to RecentActivity
 */
function articleToActivity(article: Article): RecentActivity {
  return {
    id: `article-${article.id}`,
    type: 'article',
    title: article.title,
    description: article.excerpt || article.description || '',
    date: parseDate(article.date),
    dateDisplay: article.date,
    image: article.image,
    link: article.link,
    category: 'Article',
    tags: article.tags,
    metadata: {
      readTime: article.readTime,
    },
    originalData: article,
  };
}

/**
 * Transform Achievement to RecentActivity
 */
function achievementToActivity(achievement: Achievement): RecentActivity {
  return {
    id: `achievement-${achievement.id}`,
    type: 'achievement',
    title: achievement.title,
    description: achievement.description,
    date: parseDate(achievement.date),
    dateDisplay: achievement.date,
    image: achievement.image,
    link: achievement.verifyUrl || achievement.link,
    category: achievement.category,
    tags: achievement.tags || achievement.skills,
    metadata: {
      skills: achievement.skills,
    },
    originalData: achievement,
  };
}

/**
 * Transform Service to RecentActivity
 */
function serviceToActivity(service: Service): RecentActivity {
  return {
    id: `service-${service.id}`,
    type: 'service',
    title: service.title,
    description: service.description,
    date: parseDate(service.date || new Date().toISOString().split('T')[0]),
    dateDisplay: service.date || new Date().toISOString().split('T')[0],
    image: undefined, // Services use LucideIcon, not image string
    category: service.category || 'Service',
    tags: service.tags,
    metadata: {
      pricing: service.startingPrice,
      techStack: service.tags,
    },
    originalData: service,
  };
}

// ============================================================================
// AGGREGATION FUNCTIONS
// ============================================================================

/**
 * Get all recent activities from all sources
 * @param limit - Optional limit for number of results (default: all)
 * @param types - Optional filter by activity types (default: all types)
 * @returns Array of RecentActivity sorted by date (newest first)
 */
export function getRecentActivities(
  limit?: number,
  types?: ActivityType[]
): RecentActivity[] {
  const activities: RecentActivity[] = [];

  // Add projects if included in filter
  if (!types || types.includes('project')) {
    (projects || []).forEach(project => {
      activities.push(projectToActivity(project));
    });
  }

  // Add articles if included in filter
  if (!types || types.includes('article')) {
    (articles || []).forEach(article => {
      activities.push(articleToActivity(article));
    });
  }

  // Add achievements if included in filter
  if (!types || types.includes('achievement')) {
    (achievements || []).forEach(achievement => {
      activities.push(achievementToActivity(achievement));
    });
  }

  // Add services if included in filter
  if (!types || types.includes('service')) {
    (services || []).forEach(service => {
      activities.push(serviceToActivity(service));
    });
  }

  // Sort by date (newest first)
  activities.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Apply limit if specified
  return limit ? activities.slice(0, limit) : activities;
}

/**
 * Get recent activities grouped by month
 * @param limit - Optional limit for number of activities (default: all)
 * @returns Object with month keys and activity arrays
 */
export function getActivitiesByMonth(
  limit?: number
): Record<string, RecentActivity[]> {
  const activities = getRecentActivities(limit);
  const grouped: Record<string, RecentActivity[]> = {};

  activities.forEach(activity => {
    const monthKey = activity.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }

    grouped[monthKey].push(activity);
  });

  return grouped;
}

/**
 * Get recent activities grouped by type
 * @param limit - Optional limit per type (default: all)
 * @returns Object with type keys and activity arrays
 */
export function getActivitiesByType(
  limit?: number
): Record<ActivityType, RecentActivity[]> {
  const allActivities = getRecentActivities();

  const grouped: Record<ActivityType, RecentActivity[]> = {
    project: [],
    article: [],
    achievement: [],
    service: [],
  };

  allActivities.forEach(activity => {
    grouped[activity.type].push(activity);
  });

  // Apply limit to each type if specified
  if (limit) {
    Object.keys(grouped).forEach(key => {
      const type = key as ActivityType;
      grouped[type] = grouped[type].slice(0, limit);
    });
  }

  return grouped;
}

/**
 * Get activities within a date range
 * @param startDate - Start date (ISO format or Date object)
 * @param endDate - End date (ISO format or Date object)
 * @returns Array of RecentActivity within the range
 */
export function getActivitiesInRange(
  startDate: string | Date,
  endDate: string | Date
): RecentActivity[] {
  const start = typeof startDate === 'string' ? parseDate(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseDate(endDate) : endDate;

  const activities = getRecentActivities();

  return activities.filter(activity => {
    return activity.date >= start && activity.date <= end;
  });
}

/**
 * Get activity statistics
 * @returns Object with counts by type and total
 */
export function getActivityStats() {
  const byType = getActivitiesByType();

  return {
    total: getRecentActivities().length,
    byType: {
      projects: byType.project.length,
      articles: byType.article.length,
      achievements: byType.achievement.length,
      services: byType.service.length,
    },
    latest: getRecentActivities(1)[0] || null,
  };
}

// ============================================================================
// EXPORT DEFAULT FUNCTION
// ============================================================================

/**
 * Default export: Get recent activities (top 10 by default)
 */
export default function getActivities(limit: number = 10): RecentActivity[] {
  return getRecentActivities(limit);
}
