import { Brain, Code, Palette, Zap } from 'lucide-react';
import { Service } from '../types.d';

/**
 * Detailed service offerings with comprehensive information
 * Each service includes features, deliverables, pricing, and timeline
 */
export const services: Service[] = [
  {
    id: 1,
    title: 'AI/ML Solutions',
    description: 'Custom artificial intelligence and machine learning solutions tailored to your business needs.',
    icon: Brain,
    color: 'from-purple-500 to-blue-500',
    features: [
      'Custom model development',
      'Data analysis & insights',
      'Computer vision systems',
      'Natural language processing',
      'Predictive analytics'
    ],
    deliverables: 'Trained models, documentation, deployment guide',
    timeline: '4-8 weeks',
    startingPrice: '$2,500',
    popular: true,
    type: 'Service',
    date: '2025-10-01',
    link: '/services',
    tags: ['AI', 'Machine Learning', 'Consulting'],
    status: 'available',
    category: 'AI Solutions'
  },
  {
    id: 2,
    title: 'Intelligent Automation',
    description: 'Streamline your workflows with smart automation solutions that save time and reduce errors.',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    features: [
      'Process automation',
      'Data pipeline creation',
      'API integrations',
      'Workflow optimization',
      'Performance monitoring'
    ],
    deliverables: 'Automation scripts, monitoring dashboard, training',
    timeline: '2-4 weeks',
    startingPrice: '$1,500',
    popular: false,
    type: 'Service',
    date: '2025-09-15',
    link: '/services',
    tags: ['Automation', 'Integration', 'Optimization'],
    status: 'available',
    category: 'Automation'
  },
  {
    id: 3,
    title: 'Web Applications',
    description: 'Modern, responsive web applications built with cutting-edge technologies.',
    icon: Code,
    color: 'from-green-500 to-teal-500',
    features: [
      'Full-stack development',
      'Responsive design',
      'Database integration',
      'API development',
      'Performance optimization'
    ],
    deliverables: 'Complete application, source code, deployment',
    timeline: '3-6 weeks',
    startingPrice: '$2,000',
    popular: false,
    type: 'Service',
    date: '2025-08-20',
    link: '/services',
    tags: ['Web Development', 'React', 'Full-stack'],
    status: 'available',
    category: 'Web Development'
  },
  {
    id: 4,
    title: 'Design & Consulting',
    description: 'Strategic design and technical consulting to guide your digital transformation.',
    icon: Palette,
    color: 'from-pink-500 to-purple-500',
    features: [
      'UI/UX design',
      'Technical architecture',
      'Code reviews',
      'Performance audits',
      'Strategic planning'
    ],
    deliverables: 'Design files, recommendations, implementation plan',
    timeline: '1-3 weeks',
    startingPrice: '$1,000',
    popular: false,
    type: 'Service',
    date: '2025-07-10',
    link: '/services',
    tags: ['Design', 'Consulting', 'UX'],
    status: 'available',
    category: 'Consulting'
  }
];

/**
 * Get popular services
 */
export const getPopularServices = (): Service[] => {
  return services.filter(service => service.popular);
};

/**
 * Get service by ID
 */
export const getServiceById = (id: number | string): Service | undefined => {
  return services.find(service => service.id === id);
};
