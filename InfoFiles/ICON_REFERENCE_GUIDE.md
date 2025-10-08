# 🎨 Recent Activity Icon Reference

## Quick Visual Guide to Activity Icons

### Type-Based Icons (Default Mapping)

| Type | Icon | Color | Example Use Case |
|------|------|-------|------------------|
| **Project** | `Code2` 💻 | Blue (`bg-blue-500/10 text-blue-500`) | Any software project, app, or code |
| **Experience** | `Briefcase` 💼 | Slate (`bg-slate-500/10 text-slate-500`) | Work experience, jobs, positions |
| **Article** | `FileText` 📄 | Green (`bg-green-500/10 text-green-500`) | Blog posts, tutorials, documentation |
| **Achievement** | `Trophy` 🏆 | Yellow (`bg-yellow-500/10 text-yellow-500`) | Awards, milestones, recognitions |
| **Certification** | `Award` 🏅 | Amber (`bg-amber-500/10 text-amber-500`) | Professional certifications |
| **Service** | `Wrench` 🔧 | Purple (`bg-purple-500/10 text-purple-500`) | Offered services, consulting |
| **Academic** | `GraduationCap` 🎓 | Indigo (`bg-indigo-500/10 text-indigo-500`) | Education, degrees, courses |
| **Testimonial** | `MessageSquare` 💬 | Teal (`bg-teal-500/10 text-teal-500`) | Client testimonials, reviews |

---

### Tag-Based Icons (Smart Selection)

These icons override the type-based icons when specific tags are detected:

| Tags Containing | Icon | Color | Priority |
|----------------|------|-------|----------|
| `AI`, `ML`, `Machine Learning` | `Brain` 🧠 | Purple (`bg-purple-500/10 text-purple-500`) | **HIGHEST** |
| `Automation`, `Workflow` | `Zap` ⚡ | Orange (`bg-orange-500/10 text-orange-500`) | **HIGH** |
| `Design`, `UI`, `UX` | `Palette` 🎨 | Pink (`bg-pink-500/10 text-pink-500`) | **HIGH** |

---

## 📖 Icon Selection Examples

### Example 1: AI Project
```typescript
{
  type: 'Project',
  title: 'ChatGPT Clone',
  tags: ['AI', 'NLP', 'React']
  //      ↑ Contains "AI"
}
```
**Result:** 🧠 **Brain icon** (purple) - Smart selection based on AI tag

---

### Example 2: Regular Web Project
```typescript
{
  type: 'Project',
  title: 'E-commerce Platform',
  tags: ['React', 'Node.js', 'MongoDB']
  //      ↑ No AI/Design/Automation keywords
}
```
**Result:** 💻 **Code2 icon** (blue) - Default project icon

---

### Example 3: Automation Service
```typescript
{
  type: 'Service',
  title: 'Workflow Automation',
  tags: ['Automation', 'Python', 'API']
  //      ↑ Contains "Automation"
}
```
**Result:** ⚡ **Zap icon** (orange) - Smart selection based on automation tag

---

### Example 4: Design Article
```typescript
{
  type: 'Article',
  title: 'Modern UI Trends 2025',
  tags: ['UI', 'Design', 'CSS']
  //      ↑ Contains "UI" and "Design"
}
```
**Result:** 🎨 **Palette icon** (pink) - Smart selection based on design tags

---

### Example 5: Certification
```typescript
{
  type: 'Certification',
  title: 'AWS Solutions Architect',
  tags: ['AWS', 'Cloud', 'Certification']
  //      ↑ No special keywords
}
```
**Result:** 🏅 **Award icon** (amber) - Type-based selection for certifications

---

### Example 6: Achievement
```typescript
{
  type: 'Achievement',
  title: 'Top Rated Seller on Fiverr',
  tags: ['Fiverr', 'Business', 'Milestone']
  //      ↑ No special keywords
}
```
**Result:** 🏆 **Trophy icon** (yellow) - Type-based selection for achievements

---

## 🎯 Status Colors Reference

The status badge color is determined by the `status` field:

| Status Value | Color | Visual |
|--------------|-------|--------|
| `'completed'` | Green (`text-green-500`) | ✅ |
| `'published'` | Green (`text-green-500`) | ✅ |
| `'earned'` | Green (`text-green-500`) | ✅ |
| `'verified'` | Green (`text-green-500`) | ✅ |
| `'in-progress'` | Blue (`text-blue-500`) | 🔵 |
| `'ongoing'` | Blue (`text-blue-500`) | 🔵 |
| `'available'` | Purple (`text-purple-500`) | 🟣 |
| `'active'` | Purple (`text-purple-500`) | 🟣 |
| `'draft'` | Yellow (`text-yellow-500`) | 🟡 |
| `'pending'` | Yellow (`text-yellow-500`) | 🟡 |
| Other | Gray (`text-gray-500`) | ⚪ |

---

## 🖼️ Complete Visual Examples

### Example Activity Cards (What You'll See)

#### 1. AI Project - Today
```
┌─────────────────────────────────────────────────┐
│  🧠  Voice Assistant with RAG                   │
│     AI voice assistant using RAG for context    │
│     Today • in-progress • AI                    │
└─────────────────────────────────────────────────┘
     ↑          ↑            ↑
   Purple     Time        Status
   Brain       ago        (Blue)
```

#### 2. Design Service - 1 week ago
```
┌─────────────────────────────────────────────────┐
│  🎨  UI/UX Design Consultation                  │
│     Strategic design for digital products       │
│     1 week ago • available • Design             │
└─────────────────────────────────────────────────┘
     ↑            ↑           ↑
    Pink        Time       Status
   Palette       ago      (Purple)
```

#### 3. Automation Project - 3 days ago
```
┌─────────────────────────────────────────────────┐
│  ⚡  Workflow Automation System                 │
│     Smart automation for business processes     │
│     3 days ago • completed • Automation         │
└─────────────────────────────────────────────────┘
     ↑           ↑            ↑
   Orange      Time        Status
    Zap         ago        (Green)
```

#### 4. Certification - 2 weeks ago
```
┌─────────────────────────────────────────────────┐
│  🏅  AWS Solutions Architect Professional       │
│     Advanced cloud architecture certification   │
│     2 weeks ago • verified • AWS                │
└─────────────────────────────────────────────────┘
     ↑            ↑           ↑
   Amber        Time       Status
   Award         ago       (Green)
```

#### 5. Article - 1 month ago
```
┌─────────────────────────────────────────────────┐
│  🧠  Future of AI in Creative Industries        │
│     Exploring AI transformation in creativity   │
│     1 month ago • published • AI                │
└─────────────────────────────────────────────────┘
     ↑             ↑            ↑
   Purple        Time        Status
   Brain          ago        (Green)
```

---

## 🔍 Icon Selection Decision Tree

```
Is there an "AI" or "ML" tag?
├─ YES → 🧠 Brain icon (purple)
└─ NO → Is there an "Automation" tag?
    ├─ YES → ⚡ Zap icon (orange)
    └─ NO → Is there a "Design"/"UI"/"UX" tag?
        ├─ YES → 🎨 Palette icon (pink)
        └─ NO → Use type-based icon:
            ├─ Project → 💻 Code2 (blue)
            ├─ Article → 📄 FileText (green)
            ├─ Achievement → 🏆 Trophy (yellow)
            ├─ Certification → 🏅 Award (amber)
            ├─ Service → 🔧 Wrench (purple)
            ├─ Academic → 🎓 GraduationCap (indigo)
            └─ Default → ✨ Sparkles (gray)
```

---

## 🎨 Color Palette Reference

### Icon Background Colors (10% opacity)

| Color | Class | Hex Equivalent |
|-------|-------|----------------|
| Blue | `bg-blue-500/10` | `#3b82f6` at 10% |
| Green | `bg-green-500/10` | `#22c55e` at 10% |
| Yellow | `bg-yellow-500/10` | `#eab308` at 10% |
| Amber | `bg-amber-500/10` | `#f59e0b` at 10% |
| Purple | `bg-purple-500/10` | `#a855f7` at 10% |
| Orange | `bg-orange-500/10` | `#f97316` at 10% |
| Pink | `bg-pink-500/10` | `#ec4899` at 10% |
| Indigo | `bg-indigo-500/10` | `#6366f1` at 10% |
| Gray | `bg-gray-500/10` | `#6b7280` at 10% |

### Icon Text Colors (full opacity)

| Color | Class | Hex |
|-------|-------|-----|
| Blue | `text-blue-500` | `#3b82f6` |
| Green | `text-green-500` | `#22c55e` |
| Yellow | `text-yellow-500` | `#eab308` |
| Amber | `text-amber-500` | `#f59e0b` |
| Purple | `text-purple-500` | `#a855f7` |
| Orange | `text-orange-500` | `#f97316` |
| Pink | `text-pink-500` | `#ec4899` |
| Indigo | `text-indigo-500` | `#6366f1` |
| Gray | `text-gray-500` | `#6b7280` |

---

## 📊 Quick Tag → Icon Cheat Sheet

Copy-paste this when adding new data:

```typescript
// Want Brain icon (AI)?
tags: ['AI', 'Machine Learning', 'NLP']

// Want Zap icon (Automation)?
tags: ['Automation', 'Workflow', 'API']

// Want Palette icon (Design)?
tags: ['Design', 'UI/UX', 'Creative']

// Want Code2 icon (Regular Project)?
tags: ['React', 'Node.js', 'Web']  // No AI/Automation/Design

// Want Trophy icon (Achievement)?
type: 'Achievement'

// Want Award icon (Certification)?
type: 'Certification'

// Want FileText icon (Article)?
type: 'Article'

// Want Wrench icon (Service)?
type: 'Service'

// Want GraduationCap icon (Academic)?
type: 'Academic'
```

---

**Last Updated:** October 8, 2025  
**Icon System Version:** 2.0  
**Total Unique Icons:** 9 (Brain, Zap, Palette, Code2, FileText, Trophy, Award, Wrench, GraduationCap)
