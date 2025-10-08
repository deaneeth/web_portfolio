# Project Images

Place your project images in this folder.

## Recommended Specifications

- **Dimensions:** 800x600 pixels (4:3 aspect ratio)
- **Format:** JPEG or WebP
- **Max Size:** 200KB
- **Naming:** Use kebab-case (e.g., `ai-vision-system.jpg`)

## Current Projects

The following project images are needed:

1. **ai-vision-system.jpg** - AI-Powered Vision System
2. **iot-smart-home.jpg** - IoT Smart Home Automation
3. **autonomous-robot.jpg** - Autonomous Navigation Robot
4. **analytics-dashboard.jpg** - Real-time Data Analytics Dashboard

## Adding a New Project Image

1. Optimize your image (800x600px, <200KB)
2. Name it using kebab-case: `my-project-name.jpg`
3. Place it in this folder
4. Update `data/work/allProjects.ts`:
   ```typescript
   image: '/assets/projects/my-project-name.jpg',
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
