'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Filter, 
  Search,
  Calendar,
  Tag,
  ArrowUpRight,
  Star
} from 'lucide-react';

const projects = [
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

const categories = ['All', 'AI/ML', 'IoT', 'DevOps', 'Web Development'];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="page-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">Featured Work</h1>
          <p className="page-subtitle">
            Deep-dive case studies of my best AI/ML and Computer Science projects. 
            Each project showcases problem-solving, technical implementation, and real-world impact.
          </p>
        </motion.div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Featured Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="group relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 h-full flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                        project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {project.status}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-primary">{project.impact}</span>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.demo}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-10 w-64 bg-input border-border text-foreground placeholder-muted-foreground"
          />
        </div>
      </motion.div>

      {/* All Projects */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-xl font-semibold">All Projects</h2>
          <span className="text-sm text-muted-foreground">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.slice(0, 9).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                className="group relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 h-full flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(project.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-primary">{project.impact}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {selectedProject.category}
                    </span>
                    <span>{new Date(selectedProject.date).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      selectedProject.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                      selectedProject.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Problem</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Solution</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <span key={tech} className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Key Metrics</h3>
                    <div className="space-y-3">
                      {selectedProject.metrics.map(metric => (
                        <div key={metric.label} className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{metric.label}</span>
                          <span className="text-sm font-medium">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Links</h3>
                    <div className="space-y-2">
                      <a
                        href={selectedProject.github}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        View Source Code
                      </a>
                      <a
                        href={selectedProject.demo}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}