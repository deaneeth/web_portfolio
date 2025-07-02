export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  description: string;
  dateAwarded: string;
  category: 'certificate' | 'award' | 'competition' | 'publication' | 'scholarship';
  badgeImage: string;
  verificationUrl?: string;
  skills: string[];
  featured: boolean;
  color: string;
  glowColor: string;
}

// Mock data for demonstration - replace with your actual achievements
export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University (Coursera)',
    issuerLogo: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Comprehensive specialization covering supervised learning, unsupervised learning, and best practices in machine learning.',
    dateAwarded: '2024-11-15',
    category: 'certificate',
    badgeImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    verificationUrl: 'https://coursera.org/verify/specialization/ABC123',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Data Science'],
    featured: true,
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)'
  },
  {
    id: '2',
    title: 'AI Hackathon Winner',
    issuer: 'TechCrunch Disrupt',
    issuerLogo: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'First place winner for developing an AI-powered solution for sustainable agriculture in Sri Lanka.',
    dateAwarded: '2024-10-20',
    category: 'competition',
    badgeImage: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    verificationUrl: 'https://techcrunch.com/hackathon/winners/2024',
    skills: ['AI/ML', 'Computer Vision', 'Agriculture Tech', 'Innovation'],
    featured: true,
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)'
  },
  {
    id: '3',
    title: 'Google Cloud Professional ML Engineer',
    issuer: 'Google Cloud',
    issuerLogo: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Professional certification demonstrating expertise in designing and implementing ML solutions on Google Cloud.',
    dateAwarded: '2024-09-30',
    category: 'certificate',
    badgeImage: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    verificationUrl: 'https://cloud.google.com/certification/verify/GCP123',
    skills: ['Google Cloud', 'MLOps', 'Cloud Architecture', 'AI/ML'],
    featured: true,
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)'
  },
  {
    id: '4',
    title: 'Dean\'s List Excellence Award',
    issuer: 'University of Plymouth',
    issuerLogo: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Academic excellence recognition for maintaining top 5% GPA in Computer Science program.',
    dateAwarded: '2024-08-15',
    category: 'award',
    badgeImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    skills: ['Academic Excellence', 'Computer Science', 'Leadership'],
    featured: false,
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.4)'
  },
  {
    id: '5',
    title: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    issuerLogo: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Certification validating technical expertise in designing distributed systems on AWS.',
    dateAwarded: '2024-07-22',
    category: 'certificate',
    badgeImage: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    verificationUrl: 'https://aws.amazon.com/verification/AWS456',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'System Design'],
    featured: false,
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)'
  },
  {
    id: '6',
    title: 'Kaggle Competition Bronze Medal',
    issuer: 'Kaggle',
    issuerLogo: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Bronze medal in Natural Language Processing competition with 2,000+ participants.',
    dateAwarded: '2024-06-10',
    category: 'competition',
    badgeImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    verificationUrl: 'https://kaggle.com/competitions/nlp-2024/leaderboard',
    skills: ['NLP', 'Data Science', 'Python', 'Competition'],
    featured: false,
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)'
  },
  {
    id: '7',
    title: 'Research Paper Publication',
    issuer: 'IEEE Conference',
    issuerLogo: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Published research on "AI-Driven Solutions for Sustainable Agriculture in South Asia".',
    dateAwarded: '2024-05-18',
    category: 'publication',
    badgeImage: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    verificationUrl: 'https://ieeexplore.ieee.org/document/12345',
    skills: ['Research', 'AI/ML', 'Academic Writing', 'Agriculture Tech'],
    featured: false,
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)'
  },
  {
    id: '8',
    title: 'Merit Scholarship',
    issuer: 'University of Plymouth',
    issuerLogo: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Academic merit scholarship for outstanding performance in Computer Science studies.',
    dateAwarded: '2024-01-15',
    category: 'scholarship',
    badgeImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    skills: ['Academic Excellence', 'Leadership', 'Merit'],
    featured: false,
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)'
  }
];

export function getFeaturedAchievements(): Achievement[] {
  return achievements.filter(achievement => achievement.featured);
}

export function getAllAchievements(): Achievement[] {
  return achievements.sort((a, b) => 
    new Date(b.dateAwarded).getTime() - new Date(a.dateAwarded).getTime()
  );
}

export function getAchievementsByCategory(category: string): Achievement[] {
  if (category === 'all') return getAllAchievements();
  return achievements.filter(achievement => achievement.category === category);
}

export function getAchievementStats() {
  const stats = {
    certificates: achievements.filter(a => a.category === 'certificate').length,
    awards: achievements.filter(a => a.category === 'award').length,
    competitions: achievements.filter(a => a.category === 'competition').length,
    publications: achievements.filter(a => a.category === 'publication').length,
    scholarships: achievements.filter(a => a.category === 'scholarship').length,
    total: achievements.length
  };
  
  return stats;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
}

export const categoryLabels = {
  all: 'All Achievements',
  certificate: 'Certificates',
  award: 'Awards',
  competition: 'Competitions',
  publication: 'Publications',
  scholarship: 'Scholarships'
};

export const categoryIcons = {
  certificate: '🎓',
  award: '🏆',
  competition: '🥇',
  publication: '📄',
  scholarship: '💰'
};