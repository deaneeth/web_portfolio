import { Project } from '../types';

/**
 * Comprehensive project portfolio with detailed case studies
 * Each project includes full descriptions, metrics, and technical details
 */
export const projects: Project[] = [
  {
    id: 1,
    title: 'Neural Style Transfer Engine',
    description: 'Advanced AI system that transforms images using deep learning, applying artistic styles with unprecedented quality and speed.',
    longDescription: 'This project implements a sophisticated neural style transfer algorithm using TensorFlow and PyTorch. The system can apply artistic styles to any input image while preserving content structure. Features include real-time processing, batch operations, and a web interface for easy interaction.',
    category: 'AI/ML',
    tags: ['TensorFlow', 'PyTorch', 'Computer Vision', 'Deep Learning'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: true,
    impact: '95% style preservation accuracy',
    status: 'Completed',
    date: '2024-12-01',
    problem: 'Traditional style transfer methods were slow and produced inconsistent results.',
    solution: 'Developed an optimized neural network architecture with custom loss functions.',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Flask', 'React'],
    metrics: [
      { label: 'Processing Speed', value: '3x faster' },
      { label: 'Style Accuracy', value: '95%' },
      { label: 'User Satisfaction', value: '4.8/5' }
    ],
    type: 'Project',
    link: '/work'
  },
  {
    id: 2,
    title: 'Smart Campus Navigation',
    description: 'IoT-powered navigation system for university campuses with real-time crowd density monitoring.',
    longDescription: 'An intelligent navigation system that helps students and visitors navigate university campuses efficiently. Uses IoT sensors to monitor crowd density and suggests optimal routes.',
    category: 'IoT',
    tags: ['React', 'Node.js', 'IoT', 'MongoDB'],
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: true,
    impact: '40% reduction in campus congestion',
    status: 'In Progress',
    date: '2024-11-15',
    problem: 'Students struggled to navigate large campus and avoid crowded areas.',
    solution: 'Created an IoT-enabled system with real-time crowd monitoring.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Arduino', 'Socket.io'],
    metrics: [
      { label: 'Congestion Reduction', value: '40%' },
      { label: 'User Adoption', value: '2,500+' },
      { label: 'Route Accuracy', value: '92%' }
    ],
    type: 'Project',
    link: '/work'
  },
  {
    id: 3,
    title: 'Natural Language Classifier',
    description: 'Multi-language sentiment analysis tool with custom BERT implementation for South Asian languages.',
    longDescription: 'A sophisticated NLP system designed specifically for South Asian languages, with focus on Sinhala and Tamil text analysis.',
    category: 'AI/ML',
    tags: ['BERT', 'Transformers', 'Python', 'NLP'],
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: false,
    impact: '92% accuracy in Sinhala text',
    status: 'Completed',
    date: '2024-10-20',
    problem: 'Limited NLP tools available for South Asian languages.',
    solution: 'Fine-tuned BERT model specifically for regional language patterns.',
    technologies: ['Python', 'Transformers', 'PyTorch', 'Hugging Face', 'FastAPI'],
    metrics: [
      { label: 'Sinhala Accuracy', value: '92%' },
      { label: 'Tamil Accuracy', value: '89%' },
      { label: 'Processing Speed', value: '500ms' }
    ],
    type: 'Project',
    link: '/work'
  },
  {
    id: 4,
    title: 'Cloud Infrastructure Automation',
    description: 'Automated cloud deployment system using Infrastructure as Code principles.',
    longDescription: 'A comprehensive DevOps solution that automates cloud infrastructure deployment and management using modern IaC tools.',
    category: 'DevOps',
    tags: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
    image: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: false,
    impact: '70% faster deployments',
    status: 'Completed',
    date: '2024-09-10',
    problem: 'Manual infrastructure setup was time-consuming and error-prone.',
    solution: 'Implemented automated IaC pipeline with monitoring and rollback capabilities.',
    technologies: ['Terraform', 'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Ansible'],
    metrics: [
      { label: 'Deployment Speed', value: '70% faster' },
      { label: 'Error Reduction', value: '85%' },
      { label: 'Cost Savings', value: '30%' }
    ],
    type: 'Project',
    link: '/work'
  }
];

/**
 * Project categories for filtering
 */
export const projectCategories: string[] = [
  'All', 
  'AI/ML', 
  'IoT', 
  'DevOps', 
  'Web Development'
];

/**
 * Get featured projects only
 */
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'All') return projects;
  return projects.filter(project => project.category === category);
};

/**
 * Get projects sorted by date (newest first)
 */
export const getProjectsSortedByDate = (): Project[] => {
  return [...projects].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
