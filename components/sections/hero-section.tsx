'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CuriosityTrigger } from '@/components/easter-egg/curiosity-trigger';

export function HeroSection() {
  const [time, setTime] = useState('');
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
    
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;

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
      {/* Local Clock - Budhvin Style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-8 left-8 z-50 local-clock"
      >
        {time}
      </motion.div>

      {/* Contact Button - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed top-8 right-8 z-50"
      >
        <Button
          onClick={scrollToContact}
          className="btn-outline magnetic"
        >
          Contact Now
        </Button>
      </motion.div>

      <div className="container-grid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen py-20">
          
          {/* Left Side - Text Content */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Main Hero Text with Breathing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                type: "spring", 
                stiffness: 80, 
                damping: 20 
              }}
              className="relative"
            >
              <div className="hero-text animate-breathe">
                DEANEETH
              </div>
            </motion.div>

            {/* Scrolling Text Carousel - Norris Style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6"
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
              className="max-w-lg space-y-6"
            >
              <p className="text-body">
                19-year-old Computer Science undergraduate turning ideas into intelligent reality. 
                Building the future, one line of code at a time.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 items-start"
            >
              <CuriosityTrigger triggerType="main" />
              
              <Button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline magnetic"
              >
                View Projects
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Hero Image Overlapping Text */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.4,
                type: "spring", 
                stiffness: 80,
                damping: 20
              }}
              className="relative"
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
                  className="floating-element absolute -top-6 -right-6 w-20 h-20 bg-[#7D27F5] rounded-full flex items-center justify-center text-white font-bold text-lg glass"
                >
                  AI
                </motion.div>
                
                <motion.div
                  className="floating-element absolute -bottom-6 -left-6 w-16 h-16 bg-[#B794F4] rounded-full flex items-center justify-center text-white text-sm font-bold glass"
                >
                  ML
                </motion.div>

                <motion.div
                  className="floating-element absolute top-1/4 -left-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white text-xs font-bold glass"
                >
                  CS
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-12 border-2 border-white/20 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-4 bg-[#7D27F5] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}