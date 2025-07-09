'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Target } from 'lucide-react';

export function PersonalStory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      className="relative py-16"
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
          className="text-center mb-12"
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Beyond the code and algorithms, here's the story that drives everything I create
          </p>
        </motion.div>

        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-12 overflow-hidden">
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

            {/* Quote Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-6xl font-serif text-purple-400/30 mb-6"
            >
              "
            </motion.div>

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-foreground/90" style={{ fontFamily: 'Georgia, serif' }}>
                Growing up in Sri Lanka, I watched technology transform lives around me—from my grandmother learning to video call family abroad to local businesses going digital overnight. 
                <span className="text-purple-400 font-medium"> That's when I realized: technology isn't just about code, it's about human connection.</span>
              </p>
              
              <p className="text-lg leading-relaxed text-foreground/90" style={{ fontFamily: 'Georgia, serif' }}>
                Every AI model I train, every automation I build, every line of code I write—it all comes back to one simple belief: 
                <span className="text-teal-400 font-medium"> technology should amplify human potential, not replace it.</span> 
                Whether I'm helping a client streamline their workflow or building an AI that understands Sinhala poetry, I'm driven by the possibility of making someone's day a little brighter, a little easier, a little more creative.
              </p>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="border-l-4 border-gradient-to-b from-purple-500 to-teal-500 pl-6 py-2"
              >
                <p className="text-lg font-medium text-foreground italic">
                  "I don't just build for tomorrow—I build for the person who will smile when they use what I've created today."
                </p>
                <p className="text-sm text-muted-foreground mt-2">— Deaneeth, Founder's Note</p>
              </motion.div>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center justify-between"
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
      </div>
    </motion.section>
  );
}