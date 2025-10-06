# Recent Activity Automation System

## 📋 Overview

The "Recent Activity" section on the homepage has been **fully automated** using a data-driven approach. Updates now happen automatically when you add new entries to JSON files - no manual code editing required.

---

## 🎯 How It Works

### **Data Sources**
All activity data is stored in `/data` directory with separate JSON files for each content type:

```
/data
  ├── projects.json        # Completed projects
  ├── articles.json        # Published articles
  ├── certifications.json  # Professional certifications
  ├── achievements.json    # Awards and milestones
  ├── services.json        # Service offerings
  └── academic.json        # Academic achievements
```

### **Automatic Aggregation**
The utility function in `lib/utils/recentActivity.ts`:
- Merges all JSON data sources
- Sorts by date (newest first)
- Returns the latest 4 items for display
- Calculates relative time ("2 days ago", "1 week ago", etc.)

### **Homepage Rendering**
The homepage (`app/page.tsx`) uses `useMemo` for performance and automatically:
- Displays the latest activities
- Shows appropriate icons and colors for each type
- Provides clickable links to detailed pages
- Maintains all original animations and styles

---

## ✏️ Adding New Activity Items

### **Step 1: Choose the Right File**
Select the appropriate JSON file based on content type:
- New project? → `projects.json`
- Published article? → `articles.json`
- Got certified? → `certifications.json`
- Won award? → `achievements.json`
- New service? → `services.json`
- Academic milestone? → `academic.json`

### **Step 2: Add Your Entry**
Copy this template and add to the array:

```json
{
  "id": "unique-id-here",
  "title": "Your Activity Title",
  "type": "Project|Article|Certification|Achievement|Service|Academic",
  "date": "2025-10-05",
  "description": "Short description (1-2 sentences)",
  "link": "/work",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "status": "completed|published|earned|available|in-progress"
}
```

### **Step 3: Save & Refresh**
The Recent Activity section will **automatically update** with your new entry!

---

## 📝 Data Schema

### **Required Fields**
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier | `"project-001"` |
| `title` | string | Activity title | `"Neural Style Transfer Engine"` |
| `type` | string | Content type | `"Project"` *(capitalized!)* |
| `date` | string | ISO date format | `"2025-10-05"` |
| `description` | string | Brief description | `"Completed AI-powered system"` |
| `link` | string | Target page | `"/work"` or `"/articles"` |
| `tags` | array | Related keywords | `["AI", "ML", "React"]` |
| `status` | string | Current status | `"completed"` or `"published"` |

### **Optional Fields**
Add any additional properties specific to your content type:
- `featured` (boolean) - Highlight important items
- `issuer` (string) - For certifications
- `credentialId` (string) - Certification ID
- `readTime` (string) - For articles
- `institution` (string) - For academic items
- `degree` (string) - For academic items

---

## 🎨 Visual Styles

Each activity type has its own icon and color scheme:

| Type | Icon | Color |
|------|------|-------|
| **Project** | Code | Blue (`bg-blue-500/10`) |
| **Article** | Book Open | Green (`bg-green-500/10`) |
| **Achievement** | Trophy | Yellow (`bg-yellow-500/10`) |
| **Certification** | Trophy | Yellow (`bg-yellow-500/10`) |
| **Service** | Briefcase | Purple (`bg-purple-500/10`) |
| **Academic** | Book Open | Indigo (`bg-indigo-500/10`) |

### **Status Colors**
- `completed` → Green
- `published` → Blue
- `earned` → Yellow
- `available` → Purple
- Other → Gray

---

## 🔧 Advanced Features

### **Filter by Type**
```typescript
import { getActivityByType } from '@/lib/utils/recentActivity';

const projects = getActivityByType('Project', 5); // Get 5 latest projects
```

### **Filter by Time Period**
```typescript
import { getActivityFromLastDays } from '@/lib/utils/recentActivity';

const lastWeek = getActivityFromLastDays(7); // Get all from last 7 days
```

### **Get All Items**
```typescript
import { getAllActivityItems } from '@/lib/utils/recentActivity';

const everything = getAllActivityItems(); // All activities, unsorted
```

### **Custom Limit**
```typescript
import { getRecentActivity } from '@/lib/utils/recentActivity';

const top3 = getRecentActivity(3); // Get only 3 latest items
```

---

## 📊 Examples

### **Example 1: New Project**
```json
{
  "id": "project-004",
  "title": "E-Commerce AI Chatbot",
  "type": "Project",
  "date": "2025-10-05",
  "description": "Built intelligent customer support chatbot for online stores",
  "link": "/work",
  "tags": ["AI", "NLP", "ChatGPT", "E-Commerce"],
  "status": "completed",
  "featured": true
}
```

### **Example 2: New Article**
```json
{
  "id": "article-003",
  "title": "Mastering TypeScript for Large-Scale Applications",
  "type": "Article",
  "date": "2025-10-05",
  "description": "Best practices for building maintainable TypeScript codebases",
  "link": "/articles",
  "tags": ["TypeScript", "Software Engineering", "Best Practices"],
  "status": "published",
  "readTime": "15 min read"
}
```

### **Example 3: New Certification**
```json
{
  "id": "cert-003",
  "title": "TensorFlow Developer Certificate",
  "type": "Certification",
  "date": "2025-10-04",
  "description": "Certified in building and training neural networks with TensorFlow",
  "link": "/achievements",
  "tags": ["TensorFlow", "Deep Learning", "AI"],
  "status": "earned",
  "issuer": "Google",
  "credentialId": "TF-DEV-2025-089"
}
```

---

## ⚡ Performance

### **Optimizations Included**
- ✅ **useMemo hook** - Data processed only once per render
- ✅ **Smart sorting** - Pre-sorted by date for efficiency
- ✅ **Limit control** - Only loads necessary items (default: 6)
- ✅ **Type-safe** - Full TypeScript support with interfaces
- ✅ **No re-renders** - Stable references prevent unnecessary updates

### **Load Time**
- JSON files are lightweight (~1-2KB each)
- Data aggregation happens instantly
- No API calls or external dependencies
- Zero impact on page performance

---

## 🎯 Best Practices

### **1. Use ISO Date Format**
```json
"date": "2025-10-05"  ✅ Correct
"date": "Oct 5, 2025"  ❌ Incorrect
```

### **2. Capitalize Type Values**
```json
"type": "Project"       ✅ Correct
"type": "project"       ❌ Incorrect
```

### **3. Keep Descriptions Concise**
```json
"description": "Built AI chatbot for customer support"  ✅ Good
"description": "I spent three months building..."       ❌ Too long
```

### **4. Use Unique IDs**
```json
"id": "project-001"     ✅ Unique
"id": "project"         ❌ Not unique enough
```

### **5. Link to Relevant Pages**
```json
"link": "/work"         ✅ Internal link
"link": "/projects/ai"  ✅ Specific page
"link": "#"             ❌ No link
```

---

## 🛠️ Maintenance

### **Adding New Content Types**
If you need a new type (e.g., "Workshop"):

1. Create `/data/workshops.json`
2. Update `lib/utils/recentActivity.ts` imports
3. Add to `getAllActivityItems()` function
4. Add to `getActivityStyle()` in `app/page.tsx` for icon/color

### **Changing Display Limit**
Edit line in `app/page.tsx`:
```typescript
const recentActivity = useMemo(() => getRecentActivityWithTime(6), []);
//                                                            ↑
//                                                  Change this number
```

### **Modifying Time Calculations**
Edit `getRelativeTime()` function in `lib/utils/recentActivity.ts`

---

## 🔍 Troubleshooting

### **Activity Not Showing Up?**
- ✅ Check date format: `"2025-10-05"` (YYYY-MM-DD)
- ✅ Verify type capitalization: `"Project"` not `"project"`
- ✅ Ensure valid JSON syntax (no trailing commas)
- ✅ Confirm ID is unique
- ✅ Check if it's in the top 4 by date (only latest 4 are shown)

### **Wrong Icon/Color?**
- ✅ Verify `type` field matches exactly: `"Project"`, `"Article"`, etc.
- ✅ Check `getActivityStyle()` function in `app/page.tsx`

### **Status Color Not Working?**
- ✅ Use lowercase for status: `"completed"`, `"published"`, `"earned"`
- ✅ Check status color mapping in the rendering code

---

## 📚 File Structure

```
web_portfolio/
├── data/
│   ├── projects.json         ← Add projects here
│   ├── articles.json         ← Add articles here
│   ├── certifications.json   ← Add certifications here
│   ├── achievements.json     ← Add achievements here
│   ├── services.json         ← Add services here
│   └── academic.json         ← Add academic items here
│
├── lib/
│   └── utils/
│       └── recentActivity.ts ← Data processing logic
│
└── app/
    └── page.tsx              ← Homepage (consumes data)
```

---

## ✅ Summary

**Before:** Manually edit homepage code every time you want to add an activity ❌

**Now:** Simply add a JSON entry and the Recent Activity updates automatically ✅

**Benefits:**
- 🚀 **Faster updates** - No code editing required
- 🎯 **Automatic sorting** - Always shows latest first
- 🎨 **Consistent styling** - Icons and colors handled automatically
- ⚡ **Better performance** - Optimized with useMemo
- 🔧 **Easy maintenance** - Clean separation of data and UI
- 📊 **Scalable** - Add unlimited activities without code changes

---

## 🎉 You're All Set!

Now you can update your Recent Activity section by simply editing JSON files. No more manual code changes!

**Quick Start:**
1. Open the relevant JSON file in `/data`
2. Copy an existing entry
3. Update the values
4. Save the file
5. Refresh your homepage

That's it! 🚀

---

*Last Updated: October 5, 2025*
