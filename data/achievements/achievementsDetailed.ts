import { Achievement } from '../types';

/**
 * Comprehensive achievements and certifications collection
 * Each entry includes detailed information, credentials, and verification links
 */
export const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Google Cloud ML Engineer Certification',
    description: 'Professional certification in machine learning engineering on Google Cloud Platform',
    category: 'Certification',
    date: '2024-11-15',
    issuer: 'Google Cloud',
    credentialId: 'GCP-ML-2024-001',
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['Machine Learning', 'Google Cloud', 'TensorFlow', 'MLOps'],
    featured: true,
    type: 'Certification',
    link: '/achievements',
    tags: ['Google Cloud', 'ML', 'Certification'],
    status: 'verified',
    provider: 'Google Cloud'
  },
  {
    id: 2,
    title: 'Top Rated Seller on Fiverr',
    description: 'Achieved Top Rated status serving 5,000+ clients with 99% satisfaction rate',
    category: 'Achievement',
    date: '2024-10-01',
    issuer: 'Fiverr',
    credentialId: 'FVR-TR-2024',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['Business', 'Client Relations', 'Design', 'Automation'],
    featured: true,
    type: 'Achievement',
    link: '/achievements',
    tags: ['Fiverr', 'Business', 'Milestone'],
    status: 'active',
    provider: 'Fiverr'
  },
  {
    id: 3,
    title: 'AWS Solutions Architect Associate',
    description: 'Certified in designing distributed systems on Amazon Web Services',
    category: 'Certification',
    date: '2024-09-20',
    issuer: 'Amazon Web Services',
    credentialId: 'AWS-SAA-2024-789',
    image: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Infrastructure'],
    featured: false,
    type: 'Certification',
    link: '/achievements',
    tags: ['AWS', 'Cloud', 'Certification'],
    status: 'verified',
    provider: 'Amazon Web Services'
  },
  {
    id: 4,
    title: 'University Dean\'s List',
    description: 'Academic excellence recognition for maintaining GPA above 3.8',
    category: 'Academic',
    date: '2024-08-15',
    issuer: 'University of Plymouth',
    credentialId: 'UOP-DL-2024',
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['Computer Science', 'Academic Excellence', 'Research'],
    featured: false,
    type: 'Achievement',
    link: '/achievements',
    tags: ['Academic', 'University', 'Honor'],
    status: 'verified',
    provider: 'University of Plymouth'
  },
  {
    id: 5,
    title: 'TensorFlow Developer Certificate',
    description: 'Demonstrated proficiency in using TensorFlow for machine learning',
    category: 'Certification',
    date: '2024-07-10',
    issuer: 'TensorFlow',
    credentialId: 'TF-DEV-2024-456',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    verifyUrl: '#',
    skills: ['TensorFlow', 'Deep Learning', 'Neural Networks', 'Python'],
    featured: true,
    type: 'Certification',
    link: '/achievements',
    tags: ['TensorFlow', 'Deep Learning', 'Certification'],
    status: 'verified',
    provider: 'TensorFlow'
  }
];

/**
 * Achievement categories for filtering
 */
export const achievementCategories: string[] = [
  'All', 
  'Certification', 
  'Achievement', 
  'Academic', 
  'Competition'
];

/**
 * Get featured achievements only
 */
export const getFeaturedAchievements = (): Achievement[] => {
  return achievements.filter(achievement => achievement.featured);
};

/**
 * Get achievements by category
 */
export const getAchievementsByCategory = (category: string): Achievement[] => {
  if (category === 'All') return achievements;
  return achievements.filter(achievement => achievement.category === category);
};

/**
 * Get achievements sorted by date (newest first)
 */
export const getAchievementsSortedByDate = (): Achievement[] => {
  return [...achievements].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

/**
 * Get achievement by ID
 */
export const getAchievementById = (id: number | string): Achievement | undefined => {
  return achievements.find(achievement => achievement.id === id);
};

/**
 * Get certifications only
 */
export const getCertifications = (): Achievement[] => {
  return achievements.filter(achievement => achievement.category === 'Certification');
};

/**
 * Get achievements by skill
 */
export const getAchievementsBySkill = (skill: string): Achievement[] => {
  return achievements.filter(achievement => 
    achievement.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );
};
