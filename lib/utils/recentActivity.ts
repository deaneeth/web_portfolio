// Utility function to aggregate and process Recent Activity data from all sources

import { projects } from '@/data/work/allProjects';
import { achievements } from '@/data/achievements/achievementsDetailed';
import { articles } from '@/data/articles/articlesDetailed';
import { services } from '@/data/services/servicesDetailed';
import { education } from '@/data/educationData';

export interface RecentActivityItem {
  id: string | number;
  title: string;
  type: 'Project' | 'Certification' | 'Achievement' | 'Article' | 'Service' | 'Academic';
  date: string; // ISO format: YYYY-MM-DD or "Month DD, YYYY"
  description: string;
  link: string;
  tags: string[];
  status: string;
  [key: string]: any; // Allow additional properties
}

/**
 * Normalize date format to ISO string
 * Accepts both "December 15, 2024" and "2024-12-15" formats
 */
function normalizeDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

/**
 * Calculate relative time (e.g., "2 days ago", "1 week ago")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return '1 week ago';
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 60) return '1 month ago';
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? 's' : ''} ago`;
}

/**
 * Merge all activity data from different sources
 */
export function getAllActivityItems(): RecentActivityItem[] {
  // Convert projects to activity items
  const projectItems: RecentActivityItem[] = projects.map(project => ({
    ...project,
    id: project.id.toString(),
    title: project.title,
    type: 'Project' as const,
    date: normalizeDate(project.date),
    description: project.description,
    link: project.link || '/work',
    tags: Array.isArray(project.tags) ? project.tags.filter(Boolean) : [],
    status: project.status || 'completed'
  }));

  // Convert achievements to activity items (filter for certifications and achievements)
  const achievementItems: RecentActivityItem[] = achievements.map(achievement => ({
    ...achievement,
    id: achievement.id.toString(),
    title: achievement.title,
    type: achievement.category === 'Certification' ? 'Certification' : 'Achievement',
    date: normalizeDate(achievement.date),
    description: achievement.description,
    link: achievement.link || '/achievements',
    tags: (Array.isArray(achievement.tags) ? achievement.tags : []).filter(Boolean) as string[],
    status: achievement.status || 'earned'
  }));

  // Convert articles to activity items
  const articleItems: RecentActivityItem[] = articles.map(article => ({
    ...article,
    id: article.id.toString(),
    title: article.title,
    type: 'Article' as const,
    date: normalizeDate(article.date),
    description: article.description || article.excerpt || '',
    link: article.link || '/articles',
    tags: (Array.isArray(article.tags) ? article.tags : []).filter(Boolean) as string[],
    status: article.status || 'published'
  }));

  // Convert services to activity items
  const serviceItems: RecentActivityItem[] = services.map(service => ({
    ...service,
    id: service.id.toString(),
    title: service.title,
    type: 'Service' as const,
    date: normalizeDate(new Date().toISOString()), // Services don't have dates, use current date
    description: service.description,
    link: '/services',
    tags: service.features ? service.features.slice(0, 3) : [],
    status: 'available'
  }));

  // Convert education to academic items
  const academicItems: RecentActivityItem[] = education.map(edu => ({
    ...edu,
    id: edu.institution,
    title: `${edu.degree} - ${edu.institution}`,
    type: 'Academic' as const,
    date: normalizeDate(edu.startDate),
    description: edu.description || `${edu.degree} at ${edu.institution}`,
    link: '/achievements',
    tags: [edu.degree, edu.institution],
    status: 'in-progress'
  }));

  const allItems: RecentActivityItem[] = [
    ...projectItems,
    ...achievementItems,
    ...articleItems,
    ...serviceItems,
    ...academicItems,
  ];

  return allItems;
}

/**
 * Get recent activity items sorted by date (newest first)
 * @param limit - Maximum number of items to return (default: 6)
 */
export function getRecentActivity(limit: number = 6): RecentActivityItem[] {
  const allItems = getAllActivityItems();

  // Create a copy and sort by date (newest first)
  const sortedItems = [...allItems].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Return only the most recent items
  return sortedItems.slice(0, limit);
}

/**
 * Get activity items with relative time added
 */
export function getRecentActivityWithTime(limit: number = 6) {
  const items = getRecentActivity(limit);
  
  return items.map(item => ({
    ...item,
    time: getRelativeTime(item.date),
  }));
}

/**
 * Filter activity by type
 */
export function getActivityByType(type: RecentActivityItem['type'], limit?: number) {
  const allItems = getAllActivityItems();
  const filtered = allItems.filter(item => item.type === type);
  const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get activity items from the last N days
 */
export function getActivityFromLastDays(days: number) {
  const allItems = getAllActivityItems();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return allItems
    .filter(item => new Date(item.date) >= cutoffDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
