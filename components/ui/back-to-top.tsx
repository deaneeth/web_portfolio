"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Find the main-content element (the actual scrolling container)
      const mainContent = document.querySelector('.main-content');
      
      if (mainContent) {
        const scrollTop = mainContent.scrollTop;
        // Show button after scrolling down 300px
        if (scrollTop > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Get the main-content element
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent) {
      mainContent.addEventListener("scroll", toggleVisibility);
      
      return () => {
        mainContent.removeEventListener("scroll", toggleVisibility);
      };
    }
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full
                     bg-primary/90 hover:bg-primary
                     text-primary-foreground
                     shadow-lg hover:shadow-xl
                     backdrop-blur-sm
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                     md:bottom-8 md:right-8
                     sm:bottom-6 sm:right-6"
          whileHover={{ 
            y: -4,
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          {/* Gentle pulse animation */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
