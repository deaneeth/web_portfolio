'use client';

import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Bot, 
  Wrench, 
  Palette, 
  Rocket 
} from 'lucide-react';

const communityCards = [
  {
    id: 1,
    title: 'University of Plymouth',
    subtitle: 'Computer Science Student',
    icon: GraduationCap,
    color: '#3b82f6', // blue
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    id: 2,
    title: 'Fiverr',
    subtitle: '5,000+ Clients Served',
    icon: Briefcase,
    color: '#f97316', // orange
    glowColor: 'rgba(249, 115, 22, 0.4)',
  },
  {
    id: 3,
    title: 'AI/ML Community',
    subtitle: 'Active Contributor',
    icon: Bot,
    color: '#a855f7', // purple
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    id: 4,
    title: 'Open Source',
    subtitle: 'GitHub Contributor',
    icon: Wrench,
    color: '#14b8a6', // teal
    glowColor: 'rgba(20, 184, 166, 0.4)',
  },
  {
    id: 5,
    title: 'Design Community',
    subtitle: 'Creative Professional',
    icon: Palette,
    color: '#ec4899', // pink
    glowColor: 'rgba(236, 72, 153, 0.4)',
  },
  {
    id: 6,
    title: 'Tech Innovation',
    subtitle: 'Future Builder',
    icon: Rocket,
    color: '#22c55e', // green
    glowColor: 'rgba(34, 197, 94, 0.4)',
  },
];

const legendItems = [
  {
    color: '#22c55e', // green
    label: 'Active Projects',
  },
  {
    color: '#3b82f6', // blue
    label: 'Learning & Growing',
  },
  {
    color: '#a855f7', // purple
    label: 'Building the Future',
  },
];

export function TrustedSection() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Trusted by <span className="trusted-gradient-text">Communities & Clients</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Building relationships and delivering excellence across diverse platforms and communities
          </p>
        </motion.div>

        {/* Community Cards */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {communityCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-gray-900/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm cursor-pointer transition-all duration-300 text-center"
                style={{
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px ${card.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <motion.div 
                  className="mb-4 flex justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="p-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <card.icon 
                      className="h-8 w-8 transition-colors duration-200" 
                      style={{ color: card.color }}
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-200">
                  {card.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                  {card.subtitle}
                </p>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: card.color }}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8"
        >
          {legendItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
              viewport={{ once: true }}
              className="flex items-center space-x-3"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-400 text-sm font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}