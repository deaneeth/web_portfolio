'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheck as CheckCircle, ArrowRight, Star, Clock, Users, MessageCircle } from 'lucide-react';
import { ServiceOrderModal } from '@/components/service-order-modal';
import { TwoRowTestimonialCarousel } from '@/components/ui/two-row-testimonial-carousel';
import { services } from '@/data/services/servicesDetailed';
import { testimonials } from '@/data/services/testimonials';
import { processSteps as process } from '@/data/services/process';
import { Service } from '@/data/types';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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
          <motion.div 
            className="card text-center"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-primary mb-1">5,000+</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
          </motion.div>
          <motion.div 
            className="card text-center"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-primary mb-1">24-48h</div>
            <div className="text-sm text-muted-foreground">Delivery</div>
          </motion.div>
          <motion.div 
            className="card text-center"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </motion.div>
          <motion.div 
            className="card text-center"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-primary mb-1">3+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </motion.div>
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
          <span className="text-sm text-muted-foreground">{services?.length || 0} services available</span>
        </motion.div>

        {services && services.length > 0 ? (
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
        ) : (
          <div className="card text-center py-12">
            <p className="text-muted-foreground">No services available at the moment.</p>
          </div>
        )}
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
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Client Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What clients say about working with me
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <TwoRowTestimonialCarousel 
            testimonials={testimonials}
            animationDuration={30}
          />
        </motion.div>
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

      {/* Service Order Modal */}
      <ServiceOrderModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </div>
  );
}