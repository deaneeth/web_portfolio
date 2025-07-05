'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  User, 
  Heart, 
  Zap, 
  Target,
  Globe,
  Calendar,
  GraduationCap,
  Briefcase,
  Brain,
  Trophy,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CuriosityTrigger } from '@/components/easter-egg/curiosity-trigger';

const coreSkills = [
  {
    title: 'Strategic Empath',
    description: 'Combining analytical thinking with deep human understanding',
    icon: Heart,
    color: '#a855f7', // purple
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    title: 'ADHD-Powered Creativity',
    description: 'Turning neurodivergent thinking into innovative solutions',
    icon: Zap,
    color: '#f97316', // orange
    glowColor: 'rgba(249, 115, 22, 0.4)',
  },
  {
    title: 'Overdelivery Mindset',
    description: 'Always exceeding expectations and going the extra mile',
    icon: Target,
    color: '#14b8a6', // teal
    glowColor: 'rgba(20, 184, 166, 0.4)',
  },
  {
    title: 'Future-Focused Vision',
    description: 'Building technology that shapes tomorrow',
    icon: Globe,
    color: '#22c55e', // green
    glowColor: 'rgba(34, 197, 94, 0.4)',
  },
];

const journeyEvents = [
  {
    year: '23',
    title: 'Started University Journey',
    description: 'Began Computer Science at University of Plymouth, Sri Lanka',
    icon: GraduationCap,
    dotColor: 'from-orange-500 to-pink-500',
    glowColor: 'rgba(249, 115, 22, 0.3)',
  },
  {
    year: '23',
    title: 'Freelance Success',
    description: 'Served 5,000+ clients on Fiverr with presentation and design services',
    icon: Briefcase,
    dotColor: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.3)',
  },
  {
    year: '24',
    title: 'AI/ML Deep Dive',
    description: 'Focused on artificial intelligence and machine learning specialization',
    icon: Brain,
    dotColor: 'from-teal-500 to-blue-500',
    glowColor: 'rgba(20, 184, 166, 0.3)',
  },
  {
    year: '24',
    title: 'Creative Technologist',
    description: 'Merged technical skills with creative problem-solving',
    icon: Trophy,
    dotColor: 'from-green-500 to-teal-500',
    glowColor: 'rgba(34, 197, 94, 0.3)',
  },
  {
    year: '26',
    title: 'Graduation & Beyond',
    description: 'Ready to build the future of technology',
    icon: Rocket,
    dotColor: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.3)',
  },
];

export function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullBio = `I'm Dineth, a 19-year-old Computer Science undergraduate at the University of Plymouth, Sri Lanka, graduating in December 2026. I'm not just a student—I'm a builder, thinker, and poet with a keyboard, passionate about AI/ML and creating technology that matters.

My journey is defined by an ADHD-driven creativity that transforms challenges into innovative solutions. From serving 5,000+ clients on Fiverr to pursuing advanced studies in artificial intelligence, I believe in overdelivering value while maintaining authentic connections with every project and person I encounter.

As a strategic empath, I blend technical precision with creative storytelling, crafting solutions that are not just functional, but meaningful. My approach combines analytical thinking with deep human understanding, always focusing on building technology that shapes tomorrow.

I'm passionate about the intersection of artificial intelligence, creative expression, and human-centered design. Whether it's developing machine learning models, creating compelling presentations, or solving complex problems, I bring a unique perspective that bridges the gap between technical excellence and creative innovation.`;

  const truncatedBio = `I'm Dineth, a 19-year-old Computer Science undergraduate at the University of Plymouth, Sri Lanka, graduating in December 2026. I'm not just a student—I'm a builder, thinker, and poet with a keyboard, passionate about AI/ML and creating technology that matters.`;

  return (
    <section id="about" className="py-24 bg-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="section-gradient-text">Deaneeth</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            A 19-year-old builder of futures, blending technical expertise with creative vision
          </p>
        </motion.div>

        {/* Main Content - Centered with Max Width */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Who I Am & Core Skills */}
            <div className="space-y-12">
              {/* Who I Am Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -4,
                  boxShadow: '0 8px 32px rgba(20, 184, 166, 0.15)',
                  transition: { duration: 0.3 }
                }}
                className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 relative"
              >
                {/* Single Easter Egg Trigger - positioned in top right */}
                <div className="absolute top-6 right-6">
                  <CuriosityTrigger triggerType="main" />
                </div>

                <div className="flex items-center mb-6">
                  <div className="p-3 bg-teal-500/10 rounded-xl mr-4">
                    <User className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Who I Am</h3>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{ height: 'auto' }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <p className="text-gray-300 leading-relaxed mb-6 text-base">
                    {isExpanded ? fullBio : truncatedBio}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-teal-400 hover:text-teal-300 p-0 h-auto font-medium hover:bg-transparent transition-colors duration-200"
                  >
                    {isExpanded ? (
                      <>
                        Show less <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Subtle bottom accent line */}
                <div className="mt-6 h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent rounded-full"></div>
              </motion.div>

              {/* Core Skills Grid */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {coreSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -6,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 cursor-pointer group backdrop-blur-sm transition-all duration-300 relative overflow-hidden"
                    style={{
                      boxShadow: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 8px 32px ${skill.glowColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className="p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: `${skill.color}20` }}
                      >
                        <skill.icon 
                          className="h-6 w-6 transition-colors duration-200" 
                          style={{ color: skill.color }}
                        />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg mb-2 group-hover:text-gray-100 transition-colors duration-200">
                          {skill.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-200">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: skill.color }}
                    ></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - My Journey Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -4,
                boxShadow: '0 8px 32px rgba(168, 85, 247, 0.15)',
                transition: { duration: 0.3 }
              }}
              className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 h-fit"
            >
              <div className="flex items-center mb-8">
                <div className="p-3 bg-purple-500/10 rounded-xl mr-4">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">My Journey</h3>
              </div>
              
              <div className="relative">
                {/* Timeline Line with Gradient */}
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-purple-500 to-teal-500 opacity-60"></div>
                
                <div className="space-y-8">
                  {journeyEvents.map((event, index) => (
                    <motion.div
                      key={`${event.year}-${index}`}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="relative flex items-start group"
                    >
                      {/* Timeline Dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <motion.div 
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${event.dotColor} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-200`}
                          whileHover={{ scale: 1.15 }}
                        >
                          {event.year}
                        </motion.div>
                      </div>
                      
                      {/* Event Content */}
                      <div className="ml-8 pb-2 flex-1">
                        <motion.div 
                          className="group-hover:translate-y-[-3px] transition-all duration-300 p-4 rounded-xl hover:bg-gray-800/30"
                          whileHover={{
                            boxShadow: `0 6px 24px ${event.glowColor}`,
                          }}
                        >
                          <div className="flex items-center mb-2">
                            <event.icon className="h-5 w-5 text-gray-400 mr-2" />
                            <h4 className="font-bold text-white text-lg group-hover:text-gray-100 transition-colors duration-200">
                              {event.title}
                            </h4>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-200">
                            {event.description}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="mt-8 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}