# Quick Reference: Adding New Images

## 🚀 Quick Start

### **Option 1: Use External URL (Quick & Easy)**

Simply add the image URL to your data file:

```typescript
// In data/work/allProjects.ts
{
  id: 5,
  title: 'My New Project',
  image: 'https://images.pexels.com/photos/12345678/example.jpeg?auto=compress&cs=tinysrgb&w=800',
  // ... other fields
}
```

✅ **Pros:** Instant, no file management  
❌ **Cons:** Relies on external service

---

### **Option 2: Use Local Image (Recommended for Production)**

1. **Add image to public folder:**
   ```
   public/assets/projects/my-new-project.jpg
   ```

2. **Reference in data file:**
   ```typescript
   {
     id: 5,
     title: 'My New Project',
     image: '/assets/projects/my-new-project.jpg',
     // ... other fields
   }
   ```

✅ **Pros:** Full control, faster loading, works offline  
❌ **Cons:** Requires image optimization

---

## 📁 Where to Add Images

| Content Type | Folder | Size | Data File |
|--------------|--------|------|-----------|
| **Projects** | `public/assets/projects/` | 800x600 | `data/work/allProjects.ts` |
| **Articles** | `public/assets/articles/` | 400x300 | `data/articles/articlesDetailed.ts` |
| **Achievements** | `public/assets/achievements/` | 400x300 | `data/achievements/achievementsDetailed.ts` |
| **Testimonials** | `public/assets/avatars/` | 100x100 | `data/services/testimonials.ts` |

---

## ✏️ Example: Adding a New Project

### **Step 1: Add Image**
Save your image as: `public/assets/projects/ml-classifier.jpg`

### **Step 2: Update Data File**
Open `data/work/allProjects.ts` and add:

```typescript
export const projects: Project[] = [
  // ... existing projects
  {
    id: 5,
    title: 'ML Classifier System',
    description: 'Advanced machine learning classification system',
    longDescription: 'Built a sophisticated ML classifier...',
    category: 'AI & Machine Learning',
    tags: ['Python', 'TensorFlow', 'Keras'],
    image: '/assets/projects/ml-classifier.jpg', // ← Local path
    // OR
    // image: 'https://your-cdn.com/image.jpg', // ← External URL
    github: 'https://github.com/yourusername/ml-classifier',
    demo: 'https://ml-classifier-demo.com',
    featured: true,
    impact: 'Improved accuracy by 25%',
    status: 'Completed',
    date: '2025-01-15', // ISO format YYYY-MM-DD
    problem: 'Existing classifiers had low accuracy',
    solution: 'Implemented ensemble learning approach',
    technologies: ['Python', 'TensorFlow', 'Scikit-learn'],
    metrics: [
      { label: 'Accuracy', value: '94.5%' },
      { label: 'Training Time', value: '2 hours' },
    ],
    type: 'Project',
  },
];
```

### **Step 3: Test**
```bash
npm run dev
```
Visit `/work` to see your new project!

---

## 🎨 Image Optimization Tips

### **Use Online Tools:**
- **TinyPNG:** https://tinypng.com/
- **Squoosh:** https://squoosh.app/

### **Recommended Settings:**
```
Projects:     800x600px, Quality 85%, < 200KB
Articles:     400x300px, Quality 85%, < 100KB
Achievements: 400x300px, Quality 85%, < 100KB
Avatars:      100x100px, Quality 90%, < 50KB
```

---

## 🔍 Finding Free Images

### **Stock Photo Sites:**
- **Pexels:** https://www.pexels.com/ (Free, no attribution required)
- **Unsplash:** https://unsplash.com/ (Free, no attribution required)
- **Pixabay:** https://pixabay.com/ (Free, no attribution required)

### **Search Tips:**
- Projects: "technology", "robot", "ai", "computer", "circuit board"
- Articles: "code", "data", "analytics", "innovation"
- Achievements: "certificate", "award", "medal", "trophy"
- Avatars: "professional", "portrait", "business"

---

## ⚡ Quick Copy-Paste Templates

### **New Project Template**
```typescript
{
  id: 99, // Increment from last ID
  title: 'PROJECT_NAME',
  description: 'Short description (1-2 sentences)',
  category: 'AI & Machine Learning', // or IoT, Robotics, Data Science
  tags: ['Tag1', 'Tag2', 'Tag3'],
  image: '/assets/projects/PROJECT_SLUG.jpg',
  github: 'https://github.com/USERNAME/REPO',
  demo: 'https://demo-url.com',
  featured: true,
  status: 'Completed',
  date: '2025-01-15',
  technologies: ['Tech1', 'Tech2'],
  type: 'Project',
}
```

### **New Article Template**
```typescript
{
  id: 'article-slug',
  title: 'ARTICLE_TITLE',
  date: 'January 15, 2025',
  readTime: '5 min read',
  image: '/assets/articles/ARTICLE_SLUG.jpg',
  link: 'https://medium.com/@username/article-slug',
  excerpt: 'Brief summary (2-3 sentences)',
  tags: ['AI', 'Machine Learning'],
  status: 'published',
  type: 'Article',
}
```

### **New Achievement Template**
```typescript
{
  id: 99,
  title: 'CERTIFICATION_NAME',
  description: 'Description of achievement',
  category: 'Certification', // or Achievement, Academic, Competition
  date: '2025-01-15',
  issuer: 'ORGANIZATION_NAME',
  image: '/assets/achievements/CERT_SLUG.jpg',
  verifyUrl: 'https://verify-url.com/credential',
  skills: ['Skill1', 'Skill2'],
  featured: true,
  type: 'Certification',
}
```

### **New Testimonial Template**
```typescript
{
  id: 99,
  name: 'FULL_NAME',
  role: 'JOB_TITLE',
  company: 'COMPANY_NAME',
  content: 'Testimonial text (2-3 sentences)',
  rating: 5,
  avatar: '/assets/avatars/PERSON_SLUG.jpg',
  date: '2025-01-15',
}
```

---

## ✅ Validation Checklist

Before committing new images:

- [ ] Image is optimized (correct size, compressed)
- [ ] Filename uses kebab-case (lowercase, hyphens)
- [ ] Image is in correct folder
- [ ] Path in data file matches actual file location
- [ ] All required fields are filled in data file
- [ ] Date is in correct format (ISO for most, display for articles)
- [ ] Tested locally (`npm run dev`)
- [ ] No broken image icons

---

## 🐛 Troubleshooting

### **Image not showing:**
1. Check file path is correct (case-sensitive!)
2. Verify image is in `public/` folder
3. Refresh browser (Ctrl+F5)
4. Check browser console for errors

### **Image looks pixelated:**
- Use higher resolution source image
- Minimum 800x600 for projects
- Export as JPEG quality 85%

### **Image file too large:**
- Compress with TinyPNG or Squoosh
- Convert to WebP format
- Reduce dimensions if oversized

---

## 📞 Need Help?

- Review main guide: `ASSETS_MIGRATION_GUIDE.md`
- Check configuration: `data/config/assetsConfig.ts`
- See all data types: `data/types.d.ts`
