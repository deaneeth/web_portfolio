'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const { theme } = useTheme();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('magnetic')
      ) {
        setIsHovering(true);
        setCursorVariant('hover');
        
        // Add magnetic effect
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const handleMagneticMove = (e: MouseEvent) => {
          const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
          );
          
          if (distance < 100) {
            const strength = Math.max(0, 1 - distance / 100);
            const pullX = (centerX - e.clientX) * strength * 0.3;
            const pullY = (centerY - e.clientY) * strength * 0.3;
            
            cursorX.set(e.clientX - 16 + pullX);
            cursorY.set(e.clientY - 16 + pullY);
          } else {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
          }
        };
        
        document.addEventListener('mousemove', handleMagneticMove);
        
        const cleanup = () => {
          document.removeEventListener('mousemove', handleMagneticMove);
        };
        
        target.addEventListener('mouseleave', cleanup, { once: true });
      }
      
      // Special cursor text for specific elements
      if (target.getAttribute('data-cursor-text')) {
        setCursorText(target.getAttribute('data-cursor-text') || '');
        setCursorVariant('text');
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('magnetic')
      ) {
        setIsHovering(false);
        setCursorVariant('default');
        setCursorText('');
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: theme === 'dark' ? 'rgba(125, 39, 245, 0.8)' : 'rgba(125, 39, 245, 0.6)',
      border: theme === 'dark' ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid rgba(0, 0, 0, 0.2)',
    },
    hover: {
      scale: 1.5,
      backgroundColor: theme === 'dark' ? 'rgba(125, 39, 245, 0.2)' : 'rgba(125, 39, 245, 0.1)',
      border: theme === 'dark' ? '2px solid rgba(125, 39, 245, 0.8)' : '2px solid rgba(125, 39, 245, 0.6)',
    },
    text: {
      scale: 2,
      backgroundColor: 'transparent',
      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(0, 0, 0, 0.3)',
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full flex items-center justify-center"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorText && (
          <motion.span
            className="text-xs font-medium text-white dark:text-black whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}