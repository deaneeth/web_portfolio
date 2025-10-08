'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { getSortedEducation, type Education } from '@/data/about/educationData';

const EducationCard = ({ education, index }: { education: Education; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index === 0 ? 0 : index * 0.2,
        ease: "easeOut"
      }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Vertical Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />
      
      {/* Timeline Dot */}
      <div className="absolute left-[-4px] top-2 w-[10px] h-[10px] rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/50" />

      {/* Education Card Content */}
      <div className="space-y-3">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{education.location}</span>
        </div>

        {/* Degree and Period - Using same grid structure as Experience section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          {/* Left: Degree and Institution (3 columns like Experience) */}
          <div className="lg:col-span-3 space-y-1">
            <motion.h3 
              className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {education.degree}
            </motion.h3>
            <p className="text-base md:text-lg text-muted-foreground font-medium">
              {education.institution}
            </p>
          </div>
          
          {/* Right: Period (2 columns like Experience, aligned right) */}
          <div className="lg:col-span-2 flex justify-start lg:justify-end">
            <span className="text-sm md:text-base text-muted-foreground font-medium whitespace-nowrap">
              {education.period}
            </span>
          </div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.3, 
            delay: index === 0 ? 0.05 : index * 0.2 + 0.05,
            ease: "easeOut"
          }}
          className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4"
        >
          <p>{education.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function EducationSection() {
  const sortedEducation = getSortedEducation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      {/* Section Title - Same spacing as Experience section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Education</h2>
          <p className="text-base text-muted-foreground">Academic journey & learning milestones</p>
        </motion.div>
      </div>

      {/* Education Timeline - Same container width as Experience section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-full">
          {sortedEducation.map((education, index) => (
            <EducationCard key={index} education={education} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
