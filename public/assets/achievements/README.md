# Achievement Badge Images

Place your achievement badge/certificate images in this folder.

## Recommended Specifications

- **Dimensions:** 400x300 pixels (4:3 aspect ratio)
- **Format:** JPEG, WebP, or PNG (PNG for badges with transparency)
- **Max Size:** 100KB
- **Naming:** Use kebab-case (e.g., `robotics-championship.jpg`)

## Current Achievements

The following achievement images are needed:

1. **robotics-championship.jpg** - National Robotics Championship Winner
2. **hackathon-winner.jpg** - International Hackathon Winner
3. **research-publication.jpg** - Research Publication in IEEE
4. **ai-certification.jpg** - AI/ML Certification from Stanford

## Adding a New Achievement Image

1. Optimize your image (400x300px, <100KB)
2. Name it using kebab-case: `my-achievement-slug.jpg`
3. Place it in this folder
4. Update `data/achievements/achievementsDetailed.ts`:
   ```typescript
   image: '/assets/achievements/my-achievement-slug.jpg',
   ```

## Optimization Tools

- [TinyPNG](https://tinypng.com/) - Compression
- [Squoosh](https://squoosh.app/) - Format conversion
- [Compressor.io](https://compressor.io/) - Quality optimization

## Tips for Badge Images

- Use high-quality scans or photos of certificates
- Ensure text on badges is readable
- Consider using PNG for badges with transparency
- Crop to focus on the important parts (logo, title, date)

## Current Status

🔴 **Currently using external CDN images** (Pexels)  
🟢 **Ready for local images** - Just add files and update paths in data files

---

For more details, see: `/data/ASSETS_MIGRATION_GUIDE.md`
