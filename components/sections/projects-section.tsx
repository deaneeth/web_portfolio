'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: 1,
    title: 'Neural Style Transfer Engine',
    description: 'Advanced AI system that transforms images using deep learning, applying artistic styles with unprecedented quality and speed.',
    category: 'AI/ML',
    tags: ['TensorFlow', 'Python', 'Computer Vision'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: true,
    impact: '95% style preservation accuracy',
  },
  {
    id: 2,
    title: 'Smart Campus Navigation',
    description: 'IoT-powered navigation system for university campuses with real-time crowd density monitoring.',
    category: 'IoT',
    tags: ['React', 'Node.js', 'IoT'],
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: true,
    impact: '40% reduction in campus congestion',
  },
  {
    id: 3,
    title: 'Natural Language Classifier',
    description: 'Multi-language sentiment analysis tool with custom BERT implementation for South Asian languages.',
    category: 'AI/ML',
    tags: ['BERT', 'Transformers', 'Python'],
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: true,
    impact: '92% accuracy in Sinhala text',
  },
  {
    id: 4,
    title: 'Cloud Infrastructure Automation',
    description: 'Automated cloud deployment system using Infrastructure as Code principles.',
    category: 'DevOps',
    tags: ['AWS', 'Terraform', 'Docker'],
    image: 'https://images.pexels.com/photos/1249158/pexels-photo-1249158.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    demo: '#',
    featured: false,
    impact: '70% faster deployments',
  },
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'AI/ML', 'IoT', 'DevOps'];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#1D1D21]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            FEATURED PROJECTS
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Transforming ideas into intelligent solutions that push the boundaries of what's possible
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#7D27F5] text-white'
                  : 'bg-transparent text-white/60 border border-white/20 hover:text-white hover:border-[#7D27F5]'
              }`}
            >
              {category.toUpperCase()}
            </Button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bento-card group ${
                  project.featured && index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  
                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Github className="h-4 w-4 text-white" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 text-white" />
                    </a>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#7D27F5] text-white">
                        FEATURED
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-[#7D27F5] text-[#7D27F5]">
                      {project.category}
                    </Badge>
                    <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-[#7D27F5] transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#B794F4] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-white/60 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 text-white/70 rounded-full text-sm border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Impact */}
                  <div className="text-[#7D27F5] font-semibold text-sm">
                    {project.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button className="btn-primary">
            VIEW ALL PROJECTS
          </Button>
        </motion.div>
      </div>
    </section>
  );
}