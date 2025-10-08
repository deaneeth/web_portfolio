/**
 * Image Path Validation Report
 * 
 * This file documents all image paths used in the portfolio
 * and validates their format and accessibility.
 */

import { projects } from '../work/allProjects';
import { articles } from '../articles/articlesDetailed';
import { achievements } from '../achievements/achievementsDetailed';
import { testimonials } from '../services/testimonials';
import { isExternalImage, isLocalImage } from './assetsConfig';

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate image URL format
 */
function validateImageUrl(url: string): {
  valid: boolean;
  type: 'external' | 'local' | 'invalid';
  issues: string[];
} {
  const issues: string[] = [];
  
  if (!url || url.trim() === '') {
    return { valid: false, type: 'invalid', issues: ['Empty or undefined URL'] };
  }

  // Check if external
  if (isExternalImage(url)) {
    if (!url.startsWith('https://')) {
      issues.push('External URL should use HTTPS');
    }
    return { 
      valid: issues.length === 0, 
      type: 'external', 
      issues 
    };
  }

  // Check if local
  if (isLocalImage(url)) {
    if (!url.startsWith('/')) {
      issues.push('Local path should start with /');
    }
    return { 
      valid: issues.length === 0, 
      type: 'local', 
      issues 
    };
  }

  return { valid: false, type: 'invalid', issues: ['Invalid URL format'] };
}

/**
 * Get all image paths from data
 */
function getAllImagePaths() {
  const projectImages = (projects || []).map(p => ({
    source: 'Projects',
    id: p.id,
    title: p.title,
    path: p.image,
  }));

  const articleImages = (articles || []).map(a => ({
    source: 'Articles',
    id: a.id,
    title: a.title,
    path: a.image,
  }));

  const achievementImages = (achievements || []).map(a => ({
    source: 'Achievements',
    id: a.id,
    title: a.title,
    path: a.image,
  }));

  const testimonialAvatars = (testimonials || []).map(t => ({
    source: 'Testimonials',
    id: t.id || t.name,
    title: t.name,
    path: t.avatar,
  }));

  return [
    ...projectImages,
    ...articleImages,
    ...achievementImages,
    ...testimonialAvatars,
  ];
}

/**
 * Generate validation report
 */
export function generateValidationReport() {
  const allImages = getAllImagePaths();
  const report = {
    total: allImages.length,
    valid: 0,
    invalid: 0,
    external: 0,
    local: 0,
    details: [] as any[],
    summary: {} as any,
  };

  allImages.forEach(item => {
    const validation = validateImageUrl(item.path);
    
    if (validation.valid) {
      report.valid++;
      if (validation.type === 'external') report.external++;
      if (validation.type === 'local') report.local++;
    } else {
      report.invalid++;
    }

    report.details.push({
      source: item.source,
      id: item.id,
      title: item.title,
      path: item.path,
      type: validation.type,
      valid: validation.valid,
      issues: validation.issues,
    });
  });

  // Group by source
  report.summary = {
    bySource: {
      Projects: allImages.filter(i => i.source === 'Projects').length,
      Articles: allImages.filter(i => i.source === 'Articles').length,
      Achievements: allImages.filter(i => i.source === 'Achievements').length,
      Testimonials: allImages.filter(i => i.source === 'Testimonials').length,
    },
    byType: {
      external: report.external,
      local: report.local,
      invalid: report.invalid,
    },
  };

  return report;
}

/**
 * Get unique external URLs (for migration planning)
 */
export function getUniqueExternalUrls(): string[] {
  const allImages = getAllImagePaths();
  const externalUrls = allImages
    .filter(img => isExternalImage(img.path))
    .map(img => img.path);
  
  return Array.from(new Set(externalUrls));
}

/**
 * Console-friendly report
 */
export function printValidationReport() {
  const report = generateValidationReport();
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('📊 IMAGE PATH VALIDATION REPORT');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log(`Total Images: ${report.total}`);
  console.log(`✅ Valid: ${report.valid}`);
  console.log(`❌ Invalid: ${report.invalid}\n`);
  
  console.log('By Storage Type:');
  console.log(`  🌐 External (CDN): ${report.external}`);
  console.log(`  💾 Local: ${report.local}\n`);
  
  console.log('By Content Type:');
  console.log(`  📁 Projects: ${report.summary.bySource.Projects}`);
  console.log(`  📰 Articles: ${report.summary.bySource.Articles}`);
  console.log(`  🏆 Achievements: ${report.summary.bySource.Achievements}`);
  console.log(`  👤 Testimonials: ${report.summary.bySource.Testimonials}\n`);
  
  if (report.invalid > 0) {
    console.log('❌ Invalid Paths:');
    report.details
      .filter(d => !d.valid)
      .forEach(d => {
        console.log(`  - [${d.source}] ${d.title}: ${d.issues.join(', ')}`);
      });
    console.log('');
  }
  
  const uniqueExternal = getUniqueExternalUrls();
  console.log(`Unique External URLs: ${uniqueExternal.length}`);
  console.log('\n═══════════════════════════════════════════════════════════\n');
  
  return report;
}

// ============================================================================
// IMAGE STATISTICS
// ============================================================================

export function getImageStatistics() {
  const report = generateValidationReport();
  const uniqueExternal = getUniqueExternalUrls();
  
  return {
    total: report.total,
    valid: report.valid,
    invalid: report.invalid,
    external: report.external,
    local: report.local,
    uniqueExternalUrls: uniqueExternal.length,
    externalUrls: uniqueExternal,
    migrationProgress: {
      total: report.total,
      migrated: report.local,
      remaining: report.external,
      percentComplete: Math.round((report.local / report.total) * 100),
    },
    byContentType: report.summary.bySource,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  validateImageUrl,
  getAllImagePaths,
  generateValidationReport,
  printValidationReport,
  getUniqueExternalUrls,
  getImageStatistics,
};
