# Article Images

Place your article cover images in this folder.

## Recommended Specifications

- **Dimensions:** 400x300 pixels (4:3 aspect ratio)
- **Format:** JPEG or WebP
- **Max Size:** 100KB
- **Naming:** Use kebab-case (e.g., `ai-ml-future.jpg`)

## Current Articles

The following article images are needed:

1. **ai-ml-future.jpg** - The Future of AI and Machine Learning
2. **iot-robotics.jpg** - Building Smart IoT Systems with Robotics
3. **computer-vision.jpg** - Computer Vision Applications in Real World
4. **data-science.jpg** - Data Science Best Practices for 2024

## Adding a New Article Image

1. Optimize your image (400x300px, <100KB)
2. Name it using kebab-case: `my-article-slug.jpg`
3. Place it in this folder
4. Update `data/articles/articlesDetailed.ts`:
   ```typescript
   image: '/assets/articles/my-article-slug.jpg',
   ```

## Optimization Tools

- [TinyPNG](https://tinypng.com/) - Compression
- [Squoosh](https://squoosh.app/) - Format conversion
- [Compressor.io](https://compressor.io/) - Quality optimization

## Current Status

🔴 **Currently using external CDN images** (Pexels)  
🟢 **Ready for local images** - Just add files and update paths in data files

---

For more details, see: `/data/ASSETS_MIGRATION_GUIDE.md`
