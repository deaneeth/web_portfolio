# 🏗️ Recent Activity System Architecture

## System Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER (6 Sources)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Projects    │  │  Services    │  │  Articles    │              │
│  │  .ts         │  │  .ts         │  │  .ts         │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                  │                  │                      │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐              │
│  │ Achievements │  │  Education   │  │ Testimonials │              │
│  │  .ts         │  │  .ts         │  │  .ts         │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                       │
│  Each data source must have:                                         │
│  • id: unique identifier                                             │
│  • title: display name                                               │
│  • date: '2025-10-08' (ISO format)  ← REQUIRED                      │
│  • description: short text                                           │
│  • tags: ['AI', 'Design', ...] (for smart icons)                    │
│  • status: 'completed', 'published', etc.                           │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      AGGREGATION LAYER                               │
│             lib/utils/recentActivity.ts                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  getAllActivityItems()                                               │
│  ├─ Import all data sources                                          │
│  ├─ Convert each to RecentActivityItem format                       │
│  ├─ Normalize dates to ISO format                                   │
│  └─ Merge all items into single array                               │
│                                                                       │
│  [Project1, Service1, Article1, Achievement1, ...]                  │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      SORTING & FILTERING                             │
│             lib/utils/recentActivity.ts                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  getRecentActivity(limit = 6)                                        │
│  ├─ Get all items                                                    │
│  ├─ Sort by date (newest → oldest)                                  │
│  └─ Take top N items (default: 6)                                   │
│                                                                       │
│  getRecentActivityWithTime(limit = 6)                               │
│  ├─ Call getRecentActivity()                                        │
│  ├─ Add "time ago" label to each item                               │
│  └─ Return enhanced items                                            │
│                                                                       │
│  Result: [Item1, Item2, Item3, Item4, Item5]                        │
│          ↓        ↓        ↓        ↓        ↓                       │
│        Today  2 days  1 week  2 weeks  1 month                      │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      ICON SELECTION LAYER                            │
│              lib/utils/activityIcons.ts                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  getActivityIconStyle(type, category, tags)                         │
│  │                                                                    │
│  ├─ STEP 1: Check tags for keywords                                 │
│  │   ├─ Contains "AI" or "ML"? → Brain icon (purple)               │
│  │   ├─ Contains "Automation"? → Zap icon (orange)                 │
│  │   └─ Contains "Design"/"UI"? → Palette icon (pink)              │
│  │                                                                    │
│  ├─ STEP 2: Check type (if no tag match)                           │
│  │   ├─ Project → Code2 icon (blue)                                │
│  │   ├─ Article → FileText icon (green)                            │
│  │   ├─ Achievement → Trophy icon (yellow)                         │
│  │   ├─ Certification → Award icon (amber)                         │
│  │   ├─ Service → Wrench icon (purple)                             │
│  │   └─ Academic → GraduationCap icon (indigo)                     │
│  │                                                                    │
│  └─ STEP 3: Fallback                                                │
│      └─ Default → Sparkles icon (gray)                              │
│                                                                       │
│  Returns: { icon, bgColor, textColor, label }                       │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      RENDERING LAYER                                 │
│                    app/page.tsx                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  HomePage Component                                                  │
│  ├─ useMemo(() => getRecentActivityWithTime(5))                    │
│  │   ↓                                                               │
│  │  [5 most recent items with time labels]                         │
│  │                                                                    │
│  └─ recentActivity.map(activity => {                                │
│      ├─ Get icon: getActivityIconStyle(...)                        │
│      ├─ Get status color: getStatusColor(...)                      │
│      └─ Render card with:                                           │
│          ├─ Icon (colored background)                               │
│          ├─ Title                                                    │
│          ├─ Description                                              │
│          ├─ Time label ("2 days ago")                              │
│          ├─ Status badge (colored)                                  │
│          └─ First tag                                               │
│    })                                                                │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         UI OUTPUT                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Recent Activity Section (Homepage)                                  │
│                                                                       │
│  ┌───────────────────────────────────────────────────┐              │
│  │  🧠  AI-Powered Chatbot                          │              │
│  │     Intelligent customer support using GPT-4      │              │
│  │     Today • in-progress • AI                      │              │
│  └───────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌───────────────────────────────────────────────────┐              │
│  │  🎨  UI/UX Design Service                        │              │
│  │     Strategic design for digital products         │              │
│  │     2 days ago • available • Design               │              │
│  └───────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌───────────────────────────────────────────────────┐              │
│  │  ⚡  Workflow Automation System                  │              │
│  │     Smart automation for business processes       │              │
│  │     1 week ago • completed • Automation           │              │
│  └───────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌───────────────────────────────────────────────────┐              │
│  │  📄  Building Scalable AI Systems                │              │
│  │     Learn how to build AI that scales             │              │
│  │     2 weeks ago • published • AI                  │              │
│  └───────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌───────────────────────────────────────────────────┐              │
│  │  🏅  AWS Solutions Architect Professional        │              │
│  │     Advanced cloud architecture certification     │              │
│  │     1 month ago • verified • AWS                  │              │
│  └───────────────────────────────────────────────────┘              │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Sequence

```
1. USER ACTION
   └─ Adds new project to data/work/allProjects.ts
      with date: '2025-10-08'

2. BUILD TIME
   └─ Next.js imports all data files
      └─ getAllActivityItems() aggregates:
         ├─ 12 projects
         ├─ 4 services
         ├─ 6 articles
         ├─ 5 achievements
         ├─ 2 certifications
         └─ 2 education items
         = 31 total items

3. SORTING
   └─ Sort by date (newest first)
      └─ Take top 5 items

4. ENHANCEMENT
   └─ For each item:
      ├─ Calculate "time ago" label
      ├─ Select appropriate icon based on tags/type
      └─ Get status color

5. RENDERING
   └─ Display 5 cards in Recent Activity
      └─ Each with:
         ├─ Icon + color
         ├─ Title
         ├─ Description
         ├─ Time label
         ├─ Status badge
         └─ First tag

6. USER SEES
   └─ Updated Recent Activity feed
      └─ New item appears at top (if newest)
```

---

## Icon Selection Decision Flow

```
User adds item with tags: ['AI', 'Machine Learning', 'NLP']
                           ↓
┌──────────────────────────────────────────────────────────┐
│ getActivityIconStyle(type: 'Project',                    │
│                       category: 'AI/ML',                 │
│                       tags: ['AI', 'ML', 'NLP'])         │
└──────────────────────────────────────────────────────────┘
                           ↓
              ┌────────────┴─────────────┐
              │  STEP 1: Check Tags      │
              └────────────┬─────────────┘
                           ↓
              Does tagString include "AI"? → YES!
                           ↓
              ┌────────────┴─────────────┐
              │  Return Brain Icon       │
              │  • icon: Brain           │
              │  • bgColor: purple/10    │
              │  • textColor: purple     │
              │  • label: 'AI/ML'        │
              └──────────────────────────┘
                           ↓
              [Skip type-based check]
                           ↓
              ┌────────────┴─────────────┐
              │  Render in UI            │
              │  🧠 (Purple Brain icon)  │
              └──────────────────────────┘
```

**Alternative path (no AI tag):**

```
User adds item with tags: ['React', 'Web', 'Frontend']
                           ↓
              Does tagString include "AI"? → NO
              Does tagString include "Automation"? → NO
              Does tagString include "Design"? → NO
                           ↓
              ┌────────────┴─────────────┐
              │  STEP 2: Check Type      │
              └────────────┬─────────────┘
                           ↓
              Type is "Project" → Code2 icon
                           ↓
              ┌────────────┴─────────────┐
              │  Return Code2 Icon       │
              │  • icon: Code2           │
              │  • bgColor: blue/10      │
              │  • textColor: blue       │
              │  • label: 'Project'      │
              └──────────────────────────┘
                           ↓
              ┌────────────┴─────────────┐
              │  Render in UI            │
              │  💻 (Blue Code icon)     │
              └──────────────────────────┘
```

---

## Time Calculation Flow

```
Current date: 2025-10-08
Item date: 2025-10-06 (2 days ago)
                           ↓
┌──────────────────────────────────────────────────────────┐
│ getRelativeTime('2025-10-06')                            │
└──────────────────────────────────────────────────────────┘
                           ↓
              ┌────────────┴─────────────┐
              │  Calculate difference    │
              │  Now - Item = 2 days     │
              └────────────┬─────────────┘
                           ↓
              ┌────────────┴─────────────┐
              │  Check ranges            │
              ├──────────────────────────┤
              │  0 days?     → "Today"   │
              │  1 day?      → "1 day"   │
              │  2-6 days?   → "X days"  ← MATCH
              │  1-2 weeks?  → "X weeks" │
              │  1-11 months?→ "X months"│
              │  1+ years?   → "X years" │
              └────────────┬─────────────┘
                           ↓
              ┌────────────┴─────────────┐
              │  Return "2 days ago"     │
              └──────────────────────────┘
```

---

## Component Integration

```
app/page.tsx (Homepage)
│
├─ Import getRecentActivityWithTime()
│  └─ from lib/utils/recentActivity
│
├─ Import getActivityIconStyle(), getStatusColor()
│  └─ from lib/utils/activityIcons
│
├─ useMemo(() => getRecentActivityWithTime(5))
│  ├─ Runs once on mount
│  ├─ Returns 5 items with time labels
│  └─ Memoized (no recalc on re-render)
│
└─ Render Recent Activity Section
   └─ recentActivity.map(activity => {
      │
      ├─ Get icon config
      │  └─ getActivityIconStyle(type, category, tags)
      │
      ├─ Render motion.div (Framer Motion)
      │  └─ Card with hover animation
      │
      └─ Display:
         ├─ Icon (with color)
         ├─ Title
         ├─ Description
         ├─ Time ("2 days ago")
         ├─ Status badge
         └─ First tag
   })
```

---

## File Dependencies Graph

```
app/page.tsx
    ↓ imports
    ├─ lib/utils/recentActivity.ts
    │   ↓ imports
    │   ├─ data/work/allProjects.ts
    │   ├─ data/services/servicesDetailed.ts
    │   ├─ data/articles/articlesDetailed.ts
    │   ├─ data/achievements/achievementsDetailed.ts
    │   └─ data/educationData.ts
    │
    └─ lib/utils/activityIcons.ts
        ↓ imports
        └─ lucide-react (icon components)
```

---

## Performance Characteristics

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Aggregation | O(n) | n = total items across all sources (~30) |
| Sorting | O(n log n) | JavaScript built-in sort (~30 items) |
| Icon selection | O(1) | Hash map lookup + tag search |
| Time calculation | O(1) | Date subtraction + range check |
| Rendering | O(k) | k = 5 (limited items displayed) |
| **Total** | **O(n log n)** | Fast even with 100+ items |

**Memoization benefit:**
- Without: O(n log n) on every render
- With: O(n log n) once on mount, O(1) on re-render

---

## Type Safety Flow

```
TypeScript Compilation
│
├─ Check RecentActivityItem interface
│  ├─ id: string | number ✓
│  ├─ title: string ✓
│  ├─ type: 'Project' | 'Article' | ... ✓
│  ├─ date: string ✓
│  ├─ description: string ✓
│  ├─ tags: string[] ✓
│  ├─ status: string ✓
│  └─ category?: string ✓
│
├─ Validate data conversions
│  ├─ projects.map(...) → RecentActivityItem[] ✓
│  ├─ services.map(...) → RecentActivityItem[] ✓
│  └─ articles.map(...) → RecentActivityItem[] ✓
│
├─ Check function signatures
│  ├─ getRecentActivityWithTime(limit: number) ✓
│  ├─ getActivityIconStyle(type, category, tags) ✓
│  └─ getStatusColor(status: string) ✓
│
└─ Validate UI props
   ├─ activity.type → valid type ✓
   ├─ activity.tags → string[] ✓
   └─ activity.time → string ✓

Result: ✅ Zero type errors
```

---

**Architecture Version:** 2.0  
**Last Updated:** October 8, 2025  
**Status:** Production Ready ✅
