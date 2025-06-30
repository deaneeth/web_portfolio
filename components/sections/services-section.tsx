'use client';

import { motion } from 'framer-motion';
import { 
  Presentation, 
  FileImage, 
  Palette, 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    icon: Presentation,
    title: 'Presentation Design',
    description: 'Professional pitch decks, business presentations, and investor-ready slides that captivate and convert.',
    whatsIncluded: [
      'Custom templates',
      'Data visualization', 
      'Brand consistency',
      'Quick turnaround'
    ],
    deliverables: 'PowerPoint/Google Slides + Source files',
    examples: ['Startup pitch decks', 'Business proposals', 'Academic presentations'],
    price: 'From $50',
    popular: true,
    glowColor: 'rgba(20, 184, 166, 0.4)',
    borderColor: '#14b8a6',
    priceColor: '#14b8a6'
  },
  {
    icon: FileImage,
    title: 'Flyer & Poster Design',
    description: 'Eye-catching marketing materials that grab attention and drive action across digital and print media.',
    whatsIncluded: [
      'Multiple concepts',
      'Print-ready files',
      'Social media formats',
      'Unlimited revisions'
    ],
    deliverables: 'High-res PNG/PDF + Print files',
    examples: ['Event flyers', 'Product posters', 'Social media graphics'],
    price: 'From $30',
    popular: false,
    glowColor: 'rgba(249, 115, 22, 0.4)',
    borderColor: '#f97316',
    priceColor: '#f97316'
  },
  {
    icon: Palette,
    title: 'Brand Visual Identity',
    description: 'Complete brand identity packages including logos, color schemes, and visual guidelines.',
    whatsIncluded: [
      'Logo design',
      'Color palette',
      'Typography guide',
      'Brand guidelines'
    ],
    deliverables: 'Vector files + Brand guide + Assets',
    examples: ['Startup branding', 'Logo redesigns', 'Visual identity systems'],
    price: 'From $200',
    popular: false,
    glowColor: 'rgba(168, 85, 247, 0.4)',
    borderColor: '#a855f7',
    priceColor: '#a855f7'
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Creative </span>
            <span className="section-gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Professional design and creative solutions that help your ideas shine
          </p>
        </motion.div>

        {/* Service Cards Grid - Exact Reference Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gray-900/95 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 h-[520px]"
                style={{
                  border: `2px solid ${service.borderColor}`,
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px ${service.glowColor}`;
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = service.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = service.borderColor;
                }}
              >
                {/* Most Popular Badge - Positioned exactly as in reference */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Most Popular
                    </motion.div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 h-full flex flex-col">
                  {/* Top Section - Icon and Price */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Service Icon */}
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${service.borderColor}20` }}
                    >
                      <service.icon 
                        className="h-8 w-8" 
                        style={{ color: service.borderColor }}
                      />
                    </div>

                    {/* Price */}
                    <div 
                      className="text-xl font-bold"
                      style={{ color: service.priceColor }}
                    >
                      {service.price}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* What's Included */}
                  <div className="mb-4">
                    <h4 className="text-white font-bold mb-3 text-sm">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.whatsIncluded.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-gray-300 text-sm">
                          <div 
                            className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                            style={{ backgroundColor: service.borderColor }}
                          ></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-4">
                    <h4 className="text-white font-bold mb-2 text-sm">Deliverables:</h4>
                    <p className="text-gray-400 text-sm">{service.deliverables}</p>
                  </div>

                  {/* Examples */}
                  <div className="mb-6 flex-grow">
                    <h4 className="text-white font-bold mb-3 text-sm">Examples:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.examples.map((example, exampleIndex) => (
                        <Badge
                          key={exampleIndex}
                          variant="secondary"
                          className="bg-white/10 text-gray-300 border-white/20 text-xs px-3 py-1 rounded-full"
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Order Now Button - At bottom */}
                  <div className="mt-auto">
                    <Button 
                      className="w-full text-white font-bold py-3 rounded-xl border-0 transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${service.borderColor}, #ec4899)`,
                        boxShadow: `0 4px 20px ${service.glowColor}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = `0 8px 30px ${service.glowColor}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 4px 20px ${service.glowColor}`;
                      }}
                    >
                      <span className="flex items-center justify-center">
                        Order Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}