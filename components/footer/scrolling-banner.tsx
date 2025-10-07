'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { scrollingBannerText } from '@/data/footerData';

export function ScrollingBanner() {
  // Duplicate the text multiple times for seamless looping
  const repeatedText = Array(20).fill(scrollingBannerText).join(' • ');

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-background via-background/95 to-background">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      
      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrolling text container - increased spacing and text size */}
      <div className="relative py-10 md:py-12">
        {/* Minimal overlay effect */}
        <div className="absolute inset-0 bg-background/5 backdrop-blur-[0.5px] pointer-events-none z-[1]" />
        
        <motion.div
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            },
          }}
          className="flex whitespace-nowrap relative z-[2]"
        >
          <span 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-primary/20 dark:text-foreground/25" 
            style={{ 
              textShadow: '0 0 15px rgba(125, 39, 245, 0.05)'
            }}
          >
            {repeatedText}
          </span>
        </motion.div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
