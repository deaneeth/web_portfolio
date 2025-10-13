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
import { Modal } from '@/components/ui/modal';
import { ProjectModal } from '@/components/ui/project-modal';
import { projects, projectCategories } from '@/data/featuredWork/allProjects';
import { Project } from '@/data/types.d';

const categories = projectCategories;

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = (projects || []).filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (project.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = (projects || []).filter(p => p.featured);

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
                className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:outline hover:outline-[1.5px] hover:outline-offset-2 hover:outline-indigo-400/40"
                onClick={() => setSelectedProject(project)}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                      Featured
                    </span>
                  </div>
                )}

                {/* Thumbnail with Hover Overlay - Isolated Hover Group */}
                <div 
                  className="group/thumb relative h-48 overflow-hidden cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                  />
                  
                  {/* Hover Overlay with Demo & Code Buttons - Shows only on thumbnail hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105 cursor-pointer"
                      aria-label="View demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-sm border border-border text-foreground text-sm font-medium rounded-full hover:bg-card transition-all duration-200 shadow-lg transform hover:scale-105 cursor-pointer"
                      aria-label="View source code"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col cursor-pointer">
                  {/* Category & Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(project.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-muted/50 text-muted-foreground px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2.5 py-1">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Impact - Bottom aligned */}
                  <div className="mt-auto pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary flex items-center gap-1">
                        {project.impact}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
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
            className="bg-gray-900/60 border-gray-700/50 text-white placeholder-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-lg px-4 py-3 pl-10 w-64"
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
                className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:outline hover:outline-[1.5px] hover:outline-offset-2 hover:outline-indigo-400/40"
                onClick={() => setSelectedProject(project)}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                      Featured
                    </span>
                  </div>
                )}

                {/* Thumbnail with Hover Overlay - Isolated Hover Group */}
                <div 
                  className="group/thumb relative h-48 overflow-hidden cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                  />
                  
                  {/* Hover Overlay with Demo & Code Buttons - Shows only on thumbnail hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105 cursor-pointer"
                      aria-label="View demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-sm border border-border text-foreground text-sm font-medium rounded-full hover:bg-card transition-all duration-200 shadow-lg transform hover:scale-105 cursor-pointer"
                      aria-label="View source code"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col cursor-pointer">
                  {/* Category & Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(project.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-muted/50 text-muted-foreground px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2.5 py-1">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Impact - Bottom aligned */}
                  <div className="mt-auto pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary flex items-center gap-1">
                        {project.impact}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
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
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
}