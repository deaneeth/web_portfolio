'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Calendar, Users, Target, Code, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const spotlightProjects = [
  {
    id: 1,
    title: 'Neural Style Transfer Engine',
    description: 'Advanced AI system that transforms images using deep learning, applying artistic styles with unprecedented quality and speed.',
    category: 'AI/ML',
    tags: ['TensorFlow', 'Python', 'Computer Vision', 'Neural Networks'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: true,
    impact: '95% style preservation accuracy',
    impactColor: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    overview: 'Revolutionary neural style transfer system that combines cutting-edge deep learning with artistic vision.',
    goals: ['Achieve photorealistic style transfer', 'Optimize processing speed', 'Maintain content integrity'],
    keyFeatures: ['Real-time processing', 'Multiple style blending', 'High-resolution output', 'Custom model training'],
    problem: 'Traditional style transfer methods often lose important content details and require extensive processing time.',
    achievements: ['95% style preservation accuracy', '10x faster than traditional methods', 'Support for 4K resolution'],
    techStack: ['TensorFlow', 'Python', 'OpenCV', 'CUDA', 'Docker'],
    screenshots: [
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: 2,
    title: 'Smart Campus Navigation',
    description: 'IoT-powered navigation system for university campuses with real-time crowd density monitoring and optimal route suggestions.',
    category: 'IoT',
    tags: ['React', 'Node.js', 'IoT', 'Maps API', 'Real-time'],
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: true,
    impact: '40% reduction in campus congestion',
    impactColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    overview: 'Smart navigation system that revolutionizes campus mobility through IoT integration and real-time analytics.',
    goals: ['Reduce campus congestion', 'Improve student experience', 'Optimize resource allocation'],
    keyFeatures: ['Real-time crowd monitoring', 'Optimal route calculation', 'Emergency notifications', 'Accessibility features'],
    problem: 'University campuses face significant congestion issues, leading to delayed classes and poor user experience.',
    achievements: ['40% reduction in congestion', '85% user satisfaction', 'Deployed across 3 campuses'],
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Google Maps API'],
    screenshots: [
      'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: 3,
    title: 'Natural Language Classifier',
    description: 'Multi-language sentiment analysis tool with custom BERT implementation for South Asian languages.',
    category: 'AI/ML',
    tags: ['BERT', 'Transformers', 'Python', 'NLP', 'Multi-language'],
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: true,
    impact: '92% accuracy in Sinhala text',
    impactColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    overview: 'Advanced NLP system specifically designed for South Asian languages with state-of-the-art accuracy.',
    goals: ['Support underrepresented languages', 'Achieve high accuracy', 'Enable real-time processing'],
    keyFeatures: ['Multi-language support', 'Custom BERT model', 'Real-time analysis', 'Cultural context awareness'],
    problem: 'Existing NLP tools have poor performance on South Asian languages due to lack of training data.',
    achievements: ['92% accuracy in Sinhala', 'Support for 5 languages', 'Published research paper'],
    techStack: ['BERT', 'PyTorch', 'Transformers', 'FastAPI', 'Docker'],
    screenshots: [
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  }
];

const allProjects = [
  ...spotlightProjects,
  {
    id: 4,
    title: 'Cloud Infrastructure Automation',
    description: 'Automated cloud deployment system using Infrastructure as Code principles with multi-cloud support.',
    category: 'Cloud & DevOps',
    tags: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
    image: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: false,
    impact: '70% faster deployments',
    impactColor: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    overview: 'Comprehensive cloud automation platform that streamlines deployment processes across multiple cloud providers.',
    goals: ['Automate deployments', 'Reduce human error', 'Support multi-cloud'],
    keyFeatures: ['Infrastructure as Code', 'Multi-cloud support', 'Automated scaling', 'Cost optimization'],
    problem: 'Manual cloud deployments are error-prone and time-consuming, leading to inconsistent environments.',
    achievements: ['70% faster deployments', '99.9% uptime', 'Zero-downtime deployments'],
    techStack: ['Terraform', 'AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    screenshots: [
      'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: 5,
    title: 'Predictive Analytics Dashboard',
    description: 'Machine learning dashboard for business intelligence with automated insights and interactive visualizations.',
    category: 'Data Science',
    tags: ['Python', 'Pandas', 'Plotly', 'Scikit-learn'],
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: false,
    impact: '60% faster decision making',
    impactColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    overview: 'Advanced analytics platform that transforms raw business data into actionable insights.',
    goals: ['Automate reporting', 'Predict trends', 'Improve decision making'],
    keyFeatures: ['Predictive modeling', 'Interactive dashboards', 'Automated alerts', 'Custom metrics'],
    problem: 'Businesses struggle to extract meaningful insights from large datasets in a timely manner.',
    achievements: ['60% faster decisions', '85% prediction accuracy', '50+ KPIs tracked'],
    techStack: ['Python', 'Pandas', 'Plotly', 'Scikit-learn', 'PostgreSQL'],
    screenshots: [
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: 6,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with advanced features like AI recommendations and real-time inventory.',
    category: 'Web Development',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: false,
    impact: '150% increase in conversions',
    impactColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    overview: 'Modern e-commerce platform with AI-powered features and seamless user experience.',
    goals: ['Increase conversions', 'Improve UX', 'Scale efficiently'],
    keyFeatures: ['AI recommendations', 'Real-time inventory', 'Payment processing', 'Admin dashboard'],
    problem: 'Traditional e-commerce platforms lack personalization and modern user experience.',
    achievements: ['150% conversion increase', '99.9% uptime', '10k+ active users'],
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis'],
    screenshots: [
      'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  }
];

const categories = [
  { name: 'All Projects', value: 'all', icon: Code },
  { name: 'AI/ML', value: 'AI/ML', icon: Sparkles },
  { name: 'Web Development', value: 'Web Development', icon: Code },
  { name: 'Cloud & DevOps', value: 'Cloud & DevOps', icon: Target },
  { name: 'Data Science', value: 'Data Science', icon: Target },
  { name: 'IoT', value: 'IoT', icon: Target }
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null);

  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory);

  const openProjectModal = (project: typeof allProjects[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  // Handle ESC key
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Featured <span className="projects-gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Transforming ideas into intelligent solutions that push the boundaries of what's possible
          </p>
        </motion.div>

        {/* Spotlight Projects */}
        <div className="max-w-6xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-12">Spotlight Projects</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spotlightProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-gray-900/80 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-2xl"
                style={{
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px ${project.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => openProjectModal(project)}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div
                      className="featured-badge bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                    >
                      Featured
                    </motion.div>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  
                  {/* Glassy Hover Buttons */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glassy-button p-2 rounded-lg hover:scale-110 transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4 text-white" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glassy-button p-2 rounded-lg hover:scale-110 transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4 text-white" />
                    </motion.a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 transition-colors text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-white/5 text-gray-300 border-white/10 text-xs"
                      >
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Impact */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Impact:</span>
                    <span 
                      className="text-sm font-semibold"
                      style={{ color: project.impactColor }}
                    >
                      {project.impact}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Projects Section */}
        <div className="max-w-6xl mx-auto">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm border ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-lg'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* All Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative bg-gray-900/80 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-2xl"
                  style={{
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 60px ${project.glowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => openProjectModal(project)}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <motion.div
                        className="featured-badge bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                      >
                        Featured
                      </motion.div>
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    
                    {/* Glassy Hover Buttons */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glassy-button p-2 rounded-lg hover:scale-110 transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-4 w-4 text-white" />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glassy-button p-2 rounded-lg hover:scale-110 transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4 text-white" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 transition-colors text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-white/5 text-gray-300 border-white/10 text-xs"
                        >
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Impact */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Impact:</span>
                      <span 
                        className="text-sm font-semibold"
                        style={{ color: project.impactColor }}
                      >
                        {project.impact}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={closeProjectModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/95 border border-gray-800/50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedProject.title}
                    </h2>
                    {selectedProject.featured && (
                      <motion.div
                        className="featured-badge bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        Featured
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glassy-button p-2 rounded-lg hover:scale-110 transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5 text-white" />
                    </motion.a>
                    <motion.a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glassy-button p-2 rounded-lg hover:scale-110 transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="h-5 w-5 text-white" />
                    </motion.a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeProjectModal}
                      className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Tech Stack & Impact */}
                    <div className="space-y-6">
                      {/* Tech Stack */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Tech Stack</h3>
                        <div className="space-y-2">
                          {selectedProject.techStack.map((tech) => (
                            <div
                              key={tech}
                              className="p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors"
                            >
                              <span className="text-gray-300 font-medium">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Impact Metrics */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Impact</h3>
                        <div 
                          className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm relative overflow-hidden"
                          style={{
                            boxShadow: `0 0 30px ${selectedProject.glowColor}`,
                          }}
                        >
                          <div className="text-2xl font-bold mb-2" style={{ color: selectedProject.impactColor }}>
                            {selectedProject.impact}
                          </div>
                          <div className="text-sm text-gray-400">Primary Achievement</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Project Details */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Overview */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Overview</h3>
                        <p className="text-gray-300 leading-relaxed">{selectedProject.overview}</p>
                      </div>

                      {/* Goals */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Goals</h3>
                        <ul className="space-y-3">
                          {selectedProject.goals.map((goal, index) => (
                            <li key={index} className="flex items-start text-gray-300">
                              <Target className="h-5 w-5 mr-3 text-teal-400 flex-shrink-0 mt-0.5" />
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedProject.keyFeatures.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 transition-colors p-3 justify-start"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Problem & Solution */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Problem Solved</h3>
                        <p className="text-gray-300 leading-relaxed">{selectedProject.problem}</p>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {selectedProject.achievements.map((achievement, index) => (
                            <div
                              key={index}
                              className="p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm text-center hover:bg-white/10 transition-colors"
                            >
                              <div className="text-lg font-bold text-white mb-1">{achievement}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Screenshots */}
                      {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Screenshots</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedProject.screenshots.map((screenshot, index) => (
                              <div key={index} className="rounded-lg overflow-hidden border border-gray-800/50">
                                <img
                                  src={screenshot}
                                  alt={`${selectedProject.title} screenshot ${index + 1}`}
                                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}