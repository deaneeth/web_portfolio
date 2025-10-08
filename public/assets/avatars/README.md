# Testimonial Avatar Images

Place your testimonial author avatar images in this folder.

## Recommended Specifications

- **Dimensions:** 100x100 pixels (1:1 square ratio)
- **Format:** JPEG, WebP, or PNG
- **Max Size:** 50KB
- **Naming:** Use kebab-case (e.g., `john-doe.jpg`)

## Current Testimonials

The following avatar images are needed:

1. **sarah-johnson.jpg** - Sarah Johnson, CTO at TechCorp
2. **michael-chen.jpg** - Michael Chen, Product Manager at InnovateLab
3. **emily-davis.jpg** - Emily Davis, CEO at StartupHub

## Adding a New Avatar Image

1. Optimize your image (100x100px, <50KB)
2. Name it using kebab-case: `firstname-lastname.jpg`
3. Place it in this folder
4. Update `data/services/testimonials.ts`:
   ```typescript
   avatar: '/assets/avatars/firstname-lastname.jpg',
   ```

## Optimization Tools

- [TinyPNG](https://tinypng.com/) - Compression
- [Squoosh](https://squoosh.app/) - Format conversion
- [Compressor.io](https://compressor.io/) - Quality optimization

## Tips for Avatar Images

- Use professional headshots
- Ensure good lighting and clear face visibility
- Crop to square (1:1) aspect ratio
- Center the face in the frame
- Use neutral or professional backgrounds
- Consider circular cropping in your design system

## Current Status

🔴 **Currently using external CDN images** (Pexels)  
🟢 **Ready for local images** - Just add files and update paths in data files

---

For more details, see: `/data/ASSETS_MIGRATION_GUIDE.md`
