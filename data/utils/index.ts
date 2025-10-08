/**
 * Data Utilities Index
 * 
 * Central export point for all utility functions
 */

export {
  getRecentActivities,
  getActivitiesByMonth,
  getActivitiesByType,
  getActivitiesInRange,
  getActivityStats,
  default as getActivities,
} from './recentActivity';

export type { RecentActivity, ActivityType } from '../types';
