'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { getSortedExperiences, type Experience } from '@/data/experienceData';

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
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

      {/* Experience Card Content */}
      <div className="space-y-3">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{experience.location}</span>
        </div>

        {/* Company Name and Period - Using same grid structure as intro section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          {/* Left: Company and Role (3 columns like intro content) */}
          <div className="lg:col-span-3 space-y-1">
            <motion.h3 
              className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {experience.company}
            </motion.h3>
            <p className="text-base md:text-lg text-muted-foreground font-medium">
              {experience.role}
            </p>
          </div>
          
          {/* Right: Period (2 columns like intro image, aligned right) */}
          <div className="lg:col-span-2 flex justify-start lg:justify-end">
            <span className="text-sm md:text-base text-muted-foreground font-medium whitespace-nowrap">
              {experience.period}
            </span>
          </div>
        </div>

        {/* Highlights/Achievements */}
        <ul className="space-y-2 mt-4">
          {experience.highlights.map((highlight, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3, 
                delay: index === 0 ? idx * 0.05 : index * 0.2 + idx * 0.05,
                ease: "easeOut"
              }}
              className="flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-relaxed"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70 mt-2 shrink-0" />
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function ExperienceSection() {
  const sortedExperiences = getSortedExperiences();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      {/* Section Title - Centered with same spacing as Skills section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Experience</h2>
          <p className="text-base text-muted-foreground">Professional journey & achievements</p>
        </motion.div>
      </div>

      {/* Experience Timeline - Same container width as intro section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-full">
          {sortedExperiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
