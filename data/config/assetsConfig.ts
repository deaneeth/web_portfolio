/**
 * Assets Configuration
 * 
 * Central configuration for all image assets and placeholders
 * used throughout the portfolio.
 */

// ============================================================================
// ASSET PATHS CONFIGURATION
// ============================================================================

/**
 * Base paths for different asset types
 */
export const ASSET_PATHS = {
  images: '/assets/images',
  avatars: '/assets/avatars',
  projects: '/assets/projects',
  achievements: '/assets/achievements',
  articles: '/assets/articles',
  icons: '/assets/icons',
  documents: '/assets',
} as const;

// ============================================================================
// PLACEHOLDER IMAGES
// ============================================================================

/**
 * Placeholder images for different content types
 * These are used when actual images are not available
 */
export const PLACEHOLDER_IMAGES = {
  project: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  article: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
  achievement: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  default: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
} as const;

/**
 * Local placeholder image path (for offline development)
 */
export const LOCAL_PLACEHOLDER = '/image.png';

// ============================================================================
// IMAGE VALIDATION
// ============================================================================

/**
 * Check if an image URL is external (hosted on CDN)
 */
export function isExternalImage(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Check if an image URL is local (in public folder)
 */
export function isLocalImage(url: string): boolean {
  return url.startsWith('/') && !isExternalImage(url);
}

/**
 * Get the appropriate image URL with fallback
 * @param imageUrl - The image URL to validate
 * @param fallbackType - Type of placeholder to use if image is invalid
 */
export function getImageUrl(
  imageUrl: string | undefined | null,
  fallbackType: keyof typeof PLACEHOLDER_IMAGES = 'default'
): string {
  // If no image provided, return placeholder
  if (!imageUrl || imageUrl.trim() === '') {
    return PLACEHOLDER_IMAGES[fallbackType];
  }

  // Return the image URL as-is (it could be external or local)
  return imageUrl;
}

/**
 * Convert external image to local path
 * @param externalUrl - External image URL
 * @param localPath - Local path where image should be stored
 */
export function externalToLocalPath(externalUrl: string, localPath: string): string {
  if (!isExternalImage(externalUrl)) {
    return externalUrl;
  }
  return localPath;
}

// ============================================================================
// IMAGE MIGRATION HELPERS
// ============================================================================

/**
 * Template for migrating from external CDN to local images
 * Usage: Replace external URLs with local paths when ready
 */
export const MIGRATION_MAP = {
  // Example:
  // 'https://images.pexels.com/photos/8386440/...': '/assets/projects/ai-vision-system.jpg',
} as const;

/**
 * Get local path for an image (with migration support)
 */
export function getLocalImagePath(
  externalUrl: string,
  defaultLocal: string
): string {
  // Check if there's a migration mapping
  if (externalUrl in MIGRATION_MAP) {
    return MIGRATION_MAP[externalUrl as keyof typeof MIGRATION_MAP];
  }
  
  // Return the default local path
  return defaultLocal;
}

// ============================================================================
// CURRENT IMAGE INVENTORY
// ============================================================================

/**
 * Current image usage across the portfolio
 * This serves as documentation and migration planning
 */
export const IMAGE_INVENTORY = {
  // Projects (4 images)
  projects: [
    {
      id: 1,
      title: 'AI-Powered Vision System',
      current: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      suggested: '/assets/projects/ai-vision-system.jpg',
      status: 'external', // 'external' | 'local' | 'migrated'
    },
    {
      id: 2,
      title: 'IoT Smart Home Automation',
      current: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800',
      suggested: '/assets/projects/iot-smart-home.jpg',
      status: 'external',
    },
    {
      id: 3,
      title: 'Autonomous Navigation Robot',
      current: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      suggested: '/assets/projects/autonomous-robot.jpg',
      status: 'external',
    },
    {
      id: 4,
      title: 'Real-time Data Analytics Dashboard',
      current: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=800',
      suggested: '/assets/projects/analytics-dashboard.jpg',
      status: 'external',
    },
  ],

  // Articles (5 images - some duplicates)
  articles: [
    {
      id: 'ai-ml-future',
      current: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      suggested: '/assets/articles/ai-ml-future.jpg',
      status: 'external',
    },
    {
      id: 'iot-robotics',
      current: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
      suggested: '/assets/articles/iot-robotics.jpg',
      status: 'external',
    },
    {
      id: 'computer-vision',
      current: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
      suggested: '/assets/articles/computer-vision.jpg',
      status: 'external',
    },
    {
      id: 'data-science',
      current: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=400',
      suggested: '/assets/articles/data-science.jpg',
      status: 'external',
    },
  ],

  // Achievements (5 images - some duplicates)
  achievements: [
    {
      id: 'aws-certified',
      current: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
      suggested: '/assets/achievements/aws-certified.jpg',
      status: 'external',
    },
    {
      id: 'hackathon-winner',
      current: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
      suggested: '/assets/achievements/hackathon-winner.jpg',
      status: 'external',
    },
    {
      id: 'research-paper',
      current: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=400',
      suggested: '/assets/achievements/research-paper.jpg',
      status: 'external',
    },
    {
      id: 'tensorflow-cert',
      current: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
      suggested: '/assets/achievements/tensorflow-cert.jpg',
      status: 'external',
    },
    {
      id: 'deans-list',
      current: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      suggested: '/assets/achievements/deans-list.jpg',
      status: 'external',
    },
  ],

  // Testimonials (6 avatars)
  testimonials: [
    {
      id: 'sarah-johnson',
      current: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      suggested: '/assets/avatars/sarah-johnson.jpg',
      status: 'external',
    },
    {
      id: 'michael-chen',
      current: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      suggested: '/assets/avatars/michael-chen.jpg',
      status: 'external',
    },
    {
      id: 'emily-rodriguez',
      current: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      suggested: '/assets/avatars/emily-rodriguez.jpg',
      status: 'external',
    },
    {
      id: 'david-park',
      current: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      suggested: '/assets/avatars/david-park.jpg',
      status: 'external',
    },
    {
      id: 'lisa-anderson',
      current: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      suggested: '/assets/avatars/lisa-anderson.jpg',
      status: 'external',
    },
    {
      id: 'james-wilson',
      current: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      suggested: '/assets/avatars/james-wilson.jpg',
      status: 'external',
    },
  ],

  // Existing local images
  local: [
    {
      path: '/image.png',
      description: 'Default placeholder image',
      status: 'local',
    },
    {
      path: '/assets/pfimg.png',
      description: 'Profile image',
      status: 'local',
    },
    {
      path: '/assets/resume.pdf',
      description: 'Resume PDF',
      status: 'local',
    },
  ],
};

// ============================================================================
// MIGRATION UTILITIES
// ============================================================================

/**
 * Get summary of image usage
 */
export function getImageSummary() {
  const { projects, articles, achievements, testimonials, local } = IMAGE_INVENTORY;
  
  return {
    total: projects.length + articles.length + achievements.length + testimonials.length + local.length,
    external: projects.length + articles.length + achievements.length + testimonials.length,
    local: local.length,
    byType: {
      projects: projects.length,
      articles: articles.length,
      achievements: achievements.length,
      testimonials: testimonials.length,
      local: local.length,
    },
  };
}

/**
 * Get list of all external images (for migration planning)
 */
export function getExternalImages(): string[] {
  const { projects, articles, achievements, testimonials } = IMAGE_INVENTORY;
  
  const allExternal = [
    ...projects.map(p => p.current),
    ...articles.map(a => a.current),
    ...achievements.map(a => a.current),
    ...testimonials.map(t => t.current),
  ];

  // Remove duplicates
  return Array.from(new Set(allExternal));
}

/**
 * Get suggested folder structure for local images
 */
export function getSuggestedFolderStructure(): string[] {
  return [
    'public/',
    '├── assets/',
    '│   ├── images/',
    '│   ├── projects/',
    '│   │   ├── ai-vision-system.jpg',
    '│   │   ├── iot-smart-home.jpg',
    '│   │   ├── autonomous-robot.jpg',
    '│   │   └── analytics-dashboard.jpg',
    '│   ├── articles/',
    '│   │   ├── ai-ml-future.jpg',
    '│   │   ├── iot-robotics.jpg',
    '│   │   ├── computer-vision.jpg',
    '│   │   └── data-science.jpg',
    '│   ├── achievements/',
    '│   │   ├── aws-certified.jpg',
    '│   │   ├── hackathon-winner.jpg',
    '│   │   ├── research-paper.jpg',
    '│   │   ├── tensorflow-cert.jpg',
    '│   │   └── deans-list.jpg',
    '│   ├── avatars/',
    '│   │   ├── sarah-johnson.jpg',
    '│   │   ├── michael-chen.jpg',
    '│   │   ├── emily-rodriguez.jpg',
    '│   │   ├── david-park.jpg',
    '│   │   ├── lisa-anderson.jpg',
    '│   │   └── james-wilson.jpg',
    '│   ├── pfimg.png (existing)',
    '│   └── resume.pdf (existing)',
    '└── image.png (existing placeholder)',
  ];
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  ASSET_PATHS,
  PLACEHOLDER_IMAGES,
  LOCAL_PLACEHOLDER,
  IMAGE_INVENTORY,
  getImageUrl,
  isExternalImage,
  isLocalImage,
  getImageSummary,
  getExternalImages,
  getSuggestedFolderStructure,
};
