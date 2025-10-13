/**
 * Flaticon Tech Icon Mapping System
 * Based on the extended Flaticon Icon Mapping Schema
 * 
 * This utility maps technology names to their corresponding Flaticon icon identifiers
 * and provides color schemes matching the portfolio theme.
 */

export interface TechIconData {
  name: string;
  iconQuery: string; // Flaticon search query
  color: string; // Tailwind gradient classes
  fallbackLetter: string;
}

/**
 * Comprehensive tech stack icon mapping
 * Organized by category for maintainability
 */
export const TECH_ICON_MAP: Record<string, TechIconData> = {
  // Frontend Frameworks
  'React': {
    name: 'React',
    iconQuery: 'react logo flat',
    color: 'from-cyan-500 to-blue-500',
    fallbackLetter: 'R'
  },
  'Next.js': {
    name: 'Next.js',
    iconQuery: 'nextjs logo flat',
    color: 'from-slate-700 to-slate-900',
    fallbackLetter: 'N'
  },
  'Vue.js': {
    name: 'Vue.js',
    iconQuery: 'vuejs logo flat',
    color: 'from-green-500 to-teal-500',
    fallbackLetter: 'V'
  },
  'Angular': {
    name: 'Angular',
    iconQuery: 'angular logo flat',
    color: 'from-red-600 to-red-700',
    fallbackLetter: 'A'
  },
  'Svelte': {
    name: 'Svelte',
    iconQuery: 'svelte logo flat',
    color: 'from-orange-500 to-red-500',
    fallbackLetter: 'S'
  },

  // Backend Frameworks
  'Node.js': {
    name: 'Node.js',
    iconQuery: 'nodejs logo flat',
    color: 'from-green-600 to-green-700',
    fallbackLetter: 'N'
  },
  'Express.js': {
    name: 'Express.js',
    iconQuery: 'express js logo flat',
    color: 'from-slate-600 to-slate-700',
    fallbackLetter: 'E'
  },
  'Django': {
    name: 'Django',
    iconQuery: 'django logo flat',
    color: 'from-green-700 to-green-800',
    fallbackLetter: 'D'
  },
  'Flask': {
    name: 'Flask',
    iconQuery: 'flask logo flat',
    color: 'from-slate-500 to-slate-600',
    fallbackLetter: 'F'
  },
  'FastAPI': {
    name: 'FastAPI',
    iconQuery: 'fastapi logo flat',
    color: 'from-teal-500 to-green-500',
    fallbackLetter: 'F'
  },
  'Laravel': {
    name: 'Laravel',
    iconQuery: 'laravel logo flat',
    color: 'from-red-500 to-orange-500',
    fallbackLetter: 'L'
  },

  // Programming Languages
  'JavaScript': {
    name: 'JavaScript',
    iconQuery: 'javascript logo flat',
    color: 'from-yellow-500 to-yellow-600',
    fallbackLetter: 'J'
  },
  'TypeScript': {
    name: 'TypeScript',
    iconQuery: 'typescript logo flat',
    color: 'from-blue-600 to-blue-700',
    fallbackLetter: 'T'
  },
  'Python': {
    name: 'Python',
    iconQuery: 'python logo flat',
    color: 'from-blue-500 to-yellow-500',
    fallbackLetter: 'P'
  },
  'Java': {
    name: 'Java',
    iconQuery: 'java logo flat',
    color: 'from-red-600 to-orange-600',
    fallbackLetter: 'J'
  },
  'C++': {
    name: 'C++',
    iconQuery: 'cpp logo flat',
    color: 'from-blue-600 to-blue-700',
    fallbackLetter: 'C'
  },
  'C#': {
    name: 'C#',
    iconQuery: 'csharp logo flat',
    color: 'from-purple-600 to-purple-700',
    fallbackLetter: 'C'
  },
  'Go': {
    name: 'Go',
    iconQuery: 'golang logo flat',
    color: 'from-cyan-500 to-blue-500',
    fallbackLetter: 'G'
  },
  'Rust': {
    name: 'Rust',
    iconQuery: 'rust logo flat',
    color: 'from-orange-600 to-red-600',
    fallbackLetter: 'R'
  },
  'PHP': {
    name: 'PHP',
    iconQuery: 'php logo flat',
    color: 'from-indigo-600 to-purple-600',
    fallbackLetter: 'P'
  },

  // Databases & Storage
  'MongoDB': {
    name: 'MongoDB',
    iconQuery: 'mongodb logo flat',
    color: 'from-green-600 to-green-700',
    fallbackLetter: 'M'
  },
  'PostgreSQL': {
    name: 'PostgreSQL',
    iconQuery: 'postgresql logo flat',
    color: 'from-blue-600 to-blue-700',
    fallbackLetter: 'P'
  },
  'MySQL': {
    name: 'MySQL',
    iconQuery: 'mysql logo flat',
    color: 'from-blue-500 to-orange-500',
    fallbackLetter: 'M'
  },
  'Redis': {
    name: 'Redis',
    iconQuery: 'redis logo flat',
    color: 'from-red-600 to-red-700',
    fallbackLetter: 'R'
  },
  'Firebase': {
    name: 'Firebase',
    iconQuery: 'firebase logo flat',
    color: 'from-yellow-500 to-orange-500',
    fallbackLetter: 'F'
  },
  'Supabase': {
    name: 'Supabase',
    iconQuery: 'supabase logo flat',
    color: 'from-green-500 to-emerald-500',
    fallbackLetter: 'S'
  },
  'SQLite': {
    name: 'SQLite',
    iconQuery: 'sqlite logo flat',
    color: 'from-blue-500 to-blue-600',
    fallbackLetter: 'S'
  },

  // AI/ML Frameworks
  'TensorFlow': {
    name: 'TensorFlow',
    iconQuery: 'tensorflow logo flat',
    color: 'from-orange-500 to-orange-600',
    fallbackLetter: 'T'
  },
  'PyTorch': {
    name: 'PyTorch',
    iconQuery: 'pytorch logo flat',
    color: 'from-red-500 to-orange-500',
    fallbackLetter: 'P'
  },
  'Keras': {
    name: 'Keras',
    iconQuery: 'keras logo flat',
    color: 'from-red-600 to-red-700',
    fallbackLetter: 'K'
  },
  'Scikit-learn': {
    name: 'Scikit-learn',
    iconQuery: 'scikit learn logo flat',
    color: 'from-orange-500 to-blue-500',
    fallbackLetter: 'S'
  },
  'OpenCV': {
    name: 'OpenCV',
    iconQuery: 'opencv logo flat',
    color: 'from-red-600 to-blue-600',
    fallbackLetter: 'O'
  },

  // DevOps & Cloud
  'Docker': {
    name: 'Docker',
    iconQuery: 'docker logo flat',
    color: 'from-blue-500 to-blue-600',
    fallbackLetter: 'D'
  },
  'Kubernetes': {
    name: 'Kubernetes',
    iconQuery: 'kubernetes logo flat',
    color: 'from-blue-600 to-purple-600',
    fallbackLetter: 'K'
  },
  'AWS': {
    name: 'AWS',
    iconQuery: 'amazon web services aws logo flat',
    color: 'from-orange-500 to-orange-600',
    fallbackLetter: 'A'
  },
  'Azure': {
    name: 'Azure',
    iconQuery: 'microsoft azure logo flat',
    color: 'from-blue-500 to-blue-600',
    fallbackLetter: 'A'
  },
  'Vercel': {
    name: 'Vercel',
    iconQuery: 'vercel logo flat',
    color: 'from-slate-800 to-slate-900',
    fallbackLetter: 'V'
  },
  'Netlify': {
    name: 'Netlify',
    iconQuery: 'netlify logo flat',
    color: 'from-teal-500 to-cyan-500',
    fallbackLetter: 'N'
  },

  // UI/Styling
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    iconQuery: 'tailwindcss logo flat',
    color: 'from-cyan-400 to-blue-500',
    fallbackLetter: 'T'
  },
  'Bootstrap': {
    name: 'Bootstrap',
    iconQuery: 'bootstrap logo flat',
    color: 'from-purple-600 to-purple-700',
    fallbackLetter: 'B'
  },
  'Material UI': {
    name: 'Material UI',
    iconQuery: 'material ui logo flat',
    color: 'from-blue-500 to-blue-600',
    fallbackLetter: 'M'
  },
  'Figma': {
    name: 'Figma',
    iconQuery: 'figma logo flat',
    color: 'from-purple-500 to-pink-500',
    fallbackLetter: 'F'
  },

  // Mobile Development
  'Flutter': {
    name: 'Flutter',
    iconQuery: 'flutter logo flat',
    color: 'from-blue-400 to-cyan-400',
    fallbackLetter: 'F'
  },
  'React Native': {
    name: 'React Native',
    iconQuery: 'react native logo flat',
    color: 'from-cyan-500 to-blue-500',
    fallbackLetter: 'R'
  },
  'Swift': {
    name: 'Swift',
    iconQuery: 'swift logo flat',
    color: 'from-orange-500 to-red-500',
    fallbackLetter: 'S'
  },
  'Kotlin': {
    name: 'Kotlin',
    iconQuery: 'kotlin logo flat',
    color: 'from-purple-500 to-purple-600',
    fallbackLetter: 'K'
  },
  'Android': {
    name: 'Android',
    iconQuery: 'android logo flat',
    color: 'from-green-500 to-green-600',
    fallbackLetter: 'A'
  },

  // Blockchain/Web3
  'Solidity': {
    name: 'Solidity',
    iconQuery: 'solidity logo flat',
    color: 'from-slate-600 to-slate-700',
    fallbackLetter: 'S'
  },
  'Ethereum': {
    name: 'Ethereum',
    iconQuery: 'ethereum logo flat',
    color: 'from-purple-600 to-indigo-600',
    fallbackLetter: 'E'
  },
  'Solana': {
    name: 'Solana',
    iconQuery: 'solana logo flat',
    color: 'from-purple-500 to-cyan-500',
    fallbackLetter: 'S'
  },

  // Tools & Others
  'Git': {
    name: 'Git',
    iconQuery: 'git logo flat',
    color: 'from-orange-600 to-red-600',
    fallbackLetter: 'G'
  },
  'GitHub': {
    name: 'GitHub',
    iconQuery: 'github logo flat',
    color: 'from-slate-700 to-slate-900',
    fallbackLetter: 'G'
  },
  'GraphQL': {
    name: 'GraphQL',
    iconQuery: 'graphql logo flat',
    color: 'from-pink-600 to-purple-600',
    fallbackLetter: 'G'
  },
  'Socket.io': {
    name: 'Socket.io',
    iconQuery: 'socketio logo flat',
    color: 'from-slate-700 to-slate-800',
    fallbackLetter: 'S'
  },
  'Arduino': {
    name: 'Arduino',
    iconQuery: 'arduino logo flat',
    color: 'from-teal-500 to-cyan-500',
    fallbackLetter: 'A'
  },
  'IoT': {
    name: 'IoT',
    iconQuery: 'iot internet of things logo flat',
    color: 'from-blue-500 to-green-500',
    fallbackLetter: 'I'
  }
};

/**
 * Get tech icon data for a given technology name
 * Case-insensitive matching with fallback
 */
export function getTechIcon(techName: string): TechIconData {
  // Try exact match first
  if (TECH_ICON_MAP[techName]) {
    return TECH_ICON_MAP[techName];
  }

  // Try case-insensitive match
  const matchedKey = Object.keys(TECH_ICON_MAP).find(
    key => key.toLowerCase() === techName.toLowerCase()
  );

  if (matchedKey) {
    return TECH_ICON_MAP[matchedKey];
  }

  // Return fallback for unmapped technologies
  return {
    name: techName,
    iconQuery: `${techName.toLowerCase()} logo flat`,
    color: 'from-indigo-500 to-purple-500',
    fallbackLetter: techName.charAt(0).toUpperCase()
  };
}

/**
 * Generate Flaticon URL (for future implementation)
 * Note: This would require Flaticon API integration or direct URL patterns
 */
export function getFlaticonUrl(iconQuery: string): string {
  // For now, return a placeholder
  // In production, this would call Flaticon API or construct proper URLs
  const encodedQuery = encodeURIComponent(iconQuery);
  return `https://www.flaticon.com/search?word=${encodedQuery}`;
}

/**
 * Get color classes for tech badge background
 */
export function getTechBadgeClasses(techIconData: TechIconData): string {
  return `bg-gradient-to-br ${techIconData.color}/20 border border-${techIconData.color.split(' ')[1].replace('to-', '')}/30`;
}

/**
 * Get text color class for tech name
 */
export function getTechTextColor(techIconData: TechIconData): string {
  const fromColor = techIconData.color.split(' ')[0].replace('from-', '');
  return `text-${fromColor}`;
}
