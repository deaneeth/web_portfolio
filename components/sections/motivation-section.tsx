'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MotivationSection() {
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);

  // Motivational text split into words for hover effect
  const motivationText = `More than a job, web design is an outlet for your vision. You have the power to take an idea from concept to reality. Your sites can tell a story, "show off a brand", or change lives. As the web expands, so do the possibilities. You also have the flexibility to work remotely or in a fun agency setting. And nothing beats the rush of seeing your live sites in action.`;

  const paragraphTwo = `As a web designer, you get to blend art and technology to create "digital experiences" that inform, entertain, and inspire. Every day is different - one day you may be sketching site layouts on paper, the next you're coding up responsive page templates. Web design keeps you on your toes!`;

  const signature = "— Deaneeth";

  // Split text into words while preserving quoted phrases
  const parseTextToWords = (text: string) => {
    const words: string[] = [];
    let currentWord = '';
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (char === '"') {
        insideQuotes = !insideQuotes;
        currentWord += char;
      } else if (char === ' ' && !insideQuotes) {
        if (currentWord) {
          words.push(currentWord);
          currentWord = '';
        }
      } else {
        currentWord += char;
      }
    }
    
    if (currentWord) {
      words.push(currentWord);
    }
    
    return words;
  };

  const words1 = parseTextToWords(motivationText);
  const words2 = parseTextToWords(paragraphTwo);

  const renderAnimatedText = (words: string[], startIndex: number) => {
    return words.map((word, index) => {
      const globalIndex = startIndex + index;
      const isHighlighted = hoveredWordIndex !== null && globalIndex <= hoveredWordIndex;
      
      return (
        <motion.span
          key={globalIndex}
          onMouseEnter={() => setHoveredWordIndex(globalIndex)}
          className="cursor-pointer transition-colors duration-300"
          style={{
            color: isHighlighted ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
          }}
        >
          {word}{' '}
        </motion.span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
      onMouseLeave={() => setHoveredWordIndex(null)}
    >
      {/* Motivation Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          {/* Left Side - Section Title */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground sticky top-24"
            >
              MOTIVATION
            </motion.h2>
          </div>

          {/* Right Side - Motivational Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Paragraph 1 with progressive hover effect */}
              <div className="text-base md:text-lg leading-relaxed relative">
                {renderAnimatedText(words1, 0)}
                {/* Typing cursor effect */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-[2px] h-5 bg-primary ml-1 align-middle"
                />
              </div>

              {/* Paragraph 2 with progressive hover effect */}
              <div className="text-base md:text-lg leading-relaxed">
                {renderAnimatedText(words2, words1.length)}
              </div>

              {/* Signature - Right aligned */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="pt-6 flex justify-end"
              >
                <p 
                  className="text-2xl md:text-3xl font-['Brush_Script_MT',_cursive] text-foreground/90 italic"
                  style={{ fontFamily: 'cursive' }}
                >
                  {signature}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
