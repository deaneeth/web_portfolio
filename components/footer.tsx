'use client';

import { motion } from 'framer-motion';
import { Heart, Code, Coffee } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-4">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>and</span>
            <Code className="h-4 w-4 text-primary" />
            <span>by Dineth</span>
            <Coffee className="h-4 w-4 text-amber-500" />
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">
            © 2025 Dineth. All rights reserved.
          </p>
          
          <p className="text-xs text-muted-foreground">
            Strategic empath • Creative technologist • Future builder
          </p>
        </motion.div>
      </div>
    </footer>
  );
}