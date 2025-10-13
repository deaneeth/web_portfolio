'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Target, CheckCircle2, Award, Zap, TrendingUp, FileText, AlertCircle, Lightbulb } from 'lucide-react';
import { Project, TechStack } from '@/data/types.d';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

/**
 * TechIcon Component
 * Displays technology icons using Coloured Icons library (https://github.com/dheereshag/coloured-icons)
 * @param iconClass - Coloured Icons class (e.g., "ci ci-react", "ci ci-python")
 * @param techName - Technology name for display
 */
const TechIcon: React.FC<{ iconClass: string; techName: string }> = ({ iconClass, techName }) => {
  return (
    <div className="flex items-center justify-center w-8 h-8">
      <i className={`${iconClass} ci-xl`} title={techName} />
    </div>
  );
};

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!project) return null;

  // Generate project goals based on available data
  const projectGoals = [
    `Achieve ${project.impact || 'high performance'} through optimized architecture`,
    `Implement ${project.technologies?.[0] || 'modern tech stack'} for scalable solutions`,
    `Deliver production-ready system with ${project.status === 'Completed' ? 'proven' : 'innovative'} results`,
    `Integrate best practices for ${project.category || 'software development'} excellence`
  ];

  // Generate achievements based on metrics
  const achievements = project.metrics?.map((metric, idx) => ({
    icon: idx === 0 ? Zap : idx === 1 ? Target : Award,
    title: metric.label,
    value: metric.value,
    description: `${metric.label} improvement through optimization`
  })) || [];

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-8 lg:p-12"
          onClick={handleOverlayClick}
        >
          {/* Backdrop with theme colors - pointer-events-none to allow click-through */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md pointer-events-none"
          />

          {/* Modal Container - More breathing space */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-6xl bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            style={{ maxHeight: '85vh' }}
          >
            {/* Mobile: Single Column (Right then Left) | Desktop: Two Columns (Left then Right) */}
            <div className="flex flex-col lg:grid lg:grid-cols-[320px,1fr] gap-0 h-full max-h-[85vh]">
              
              {/* RIGHT COLUMN - Scrollable Content - Appears FIRST on mobile, SECOND on desktop */}
              <section className="order-1 lg:order-2 overflow-y-auto p-6 lg:p-9" style={{ maxHeight: '85vh' }}>
                {/* Header */}
                <header className="mb-8">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h2
                          id="modal-title"
                          className="text-2xl lg:text-3xl font-bold text-foreground"
                        >
                          {project.title}
                        </h2>
                        {project.featured && (
                          <motion.span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                            animate={{
                              boxShadow: [
                                '0 0 20px rgba(251, 191, 36, 0.4)',
                                '0 0 35px rgba(251, 191, 36, 0.6)',
                                '0 0 20px rgba(251, 191, 36, 0.4)',
                              ],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            Featured
                          </motion.span>
                        )}
                      </div>
                      
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/40 rounded-full font-semibold">
                          {project.category}
                        </span>
                        <span className="text-muted-foreground font-medium">
                          {new Date(project.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span
                          className={`px-3 py-1.5 rounded-full font-semibold ${
                            project.status === 'Completed'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                              : project.status === 'In Progress'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 ml-6">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-card hover:bg-muted border border-border hover:border-primary/50 rounded-lg transition-all duration-200"
                          aria-label="View source code"
                        >
                          <Github className="w-5 h-5 text-foreground" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-card hover:bg-muted border border-border hover:border-primary/50 rounded-lg transition-all duration-200"
                          aria-label="Open live demo"
                        >
                          <ExternalLink className="w-5 h-5 text-foreground" />
                        </a>
                      )}
                      <button
                        onClick={onClose}
                        className="p-2.5 bg-card hover:bg-red-500/10 border border-border hover:border-red-500/50 rounded-lg transition-all duration-200 group"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5 text-foreground group-hover:text-red-400 transition-colors" />
                      </button>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="relative rounded-xl overflow-hidden border-2 border-border shadow-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-72 object-cover"
                    />
                  </div>
                </header>

                {/* Overview */}
                {project.longDescription && (
                  <div className="mb-8">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-3">
                      <FileText className="w-5 h-5 text-primary" />
                      Overview
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>
                )}

                {/* Goals - Bullet Points */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2.5">
                    <Target className="w-5 h-5 text-primary" />
                    Goals
                  </h3>
                  <ul className="space-y-3">
                    {projectGoals.map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Problem */}
                {project.problem && (
                  <div className="mb-8">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Problem
                    </h3>
                    <div className="p-5 bg-red-500/10 border-2 border-red-500/30 rounded-xl">
                      <p className="text-base text-foreground leading-relaxed">{project.problem}</p>
                    </div>
                  </div>
                )}

                {/* Solution */}
                {project.solution && (
                  <div className="mb-8">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-3">
                      <Lightbulb className="w-5 h-5 text-green-500" />
                      Solution
                    </h3>
                    <div className="p-5 bg-green-500/10 border-2 border-green-500/30 rounded-xl">
                      <p className="text-base text-foreground leading-relaxed">{project.solution}</p>
                    </div>
                  </div>
                )}

                {/* Achievements Section */}
                {achievements.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2.5">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Achievements
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement, idx) => {
                        const Icon = achievement.icon;
                        return (
                          <div
                            key={idx}
                            className="p-4 bg-card/50 border-2 border-border rounded-xl hover:border-primary/40 hover:bg-card/80 transition-all duration-200"
                          >
                            <div className="flex items-center gap-2.5 mb-2">
                              <Icon className="w-5 h-5 text-primary" />
                              <span className="text-sm font-semibold text-muted-foreground">{achievement.title}</span>
                            </div>
                            <div className="text-2xl font-bold text-foreground mb-2">{achievement.value}</div>
                            <p className="text-xs text-muted-foreground leading-snug">{achievement.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tech Stack & Impact - Shown in mobile view at bottom, hidden on desktop (desktop shows in left sidebar) */}
                <div className="lg:hidden mt-8 pt-8 border-t-2 border-border space-y-6">
                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Tech Stack
                    </h3>
                    <div className="space-y-2.5">
                      {/* Use new techStack format if available, fallback to old technologies */}
                      {(project.techStack || project.technologies?.map(tech => ({ name: tech, icon: 'ci ci-code' })))?.map((tech) => (
                        <div
                          key={typeof tech === 'string' ? tech : tech.name}
                          className="flex items-center gap-3 px-3 py-2.5 bg-card/50 border border-border/60 rounded-lg hover:border-primary/40 hover:bg-card/80 transition-all duration-200"
                        >
                          <TechIcon 
                            iconClass={typeof tech === 'string' ? 'ci ci-code' : tech.icon} 
                            techName={typeof tech === 'string' ? tech : tech.name} 
                          />
                          <span className="text-sm font-medium text-foreground">
                            {typeof tech === 'string' ? tech : tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metric */}
                  {project.impact && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Impact
                      </h3>
                      <div className="relative p-5 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-2 border-primary/30 rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
                        <div className="relative">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              Primary Achievement
                            </span>
                          </div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            {project.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* LEFT COLUMN - Tech Stack + Impact - Shown ONLY on desktop, appears FIRST visually */}
              <aside className="hidden lg:flex order-1 bg-muted/30 backdrop-blur-sm border-r border-border flex-col overflow-hidden">
                {/* Responsive container that scales based on content */}
                <div className="flex flex-col h-full py-6 px-5">
                  {/* Tech Stack */}
                  <div className="flex-1 min-h-0">
                    <h3 className={`font-semibold text-muted-foreground uppercase tracking-wider mb-3 ${
                      (project.techStack?.length || project.technologies?.length || 0) > 8 ? 'text-xs' : 'text-sm'
                    }`}>
                      Tech Stack
                    </h3>
                    <div className={`space-y-2 ${
                      (project.techStack?.length || project.technologies?.length || 0) > 8 ? 'space-y-1.5' : 'space-y-2'
                    }`}>
                      {/* Use new techStack format if available, fallback to old technologies */}
                      {(project.techStack || project.technologies?.map(tech => ({ name: tech, icon: 'ci ci-code' })))?.map((tech) => (
                        <div
                          key={typeof tech === 'string' ? tech : tech.name}
                          className={`flex items-center gap-2.5 bg-card/50 border border-border/60 rounded-lg hover:border-primary/40 hover:bg-card/80 transition-all duration-200 ${
                            (project.techStack?.length || project.technologies?.length || 0) > 8 
                              ? 'px-2 py-1.5' 
                              : 'px-3 py-2'
                          }`}
                        >
                          <div className={`flex items-center justify-center ${
                            (project.techStack?.length || project.technologies?.length || 0) > 8 ? 'w-6 h-6' : 'w-8 h-8'
                          }`}>
                            <i 
                              className={`${typeof tech === 'string' ? 'ci ci-code' : tech.icon} ${
                                (project.techStack?.length || project.technologies?.length || 0) > 8 ? 'ci-lg' : 'ci-xl'
                              }`}
                              title={typeof tech === 'string' ? tech : tech.name}
                            />
                          </div>
                          <span className={`font-medium text-foreground ${
                            (project.techStack?.length || project.technologies?.length || 0) > 8 
                              ? 'text-xs' 
                              : 'text-sm'
                          }`}>
                            {typeof tech === 'string' ? tech : tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metric */}
                  {project.impact && (
                    <div className={`flex-shrink-0 ${
                      (project.techStack?.length || project.technologies?.length || 0) > 8 ? 'mt-4' : 'mt-6'
                    }`}>
                      <h3 className={`font-semibold text-muted-foreground uppercase tracking-wider mb-3 ${
                        (project.techStack?.length || project.technologies?.length || 0) > 8 ? 'text-xs' : 'text-sm'
                      }`}>
                        Impact
                      </h3>
                      <div className={`relative bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-2 border-primary/30 rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 ${
                        (project.techStack?.length || project.technologies?.length || 0) > 8 
                          ? 'p-3' 
                          : 'p-4'
                      }`}>
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
                        <div className="relative">
                          <div className={`flex items-center gap-2 ${
                            (project.techStack?.length || project.technologies?.length || 0) > 8 ? 'mb-1.5' : 'mb-2'
                          }`}>
                            <TrendingUp className={`text-primary ${
                              (project.techStack?.length || project.technologies?.length || 0) > 8 ? 'w-4 h-4' : 'w-5 h-5'
                            }`} />
                            <span className={`font-semibold text-muted-foreground uppercase tracking-wide ${
                              (project.techStack?.length || project.technologies?.length || 0) > 8 ? 'text-[10px]' : 'text-xs'
                            }`}>
                              Primary Achievement
                            </span>
                          </div>
                          <div className={`font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight ${
                            (project.techStack?.length || project.technologies?.length || 0) > 8 
                              ? 'text-lg' 
                              : 'text-xl'
                          }`}>
                            {project.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
