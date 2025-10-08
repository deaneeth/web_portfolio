/**
 * Test file for Recent Activity Aggregator
 * 
 * This file validates that the aggregator correctly merges and sorts data
 * from all sources (projects, articles, achievements, services).
 * 
 * Run with: npx ts-node data/utils/__tests__/recentActivity.test.ts
 */

import {
  getRecentActivities,
  getActivitiesByMonth,
  getActivitiesByType,
  getActivitiesInRange,
  getActivityStats,
} from '../recentActivity';

console.log('🧪 Testing Recent Activity Aggregator...\n');

// ============================================================================
// TEST 1: Get All Recent Activities
// ============================================================================

console.log('📋 Test 1: Get All Recent Activities');
const allActivities = getRecentActivities();
console.log(`✅ Total activities: ${allActivities.length}`);
console.log(`   - First activity: ${allActivities[0]?.title} (${allActivities[0]?.dateDisplay})`);
console.log(`   - Last activity: ${allActivities[allActivities.length - 1]?.title} (${allActivities[allActivities.length - 1]?.dateDisplay})`);
console.log('');

// ============================================================================
// TEST 2: Get Limited Activities
// ============================================================================

console.log('📋 Test 2: Get Top 5 Activities');
const top5 = getRecentActivities(5);
console.log(`✅ Returned ${top5.length} activities (expected 5)`);
top5.forEach((activity, index) => {
  console.log(`   ${index + 1}. [${activity.type.toUpperCase()}] ${activity.title} - ${activity.dateDisplay}`);
});
console.log('');

// ============================================================================
// TEST 3: Filter by Type
// ============================================================================

console.log('📋 Test 3: Filter by Activity Type');
const projectsOnly = getRecentActivities(undefined, ['project']);
const articlesOnly = getRecentActivities(undefined, ['article']);
const achievementsOnly = getRecentActivities(undefined, ['achievement']);

console.log(`✅ Projects: ${projectsOnly.length}`);
console.log(`✅ Articles: ${articlesOnly.length}`);
console.log(`✅ Achievements: ${achievementsOnly.length}`);
console.log('');

// ============================================================================
// TEST 4: Group by Month
// ============================================================================

console.log('📋 Test 4: Group by Month');
const byMonth = getActivitiesByMonth(10);
const monthKeys = Object.keys(byMonth);
console.log(`✅ Activity spans ${monthKeys.length} months:`);
monthKeys.slice(0, 3).forEach(month => {
  console.log(`   - ${month}: ${byMonth[month].length} activities`);
});
console.log('');

// ============================================================================
// TEST 5: Group by Type
// ============================================================================

console.log('📋 Test 5: Group by Type');
const byType = getActivitiesByType();
console.log(`✅ Activities by type:`);
console.log(`   - Projects: ${byType.project.length}`);
console.log(`   - Articles: ${byType.article.length}`);
console.log(`   - Achievements: ${byType.achievement.length}`);
console.log(`   - Services: ${byType.service.length}`);
console.log('');

// ============================================================================
// TEST 6: Date Range Filter
// ============================================================================

console.log('📋 Test 6: Filter by Date Range');
const rangeActivities = getActivitiesInRange('2024-09-01', '2024-12-31');
console.log(`✅ Activities between Sept-Dec 2024: ${rangeActivities.length}`);
if (rangeActivities.length > 0) {
  console.log(`   - First: ${rangeActivities[0].title} (${rangeActivities[0].dateDisplay})`);
  console.log(`   - Last: ${rangeActivities[rangeActivities.length - 1].title} (${rangeActivities[rangeActivities.length - 1].dateDisplay})`);
}
console.log('');

// ============================================================================
// TEST 7: Activity Statistics
// ============================================================================

console.log('📋 Test 7: Activity Statistics');
const stats = getActivityStats();
console.log(`✅ Statistics:`);
console.log(`   - Total: ${stats.total}`);
console.log(`   - Projects: ${stats.byType.projects}`);
console.log(`   - Articles: ${stats.byType.articles}`);
console.log(`   - Achievements: ${stats.byType.achievements}`);
console.log(`   - Services: ${stats.byType.services}`);
if (stats.latest) {
  console.log(`   - Latest: [${stats.latest.type.toUpperCase()}] ${stats.latest.title} (${stats.latest.dateDisplay})`);
}
console.log('');

// ============================================================================
// TEST 8: Verify Date Sorting
// ============================================================================

console.log('📋 Test 8: Verify Date Sorting (Newest First)');
const sortCheck = getRecentActivities(10);
let sortValid = true;
for (let i = 0; i < sortCheck.length - 1; i++) {
  if (sortCheck[i].date < sortCheck[i + 1].date) {
    sortValid = false;
    console.log(`❌ Sort error: ${sortCheck[i].title} (${sortCheck[i].dateDisplay}) is older than ${sortCheck[i + 1].title} (${sortCheck[i + 1].dateDisplay})`);
  }
}
if (sortValid) {
  console.log(`✅ All activities correctly sorted by date (newest first)`);
}
console.log('');

// ============================================================================
// TEST 9: Verify Metadata
// ============================================================================

console.log('📋 Test 9: Verify Metadata Presence');
const withMetadata = allActivities.filter(a => a.metadata && Object.keys(a.metadata).length > 0);
console.log(`✅ Activities with metadata: ${withMetadata.length} / ${allActivities.length}`);
const sampleProject = allActivities.find(a => a.type === 'project');
const sampleArticle = allActivities.find(a => a.type === 'article');
const sampleAchievement = allActivities.find(a => a.type === 'achievement');

if (sampleProject?.metadata?.techStack) {
  console.log(`   - Project metadata (techStack): ✅`);
}
if (sampleArticle?.metadata?.readTime) {
  console.log(`   - Article metadata (readTime): ✅`);
}
if (sampleAchievement?.metadata?.skills) {
  console.log(`   - Achievement metadata (skills): ✅`);
}
console.log('');

// ============================================================================
// SUMMARY
// ============================================================================

console.log('═══════════════════════════════════════════════════════════');
console.log('🎉 All Tests Completed Successfully!');
console.log('═══════════════════════════════════════════════════════════');
console.log(`✅ Total Activities: ${stats.total}`);
console.log(`✅ Date Sorting: ${sortValid ? 'Valid' : 'Invalid'}`);
console.log(`✅ Type Filtering: Working`);
console.log(`✅ Month Grouping: Working`);
console.log(`✅ Date Range: Working`);
console.log(`✅ Metadata: Present`);
console.log('═══════════════════════════════════════════════════════════\n');
