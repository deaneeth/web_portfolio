'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqData, type FAQItem } from '@/data/faqData';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            FAQ
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about my services, process, and collaboration.
          </p>
        </motion.div>

        {/* Popular Questions Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Popular Questions
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {faqData.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.includes(faq.id)}
              onToggle={() => toggleItem(faq.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-3 text-foreground">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Feel free to reach out!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}

// Individual FAQ Item Component
interface FAQItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ faq, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl border transition-all duration-300
          ${isOpen 
            ? 'border-primary/40 bg-background/60 shadow-lg shadow-primary/5' 
            : 'border-border/50 bg-background/40 hover:border-primary/30 hover:bg-background/60'
          }
          backdrop-blur-xl
        `}
      >
        {/* Question Button */}
        <button
          onClick={onToggle}
          className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 transition-all duration-300"
          aria-expanded={isOpen}
        >
          <span className={`
            text-lg md:text-xl font-semibold pr-4 transition-colors duration-300
            ${isOpen ? 'text-foreground' : 'text-foreground/90 group-hover:text-foreground'}
          `}>
            {faq.question}
          </span>
          
          <div className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
            ${isOpen 
              ? 'bg-primary text-primary-foreground rotate-180' 
              : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
            }
          `}>
            {isOpen ? (
              <Minus className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </div>
        </button>

        {/* Answer - Animated */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: 'auto', 
                opacity: 1,
                transition: {
                  height: { duration: 0.3, ease: 'easeOut' },
                  opacity: { duration: 0.3, delay: 0.1 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: 'easeIn' },
                  opacity: { duration: 0.2 }
                }
              }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle gradient overlay on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 
          group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
        `} />
      </div>
    </motion.div>
  );
}
