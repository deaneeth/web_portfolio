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
  Rocket,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CuriosityTrigger } from '@/components/easter-egg/curiosity-trigger';

const coreSkills = [
  {
    title: 'Strategic Empath',
    description: 'Combining analytical thinking with deep human understanding',
    icon: Heart,
  },
  {
    title: 'ADHD-Powered Creativity',
    description: 'Turning neurodivergent thinking into innovative solutions',
    icon: Zap,
  },
  {
    title: 'Overdelivery Mindset',
    description: 'Always exceeding expectations and going the extra mile',
    icon: Target,
  },
  {
    title: 'Future-Focused Vision',
    description: 'Building technology that shapes tomorrow',
    icon: Globe,
  },
];

const journeyEvents = [
  {
    year: '23',
    title: 'Started University Journey',
    description: 'Began Computer Science at University of Plymouth, Sri Lanka',
    icon: GraduationCap,
  },
  {
    year: '23',
    title: 'Freelance Success',
    description: 'Served 5,000+ clients on Fiverr with presentation and design services',
    icon: Briefcase,
  },
  {
    year: '24',
    title: 'AI/ML Deep Dive',
    description: 'Focused on artificial intelligence and machine learning specialization',
    icon: Brain,
  },
  {
    year: '24',
    title: 'Creative Technologist',
    description: 'Merged technical skills with creative problem-solving',
    icon: Trophy,
  },
  {
    year: '26',
    title: 'Graduation & Beyond',
    description: 'Ready to build the future of technology',
    icon: Rocket,
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
    <section id="about" className="section-spacing">
      <div className="container-grid">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-display text-white mb-8">
            ABOUT DEANEETH
          </h2>
          <p className="text-body max-w-3xl mx-auto">
            A 19-year-old builder of futures, blending technical expertise with creative vision
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          
          {/* Left Column - Who I Am & Core Skills */}
          <div className="space-y-12">
            
            {/* Who I Am Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="bento-card relative"
            >
              {/* Easter Egg Trigger */}
              <div className="absolute top-8 right-8">
                <CuriosityTrigger triggerType="main" />
              </div>

              <div className="flex items-center mb-8">
                <div className="p-4 bg-[#7D27F5]/10 rounded-2xl mr-6">
                  <User className="h-8 w-8 text-[#7D27F5]" />
                </div>
                <h3 className="text-heading text-white">Who I Am</h3>
              </div>
              
              <motion.div
                initial={false}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <p className="text-body mb-8">
                  {isExpanded ? fullBio : truncatedBio}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[#7D27F5] hover:text-[#B794F4] p-0 h-auto font-medium hover:bg-transparent transition-colors duration-300 mb-8"
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

              {/* Download CV Button */}
              <div className="pt-8 border-t border-white/10">
                <Button 
                  className="btn-primary magnetic"
                  onClick={() => window.open('#', '_blank')}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Button>
              </div>
            </motion.div>

            {/* Core Skills Grid */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {coreSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  className="bento-card group text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-[#7D27F5]/10 rounded-2xl mb-6 group-hover:bg-[#7D27F5]/20 transition-colors duration-300">
                      <skill.icon className="h-8 w-8 text-[#7D27F5] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="text-heading text-white mb-4 group-hover:text-[#B794F4] transition-colors duration-300">
                      {skill.title}
                    </h4>
                    <p className="text-body text-center">
                      {skill.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - My Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="bento-card h-fit"
          >
            <div className="flex items-center mb-12">
              <div className="p-4 bg-[#7D27F5]/10 rounded-2xl mr-6">
                <Calendar className="h-8 w-8 text-[#7D27F5]" />
              </div>
              <h3 className="text-heading text-white">My Journey</h3>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7D27F5] via-[#B794F4] to-[#7D27F5] opacity-40"></div>
              
              <div className="space-y-12">
                {journeyEvents.map((event, index) => (
                  <motion.div
                    key={`${event.year}-${index}`}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: true }}
                    className="relative flex items-start group"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7D27F5] to-[#B794F4] flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.15 }}
                      >
                        {event.year}
                      </motion.div>
                    </div>
                    
                    {/* Event Content */}
                    <div className="ml-8 pb-4 flex-1">
                      <motion.div 
                        className="group-hover:translate-y-[-4px] transition-all duration-300 p-6 rounded-2xl hover:bg-white/5"
                      >
                        <div className="flex items-center mb-3">
                          <event.icon className="h-6 w-6 text-white/60 mr-3" />
                          <h4 className="text-heading text-white group-hover:text-[#B794F4] transition-colors duration-300">
                            {event.title}
                          </h4>
                        </div>
                        <p className="text-body">
                          {event.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}