// Utility function to aggregate and process Recent Activity data from all sources

import projectsData from '@/data/projects.json';
import certificationsData from '@/data/certifications.json';
import achievementsData from '@/data/achievements.json';
import articlesData from '@/data/articles.json';
import servicesData from '@/data/services.json';
import academicData from '@/data/academic.json';

export interface RecentActivityItem {
  id: string;
  title: string;
  type: 'Project' | 'Certification' | 'Achievement' | 'Article' | 'Service' | 'Academic';
  date: string; // ISO format: YYYY-MM-DD
  description: string;
  link: string;
  tags: string[];
  status: string;
  [key: string]: any; // Allow additional properties
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
  const allItems: RecentActivityItem[] = [
    ...(projectsData as RecentActivityItem[]),
    ...(certificationsData as RecentActivityItem[]),
    ...(achievementsData as RecentActivityItem[]),
    ...(articlesData as RecentActivityItem[]),
    ...(servicesData as RecentActivityItem[]),
    ...(academicData as RecentActivityItem[]),
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
