'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Target } from 'lucide-react';

export function PersonalStory() {
  return (
    <div className="space-y-16">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="relative py-20"
      >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-teal-500/10 to-orange-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              className="p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl mr-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="h-6 w-6 text-purple-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-foreground">Why I Do What I Do</h2>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Beyond the code and algorithms, here's the human story that drives everything I create
          </p>
        </motion.div>

        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-3xl p-10 md:p-16 overflow-hidden">
            {/* Decorative Elements */}
            <motion.div
              className="absolute top-6 right-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-purple-400/60" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-6 left-6"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Target className="h-5 w-5 text-teal-400/60" />
            </motion.div>

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Opening paragraph with visual break */}
              <div className="flex items-start gap-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="flex-shrink-0 mt-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-purple-400" />
                  </div>
                </motion.div>
                <p className="text-lg leading-relaxed text-foreground/90" style={{ lineHeight: '1.7' }}>
                  Growing up in Sri Lanka, I watched technology transform lives—from my grandmother learning to video call family abroad to local businesses going digital overnight. That's when I realized: 
                  <span className="text-purple-400 font-semibold"> technology isn't just about code, it's about human connection.</span>
                </p>
              </div>

              {/* Key insight callout */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary rounded-r-xl p-6 my-8"
              >
                <div className="absolute top-4 right-4">
                  <Sparkles className="h-5 w-5 text-primary/60" />
                </div>
                <p className="text-xl font-semibold text-primary leading-relaxed">
                  "Technology should amplify human potential, not replace it."
                </p>
                <p className="text-sm text-muted-foreground mt-2">— Core Philosophy</p>
              </motion.div>

              {/* Closing paragraph */}
              <p className="text-lg leading-relaxed text-foreground/90" style={{ lineHeight: '1.7' }}>
                Every AI model I train, every automation I build, every line of code I write—it all comes back to making someone's day brighter, easier, and more creative. Whether I'm helping a client streamline their workflow or building AI that understands Sinhala literature, I'm driven by human impact.
              </p>

              {/* Final quote */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-muted/30 rounded-xl p-6 border border-border/50"
              >
                <div className="text-4xl font-serif text-primary/40 mb-3">"</div>
                <p className="text-lg font-medium text-foreground italic leading-relaxed">
                  "I don't just build for tomorrow; I build for the person who will smile when they use what I've created today."
                </p>
                <p className="text-sm text-muted-foreground mt-3">— Deaneeth, Founder's Note</p>
              </motion.div>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Deaneeth</p>
                  <p className="text-sm text-muted-foreground">Builder of Futures</p>
                </div>
              </div>
              
              <motion.div
                className="text-right"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-muted-foreground">Written with</p>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-red-400 fill-current" />
                  <span className="text-sm text-muted-foreground">from Colombo, Sri Lanka</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Transition to next section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1 max-w-32"></div>
            <Target className="h-5 w-5 text-primary" />
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1 max-w-32"></div>
          </div>
          <p className="text-muted-foreground text-lg">
            Here's how I bring this philosophy to life through my projects:
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}