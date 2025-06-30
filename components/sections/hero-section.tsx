'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from '@/components/particle-background';

export function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-dark-bg">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main Headline with Mixed Gradient and White Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="hero-gradient-text">
                Builder of Futures.
              </span>
              <br />
              <span className="text-white">
                AI/ML Explorer.
              </span>
            </h1>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <p className="text-lg sm:text-xl text-foreground/80 font-medium italic">
              "The future belongs to those who code it."
            </p>
          </motion.div>

          {/* Sub headline/tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
          >
            19-year-old Computer Science undergraduate turning ideas into intelligent reality.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold stats-gradient-text mb-2">5,000+</div>
              <div className="text-muted-foreground text-sm">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold stats-gradient-text mb-2">50+</div>
              <div className="text-muted-foreground text-sm">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold stats-gradient-text mb-2">2026</div>
              <div className="text-muted-foreground text-sm">Graduation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold stats-gradient-text mb-2">∞</div>
              <div className="text-muted-foreground text-sm">Possibilities</div>
            </div>
          </motion.div>

          {/* CV Button and Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
          >
            <Button 
              size="lg" 
              className="cv-button text-white font-semibold px-8 py-3 rounded-full border-0 hover:scale-105 transition-transform duration-300"
              onClick={() => window.open('#', '_blank')}
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="social-icon rounded-full w-12 h-12 hover:scale-110 transition-all duration-300" 
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 text-foreground" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="social-icon rounded-full w-12 h-12 hover:scale-110 transition-all duration-300" 
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-foreground" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="social-icon rounded-full w-12 h-12 hover:scale-110 transition-all duration-300" 
                asChild
              >
                <a href="mailto:dineth@example.com">
                  <Mail className="h-5 w-5 text-foreground" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* University Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-md mx-auto border-t border-border/10 pt-4 mt-8"
          >
            <p className="text-muted-foreground text-sm">Computer Science @ University of Plymouth, Sri Lanka</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={scrollToAbout}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  );
}