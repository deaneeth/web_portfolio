'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Palette, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Star,
  Clock,
  Users,
  MessageCircle,
  X
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'AI/ML Solutions',
    description: 'Custom artificial intelligence and machine learning solutions tailored to your business needs.',
    icon: Brain,
    color: 'from-purple-500 to-blue-500',
    features: [
      'Custom model development',
      'Data analysis & insights',
      'Computer vision systems',
      'Natural language processing',
      'Predictive analytics'
    ],
    deliverables: 'Trained models, documentation, deployment guide',
    timeline: '4-8 weeks',
    startingPrice: '$2,500',
    popular: true
  },
  {
    id: 2,
    title: 'Intelligent Automation',
    description: 'Streamline your workflows with smart automation solutions that save time and reduce errors.',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    features: [
      'Process automation',
      'Data pipeline creation',
      'API integrations',
      'Workflow optimization',
      'Performance monitoring'
    ],
    deliverables: 'Automation scripts, monitoring dashboard, training',
    timeline: '2-4 weeks',
    startingPrice: '$1,500',
    popular: false
  },
  {
    id: 3,
    title: 'Web Applications',
    description: 'Modern, responsive web applications built with cutting-edge technologies.',
    icon: Code,
    color: 'from-green-500 to-teal-500',
    features: [
      'Full-stack development',
      'Responsive design',
      'Database integration',
      'API development',
      'Performance optimization'
    ],
    deliverables: 'Complete application, source code, deployment',
    timeline: '3-6 weeks',
    startingPrice: '$2,000',
    popular: false
  },
  {
    id: 4,
    title: 'Design & Consulting',
    description: 'Strategic design and technical consulting to guide your digital transformation.',
    icon: Palette,
    color: 'from-pink-500 to-purple-500',
    features: [
      'UI/UX design',
      'Technical architecture',
      'Code reviews',
      'Performance audits',
      'Strategic planning'
    ],
    deliverables: 'Design files, recommendations, implementation plan',
    timeline: '1-3 weeks',
    startingPrice: '$1,000',
    popular: false
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, TechCorp',
    content: 'Deaneeth delivered an exceptional AI solution that transformed our data analysis capabilities. Professional, innovative, and results-driven.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    name: 'Michael Chen',
    role: 'Founder, StartupXYZ',
    content: 'The automation solution saved us 20+ hours per week. Incredible attention to detail and seamless implementation.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager, InnovateLab',
    content: 'Outstanding web application that exceeded our expectations. Fast delivery and excellent communication throughout.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

const process = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We discuss your needs, goals, and project requirements in detail.'
  },
  {
    step: 2,
    title: 'Proposal & Planning',
    description: 'I create a detailed proposal with timeline, deliverables, and pricing.'
  },
  {
    step: 3,
    title: 'Development',
    description: 'Regular updates and milestones ensure you\'re always in the loop.'
  },
  {
    step: 4,
    title: 'Delivery & Support',
    description: 'Complete delivery with documentation and ongoing support.'
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="page-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">Creative Services</h1>
          <p className="page-subtitle">
            AI solutions, automation, web applications, and design consulting. 
            Let's build something amazing together with cutting-edge technology.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">5,000+</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">24-48h</div>
            <div className="text-sm text-muted-foreground">Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">3+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl font-semibold">My Services</h2>
          <span className="text-sm text-muted-foreground">{services.length} services available</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              className="card hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedService(service)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color} bg-opacity-10`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  {service.popular && (
                    <span className="text-xs bg-orange-500/10 text-orange-500 px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Content */}
              <h3 className="card-title group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="card-description mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-sm text-muted-foreground">
                    +{service.features.length - 3} more features
                  </li>
                )}
              </ul>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.timeline}
                  </div>
                </div>
                <div className="text-lg font-semibold text-primary">
                  {service.startingPrice}+
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">How We Work Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A streamlined process designed to deliver exceptional results while keeping you informed every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Client Testimonials</h2>
          <p className="text-muted-foreground">
            What clients say about working with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 text-center"
      >
        <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Let's discuss your needs and create a custom solution that drives real results for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="btn btn-primary">
            <MessageCircle className="w-4 h-4" />
            Start a Project
          </a>
          <a href="/contact" className="btn btn-outline">
            Schedule a Call
          </a>
        </div>
      </motion.div>

      {/* Service Detail Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${selectedService.color} bg-opacity-10`}>
                    <selectedService.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedService.title}</h2>
                    <p className="text-muted-foreground">{selectedService.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">What's Included</h3>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Deliverables</h3>
                    <p className="text-muted-foreground text-sm">{selectedService.deliverables}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Timeline</h3>
                    <p className="text-muted-foreground text-sm">{selectedService.timeline}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground">Starting at</div>
                    <div className="text-2xl font-bold text-primary">{selectedService.startingPrice}</div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="btn btn-outline"
                    >
                      Close
                    </button>
                    <a href="/contact" className="btn btn-primary">
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}