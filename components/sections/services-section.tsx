'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Presentation, 
  Palette, 
  FileText, 
  Star, 
  Clock, 
  CheckCircle, 
  Users, 
  X,
  Upload,
  Send,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  Zap,
  Target,
  Rocket,
  Brain,
  ChevronDown,
  ChevronUp,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const services = [
  {
    id: 1,
    name: 'Presentation Design',
    price: 'From $50',
    icon: Presentation,
    color: '#14b8a6', // teal
    glowColor: 'rgba(20, 184, 166, 0.4)',
    description: 'Transform your ideas into stunning, professional presentations that captivate and convert.',
    features: [
      'Custom slide design & layout',
      'Data visualization & infographics',
      'Brand-consistent styling',
      'Interactive elements',
      'Speaker notes included'
    ],
    deliverables: 'PowerPoint/Keynote files, PDF exports, 24-48h delivery',
    tags: ['Business', 'Academic', 'Pitch Decks', 'Training'],
    portfolioLinks: ['View Samples', 'Case Studies'],
    mostPopular: true
  },
  {
    id: 2,
    name: 'Graphic Design',
    price: 'From $30',
    icon: Palette,
    color: '#f97316', // orange
    glowColor: 'rgba(249, 115, 22, 0.4)',
    description: 'Eye-catching graphics that communicate your message with visual impact and professional polish.',
    features: [
      'Logo & brand identity',
      'Social media graphics',
      'Marketing materials',
      'Print & digital formats',
      'Vector & raster files'
    ],
    deliverables: 'AI, PSD, PNG, JPG files, 24-72h delivery',
    tags: ['Logos', 'Social Media', 'Branding', 'Marketing'],
    portfolioLinks: ['Portfolio Gallery', 'Brand Work'],
    mostPopular: false
  },
  {
    id: 3,
    name: 'Content Writing',
    price: 'From $25',
    icon: FileText,
    color: '#a855f7', // purple
    glowColor: 'rgba(168, 85, 247, 0.4)',
    description: 'Compelling copy that engages your audience and drives action with strategic messaging.',
    features: [
      'Website copy & blogs',
      'Marketing content',
      'Technical documentation',
      'SEO optimization',
      'Multiple revisions'
    ],
    deliverables: 'Word docs, Google Docs, 48-96h delivery',
    tags: ['Web Copy', 'Blogs', 'Marketing', 'Technical'],
    portfolioLinks: ['Writing Samples', 'Client Results'],
    mostPopular: false
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp',
    rating: 5,
    text: 'Dineth transformed our pitch deck completely. The design was stunning and helped us secure $2M in funding!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Startup Founder',
    company: 'InnovateLab',
    rating: 5,
    text: 'Incredible attention to detail and fast delivery. The presentation design exceeded all expectations.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Brand Manager',
    company: 'Creative Agency',
    rating: 5,
    text: 'Professional, creative, and always delivers on time. Our go-to designer for all presentation needs.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Product Manager',
    company: 'StartupXYZ',
    rating: 5,
    text: 'The graphic design work was exceptional. Helped establish our brand identity perfectly.',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

const legendItems = [
  {
    color: '#22c55e', // green
    label: '5,000+ Happy Clients',
  },
  {
    color: '#3b82f6', // blue
    label: '24–48h Delivery',
  },
  {
    color: '#a855f7', // purple
    label: 'Unlimited Revisions',
  },
];

const whyWorkWithMeBenefits = [
  {
    icon: Brain,
    title: 'Strategic Approach',
    description: 'Backed by psychology and proven conversion principles that drive real results',
    color: '#14b8a6', // teal
    glowColor: 'rgba(20, 184, 166, 0.4)',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'ADHD-powered efficiency means faster turnarounds without compromising quality',
    color: '#f97316', // orange
    glowColor: 'rgba(249, 115, 22, 0.4)',
  },
  {
    icon: Target,
    title: 'Overdelivery Promise',
    description: 'Always more value than you paid for - it\'s not just a promise, it\'s my standard',
    color: '#a855f7', // purple
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    icon: Rocket,
    title: 'Tech/Design Synergy',
    description: 'Unique blend of technical expertise and creative vision for innovative solutions',
    color: '#ec4899', // pink
    glowColor: 'rgba(236, 72, 153, 0.4)',
  },
];

const faqData = [
  {
    id: 1,
    question: 'How fast is the turnaround time?',
    answer: 'Most projects are completed within 24-48 hours for presentations, 24-72 hours for graphic design, and 48-96 hours for content writing. Rush orders can often be accommodated for an additional fee. I always communicate realistic timelines upfront and keep you updated throughout the process.'
  },
  {
    id: 2,
    question: 'What file formats do I receive?',
    answer: 'You\'ll receive all source files plus multiple export formats. For presentations: PowerPoint/Keynote + PDF. For graphics: AI/PSD source files + PNG/JPG exports. For content: Word docs, Google Docs, or your preferred format. All files are yours to keep and modify as needed.'
  },
  {
    id: 3,
    question: 'How do payments work?',
    answer: 'I accept PayPal, Stripe, and bank transfers. For smaller projects, payment is typically 100% upfront. For larger projects over $200, I offer 50% upfront and 50% on completion. All payments are secure and you\'ll receive detailed invoices for your records.'
  },
  {
    id: 4,
    question: 'Can I request revisions?',
    answer: 'Absolutely! I offer unlimited revisions until you\'re completely satisfied. Most clients need 1-2 rounds of minor tweaks. I want you to love the final result, so I\'ll work with you to get it exactly right. Clear communication about changes helps ensure quick turnarounds.'
  },
  {
    id: 5,
    question: 'Do you work with my brand guidelines?',
    answer: 'Yes! I can work with your existing brand guidelines, colors, fonts, and style preferences. If you don\'t have brand guidelines, I can help create a cohesive visual identity that aligns with your goals and target audience. Just share any brand assets you have during the order process.'
  },
  {
    id: 6,
    question: 'What if I need something custom or unique?',
    answer: 'I love custom projects! If your needs don\'t fit the standard service packages, just reach out with your requirements. I can create custom quotes for unique projects, ongoing partnerships, or bulk work. Every project is tailored to your specific goals and requirements.'
  }
];

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    requirements: '',
    file: null as File | null
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const openOrderModal = (service: typeof services[0]) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeOrderModal = () => {
    setSelectedService(null);
    setOrderForm({ name: '', email: '', requirements: '', file: null });
    document.body.style.overflow = 'unset';
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order submitted successfully! I\'ll get back to you within 24 hours.');
    closeOrderModal();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOrderForm({ ...orderForm, file });
    }
  };

  const toggleFaq = (faqId: number) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  // Auto-rotate testimonials
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle ESC key for modal
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeOrderModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="services" className="py-24 bg-black">
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
            Creative <span className="projects-gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Professional design and content solutions that elevate your brand and drive results
          </p>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-6"
          >
            {legendItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
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
        </motion.div>

{/* Why Work With Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mb-24"
        >
          <div className="relative bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-orange-500/10 border border-gray-800/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm overflow-hidden animate-gradient-x">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-orange-500/5 animate-gradient-x"></div>

            <div className="relative z-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center mb-4">
                  <motion.div 
                    className="p-4 bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl mr-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Zap className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    Why Work With Me?
                  </h3>
                </div>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  More than just a service provider—I'm your strategic partner in success
                </p>
              </motion.div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyWorkWithMeBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    className="group text-center"
                  >
                    {/* Animated Icon */}
                    <motion.div 
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div 
                        className="p-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative"
                        style={{ 
                          backgroundColor: `${benefit.color}20`,
                          boxShadow: `0 0 20px ${benefit.glowColor}`,
                        }}
                      >
                        <benefit.icon 
                          className="h-8 w-8 transition-all duration-300" 
                          style={{ color: benefit.color }}
                        />
                        
                        {/* Glow effect on hover */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ 
                            boxShadow: `0 0 30px ${benefit.glowColor}`,
                          }}
                        ></div>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                      {benefit.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-gray-900/80 border border-gray-800/50 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
                style={{
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px ${service.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Popular Badge - Centered at top */}
                {service.mostPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <motion.div>
                      <Badge className="featured-badge bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg">
                        <Star className="mr-1 h-3 w-3 fill-current" />
                        Most Popular
                      </Badge>
                    </motion.div>
                  </div>
                )}

                <div className="p-8">
                  {/* Service Icon & Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="p-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: `${service.color}20` }}
                      >
                        <service.icon 
                          className="h-8 w-8 transition-colors duration-200" 
                          style={{ color: service.color }}
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gray-100 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-lg font-semibold" style={{ color: service.color }}>
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 text-sm">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-400 text-sm">
                          <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" style={{ color: service.color }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2 text-sm">Deliverables:</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {service.deliverables}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 transition-colors text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Portfolio Links */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.portfolioLinks.map((link) => (
                      <button
                        key={link}
                        className="text-xs text-gray-400 hover:text-white transition-colors underline decoration-dotted"
                      >
                        {link} <ExternalLink className="h-3 w-3 inline ml-1" />
                      </button>
                    ))}
                  </div>

                  {/* Order Button */}
                  <Button
                    onClick={() => openOrderModal(service)}
                    className="w-full font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: service.color,
                      color: 'white',
                    }}
                  >
                    Order Now
                  </Button>
                </div>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: service.color }}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>

        

        {/* Custom Orders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-24"
        >
          <Card className="bg-gray-900/80 border-gray-800/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl mr-4">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Need Something Custom?</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Have a unique project in mind? Let's discuss your specific requirements and create something amazing together.
              </p>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Request Custom Quote
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Client Testimonials</h3>
            <p className="text-gray-400">What our clients say about our work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-gray-900/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                    <p className="text-gray-500 text-xs">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-400">Everything you need to know about our creative services</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/80 border border-gray-800/50 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              >
                <motion.button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-inset"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  aria-expanded={openFaqId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <h4 className="text-white font-semibold text-lg pr-4">
                    {faq.question}
                  </h4>
                  <motion.div
                    animate={{ rotate: openFaqId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openFaqId === faq.id && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-800/50 pt-4">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-orange-500/10 border border-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl mr-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Still have questions?</h4>
              </div>
              <p className="text-gray-400 mb-6">
                I'm here to help! Reach out directly and I'll get back to you within 24 hours.
              </p>
              <Button
                className="bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me Directly
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Order Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={closeOrderModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/95 border border-gray-800/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${selectedService.color}20` }}
                    >
                      <selectedService.icon 
                        className="h-6 w-6" 
                        style={{ color: selectedService.color }}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Order {selectedService.name}
                      </h2>
                      <p className="text-gray-400 text-sm">{selectedService.price}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeOrderModal}
                    className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <form onSubmit={handleOrderSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm">
                          Your Name *
                        </label>
                        <Input
                          required
                          value={orderForm.name}
                          onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          required
                          value={orderForm.email}
                          onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Project Requirements *
                      </label>
                      <Textarea
                        required
                        value={orderForm.requirements}
                        onChange={(e) => setOrderForm({ ...orderForm, requirements: e.target.value })}
                        className="bg-white/5 border-white/10 text-white placeholder-gray-400 min-h-[120px]"
                        placeholder="Describe your project requirements, goals, and any specific details..."
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Upload Files (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.zip"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-400 text-sm">
                            {orderForm.file ? orderForm.file.name : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            PDF, DOC, PPT, Images, ZIP (Max 10MB)
                          </p>
                        </label>
                      </div>
                    </div>

                    {/* Payment Methods Preview */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3 text-sm">Payment Methods (Coming Soon)</h4>
                      <div className="flex flex-wrap gap-3">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          PayPal
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          Stripe
                        </Badge>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                          Bank Transfer
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={closeOrderModal}
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 font-semibold"
                        style={{
                          backgroundColor: selectedService.color,
                          color: 'white',
                        }}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Submit Order
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}