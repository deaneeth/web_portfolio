/**
 * Recent Activity Aggregator - Usage Examples
 * 
 * This file demonstrates how to use the recent activity aggregator
 * in your React components.
 */

// Import all functions at the top
import getActivities, {
  getRecentActivities,
  getActivitiesByMonth,
  getActivitiesByType,
  getActivitiesInRange,
  getActivityStats,
} from '@/data/utils/recentActivity';

// ============================================================================
// BASIC USAGE
// ============================================================================

/**
 * Example 1: Get top 10 recent activities
 */
export function RecentActivitySection() {
  const recentActivities = getActivities(10); // Get top 10

  return (
    <div>
      <h2>Recent Activity</h2>
      {recentActivities.map((activity) => (
        <div key={activity.id}>
          <span className="badge">{activity.type}</span>
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
          <time>{activity.dateDisplay}</time>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// ADVANCED USAGE
// ============================================================================

/**
 * Example 2: Filter by activity type
 */
export function ProjectTimeline() {
  // Get only projects and articles, limit to 5
  const activities = getRecentActivities(5, ['project', 'article']);

  return (
    <div>
      <h2>Project & Article Timeline</h2>
      {activities.map((activity) => (
        <div key={activity.id}>
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
          {activity.link && <a href={activity.link}>View →</a>}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// GROUPED USAGE
// ============================================================================

/**
 * Example 3: Group activities by month
 */
export function MonthlyTimeline() {
  const activitiesByMonth = getActivitiesByMonth(20); // Get last 20 activities grouped

  return (
    <div>
      <h2>Activity Timeline</h2>
      {Object.entries(activitiesByMonth).map(([month, activities]) => (
        <div key={month}>
          <h3>{month}</h3>
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>
                [{activity.type}] {activity.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// TYPE-SPECIFIC USAGE
// ============================================================================

/**
 * Example 4: Get activities grouped by type
 */
export function ActivityDashboard() {
  const { project, article, achievement, service } = getActivitiesByType(3); // Top 3 per type

  return (
    <div className="grid grid-cols-4 gap-4">
      <section>
        <h3>Projects ({project.length})</h3>
        {project.map((p) => (
          <div key={p.id}>{p.title}</div>
        ))}
      </section>

      <section>
        <h3>Articles ({article.length})</h3>
        {article.map((a) => (
          <div key={a.id}>{a.title}</div>
        ))}
      </section>

      <section>
        <h3>Achievements ({achievement.length})</h3>
        {achievement.map((a) => (
          <div key={a.id}>{a.title}</div>
        ))}
      </section>

      <section>
        <h3>Services ({service.length})</h3>
        {service.map((s) => (
          <div key={s.id}>{s.title}</div>
        ))}
      </section>
    </div>
  );
}

// ============================================================================
// DATE RANGE USAGE
// ============================================================================

/**
 * Example 5: Get activities within a date range
 */
export function QuarterlyReport() {
  // Get activities from Q4 2024
  const q4Activities = getActivitiesInRange('2024-10-01', '2024-12-31');

  return (
    <div>
      <h2>Q4 2024 Activity Report</h2>
      <p>Total activities: {q4Activities.length}</p>
      {q4Activities.map((activity) => (
        <div key={activity.id}>
          <strong>{activity.type}:</strong> {activity.title}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// STATISTICS USAGE
// ============================================================================

/**
 * Example 6: Display activity statistics
 */
export function ActivityStats() {
  const stats = getActivityStats();

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Activities</h3>
        <p className="stat-value">{stats.total}</p>
      </div>

      <div className="stat-card">
        <h3>Projects</h3>
        <p className="stat-value">{stats.byType.projects}</p>
      </div>

      <div className="stat-card">
        <h3>Articles</h3>
        <p className="stat-value">{stats.byType.articles}</p>
      </div>

      <div className="stat-card">
        <h3>Achievements</h3>
        <p className="stat-value">{stats.byType.achievements}</p>
      </div>

      {stats.latest && (
        <div className="latest-activity">
          <h3>Latest Activity</h3>
          <p>
            <span className="badge">{stats.latest.type}</span>
            {stats.latest.title}
          </p>
          <time>{stats.latest.dateDisplay}</time>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ACCESSING METADATA
// ============================================================================

/**
 * Example 7: Use activity metadata
 */
export function DetailedActivityList() {
  const activities = getRecentActivities(10);

  return (
    <div>
      {activities.map((activity) => (
        <div key={activity.id} className="activity-card">
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>

          {/* Show type-specific metadata */}
          {activity.metadata?.readTime && (
            <span className="read-time">📖 {activity.metadata.readTime}</span>
          )}

          {activity.metadata?.techStack && (
            <div className="tech-stack">
              {activity.metadata.techStack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {activity.metadata?.skills && (
            <div className="skills">
              {activity.metadata.skills.slice(0, 3).map((skill) => (
                <span key={skill} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {activity.metadata?.pricing && (
            <span className="pricing">💰 From {activity.metadata.pricing}</span>
          )}
        </div>
      ))}
    </div>
  );
}
