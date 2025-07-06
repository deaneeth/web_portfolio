'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CuriosityTrigger } from '@/components/easter-egg/curiosity-trigger';

export function HeroSection() {
  const [time, setTime] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroImageRef = useRef<HTMLDivElement>(null);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(`LOCAL/${timeString}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle hero image 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroImageRef.current) return;

    const rect = heroImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    heroImageRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
    heroImageRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!heroImageRef.current) return;
    heroImageRef.current.style.setProperty('--rotate-x', '0deg');
    heroImageRef.current.style.setProperty('--rotate-y', '0deg');
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
      {/* Local Clock */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-6 left-6 z-50 local-clock"
      >
        {time}
      </motion.div>

      {/* Contact Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={scrollToContact}
          className="btn-outline"
        >
          CONTACT NOW
        </Button>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
          
          {/* Left Side - Text Content */}
          <div className="flex-1 lg:pr-12">
            
            {/* Main Hero Text with Breathing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                type: "spring", 
                stiffness: 100, 
                damping: 15 
              }}
              className="mb-8"
            >
              <div className="hero-text animate-breathe">
                DEANEETH
              </div>
            </motion.div>

            {/* Scrolling Text Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4 mb-12"
            >
              {/* Main scrolling text */}
              <div className="scrolling-text">
                <div className="scrolling-content">
                  <span className="hero-text">DEANEETH</span>
                  <span className="hero-text">DEANEETH</span>
                  <span className="hero-text">DEANEETH</span>
                  <span className="hero-text">DEANEETH</span>
                </div>
              </div>

              {/* Counter-scrolling subtitle */}
              <div className="scrolling-text">
                <div className="scrolling-content-reverse">
                  <span className="subtitle-text">PORTFOLIO</span>
                  <span className="subtitle-text">—</span>
                  <span className="subtitle-text">©2025</span>
                  <span className="subtitle-text">—</span>
                  <span className="subtitle-text">AI/ML EXPLORER</span>
                  <span className="subtitle-text">—</span>
                  <span className="subtitle-text">WELCOME</span>
                  <span className="subtitle-text">—</span>
                  <span className="subtitle-text">V.01</span>
                  <span className="subtitle-text">—</span>
                  <span className="subtitle-text">PORTFOLIO</span>
                  <span className="subtitle-text">—</span>
                  <span className="subtitle-text">©2025</span>
                  <span className="subtitle-text">—</span>
                  <span className="subtitle-text">AI/ML EXPLORER</span>
                  <span className="subtitle-text">—</span>
                  <span className="subtitle-text">WELCOME</span>
                  <span className="subtitle-text">—</span>
                  <span className="subtitle-text">V.01</span>
                  <span className="subtitle-text">—</span>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-8 max-w-lg"
            >
              <p className="text-lg text-white/70 leading-relaxed">
                19-year-old Computer Science undergraduate turning ideas into intelligent reality. 
                Building the future, one line of code at a time.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <CuriosityTrigger triggerType="main" />
              
              <Button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                VIEW PROJECTS
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.0, 
              delay: 0.4,
              type: "spring", 
              stiffness: 100 
            }}
            className="flex-1 lg:pl-12 mt-12 lg:mt-0"
          >
            <div
              ref={heroImageRef}
              className="hero-image relative w-full max-w-md mx-auto lg:max-w-lg"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                alt="Deaneeth - AI/ML Explorer & Creative Technologist"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '3/4' }}
              />
              
              {/* Floating elements around image */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-[#7D27F5] rounded-full flex items-center justify-center text-white font-bold"
              >
                AI
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#B794F4] rounded-full flex items-center justify-center text-white text-sm font-bold"
              >
                ML
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#7D27F5] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}