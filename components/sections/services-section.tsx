'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Presentation, 
  FileImage, 
  Palette, 
  ArrowRight,
  X,
  Upload,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  Users,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const services = [
  {
    id: 1,
    icon: Presentation,
    title: 'Presentation Design',
    price: 'From $50',
    description: 'Professional pitch decks, business presentations, and investor-ready slides that captivate and convert your audience.',
    features: [
      'Custom templates & branding',
      'Data visualization & charts', 
      'Storytelling structure',
      'Quick 24-48h turnaround'
    ],
    deliverables: 'PowerPoint/Google Slides + Source files + PDF export',
    examples: ['Startup Pitch Decks', 'Business Proposals', 'Academic Presentations', 'Sales Decks'],
    popular: true,
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    bgGradient: 'from-teal-500/10 to-cyan-500/10'
  },
  {
    id: 2,
    icon: FileImage,
    title: 'Flyer & Poster Design',
    price: 'From $30',
    description: 'Eye-catching marketing materials that grab attention and drive action across digital and print media.',
    features: [
      'Multiple design concepts',
      'Print-ready high resolution',
      'Social media formats',
      'Unlimited revisions'
    ],
    deliverables: 'High-res PNG/PDF + Print files + Social media sizes',
    examples: ['Event Flyers', 'Product Posters', 'Social Graphics', 'Marketing Materials'],
    popular: false,
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    bgGradient: 'from-orange-500/10 to-red-500/10'
  },
  {
    id: 3,
    icon: Palette,
    title: 'Brand Visual Identity',
    price: 'From $200',
    description: 'Complete brand identity packages including logos, color schemes, and comprehensive visual guidelines.',
    features: [
      'Logo design & variations',
      'Color palette & typography',
      'Brand guidelines document',
      'Business card templates'
    ],
    deliverables: 'Vector files + Brand guide + Asset library + Templates',
    examples: ['Startup Branding', 'Logo Redesigns', 'Visual Systems', 'Brand Refresh'],
    popular: false,
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    bgGradient: 'from-purple-500/10 to-pink-500/10'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Startup Founder',
    company: 'TechFlow',
    rating: 5,
    text: 'Dineth transformed our pitch deck completely. We secured $2M in funding partly thanks to his incredible design work. Professional, fast, and exceeded expectations.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    service: 'Presentation Design'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Marketing Director',
    company: 'GrowthLab',
    rating: 5,
    text: 'Outstanding flyer designs that increased our event attendance by 300%. Dineth understands how to make designs that actually convert.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    service: 'Flyer Design'
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Creative Director',
    company: 'BrandCraft',
    rating: 5,
    text: 'The brand identity package was phenomenal. Every detail was perfect, from the logo to the comprehensive guidelines. Highly recommend!',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    service: 'Brand Identity'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Product Manager',
    company: 'InnovateCorp',
    rating: 5,
    text: 'Fast delivery, unlimited revisions, and exceptional quality. Dineth made our product launch materials look absolutely professional.',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    service: 'Marketing Materials'
  }
];

const legendItems = [
  {
    icon: Users,
    label: '5,000+ Happy Clients',
    color: '#22c55e'
  },
  {
    icon: Clock,
    label: '24–48h Delivery',
    color: '#3b82f6'
  },
  {
    icon: Zap,
    label: 'Unlimited Revisions',
    color: '#a855f7'
  }
];

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    requirements: '',
    file: null as File | null
  });

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
    toast.success(`Order request submitted for ${selectedService?.title}! I'll contact you within 24 hours.`);
    closeOrderModal();
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="services" className="py-24 bg-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Creative <span className="section-gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Professional design solutions that elevate your brand and captivate your audience
          </p>

          {/* Micro-legend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-6 mb-16"
          >
            {legendItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2"
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <item.icon className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm font-medium">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto mb-20">
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
                className={`group relative bg-gradient-to-br ${service.bgGradient} bg-gray-900/80 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 h-[600px]`}
                style={{
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px ${service.glowColor}`;
                  e.currentTarget.style.borderColor = service.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                }}
              >
                {/* Most Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Most Popular</span>
                    </motion.div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <service.icon 
                        className="h-8 w-8" 
                        style={{ color: service.color }}
                      />
                    </div>
                    <div 
                      className="text-xl font-bold"
                      style={{ color: service.color }}
                    >
                      {service.price}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 text-sm">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-gray-300 text-sm">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                            style={{ backgroundColor: service.color }}
                          ></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2 text-sm">Deliverables:</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{service.deliverables}</p>
                  </div>

                  {/* Examples */}
                  <div className="mb-6 flex-grow">
                    <h4 className="text-white font-semibold mb-3 text-sm">Examples:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.examples.map((example, exampleIndex) => (
                        <Badge
                          key={exampleIndex}
                          variant="secondary"
                          className="bg-white/10 text-gray-300 border-white/20 text-xs px-2 py-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Order Button */}
                  <div className="mt-auto">
                    <Button 
                      onClick={() => openOrderModal(service)}
                      className="w-full text-white font-bold py-3 rounded-xl border-0 transition-all duration-300 relative overflow-hidden group/btn"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}, #ec4899)`,
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
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </div>
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
          className="max-w-4xl mx-auto mb-20"
        >
          <Card className="bg-gray-900/80 border-gray-800/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Need Something Custom?
              </CardTitle>
              <CardDescription className="text-gray-400">
                Have a unique project in mind? Let's discuss your custom requirements and create something amazing together.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
              >
                <Mail className="mr-2 h-5 w-5" />
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
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Client <span className="section-gradient-text">Testimonials</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See what my clients say about working with me
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <Card className="bg-gray-900/80 border-gray-800/50 backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                          />
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className="flex space-x-1 mr-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <Badge variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                                {testimonial.service}
                              </Badge>
                            </div>
                            <Quote className="h-6 w-6 text-gray-600 mb-3" />
                            <p className="text-gray-300 leading-relaxed mb-4">
                              "{testimonial.text}"
                            </p>
                            <div>
                              <p className="font-semibold text-white">{testimonial.name}</p>
                              <p className="text-sm text-gray-400">
                                {testimonial.role} at {testimonial.company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-900/80 border border-gray-700 hover:bg-gray-800 text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-900/80 border border-gray-700 hover:bg-gray-800 text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
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
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${selectedService.color}20` }}
                    >
                      <selectedService.icon 
                        className="h-6 w-6" 
                        style={{ color: selectedService.color }}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Order {selectedService.title}
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
                <div className="p-6">
                  <form onSubmit={handleOrderSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Your Name *
                        </label>
                        <Input
                          required
                          value={orderForm.name}
                          onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                          className="bg-white/5 border-white/10 text-white"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          required
                          value={orderForm.email}
                          onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                          className="bg-white/5 border-white/10 text-white"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Project Requirements *
                      </label>
                      <Textarea
                        required
                        value={orderForm.requirements}
                        onChange={(e) => setOrderForm({...orderForm, requirements: e.target.value})}
                        className="bg-white/5 border-white/10 text-white min-h-[120px]"
                        placeholder="Describe your project requirements, timeline, and any specific details..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Upload Reference Files (Optional)
                      </label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/30 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">
                          Drag & drop files here or click to browse
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Supports: PDF, DOC, PPT, Images (Max 10MB)
                        </p>
                      </div>
                    </div>

                    {/* Payment Options Preview */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Payment Options (Coming Soon)</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                          <div className="text-blue-400 font-semibold text-sm">PayPal</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                          <div className="text-purple-400 font-semibold text-sm">Stripe</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                          <div className="text-green-400 font-semibold text-sm">Bank Transfer</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={closeOrderModal}
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-white/5"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 text-white font-semibold"
                        style={{
                          background: `linear-gradient(135deg, ${selectedService.color}, #ec4899)`,
                        }}
                      >
                        Submit Order Request
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