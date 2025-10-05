'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  MessageCircle,
  Calendar,
  CheckCircle,
  ExternalLink,
  X
} from 'lucide-react';
import { CuriosityTrigger } from '@/components/easter-egg/curiosity-trigger';
import { SocialButtons } from '@/components/ui/social-buttons';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Send me a message anytime',
    value: 'hello@deaneeth.dev',
    href: 'mailto:hello@deaneeth.dev',
    color: 'from-blue-500 to-purple-500'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Quick chat or voice call',
    value: '+94 77 123 4567',
    href: 'https://wa.me/94771234567',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Calendar,
    title: 'Schedule Call',
    description: '30-min discovery call',
    value: 'Book a meeting',
    href: '#',
    color: 'from-orange-500 to-red-500'
  }
];

const faqs = [
  {
   id: 1,
    question: 'What types of projects do you work on?',
    answer: 'I specialize in AI/ML solutions, intelligent automation, web applications, and technical consulting. From custom machine learning models to full-stack web apps.'
  },
  {
   id: 2,
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. Simple automation scripts take 1-2 weeks, while complex AI solutions can take 4-8 weeks. I always provide detailed timelines upfront.'
  },
  {
   id: 3,
    question: 'Do you work with international clients?',
    answer: 'Absolutely! I work with clients worldwide and am comfortable with different time zones. Most communication happens via email, Slack, or scheduled video calls.'
  },
  {
   id: 4,
    question: 'What are your rates?',
    answer: 'Rates depend on project scope and complexity. I offer both fixed-price projects and hourly consulting. Contact me for a custom quote based on your specific needs.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // Auto-close popup after 5 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  const toggleFaq = (faqId: number) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project description is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccessPopup(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: '',
      budget: '',
      message: '',
      timeline: ''
    });
    setErrors({});
  };

  return (
    <div className="space-y-12">
      {/* Success Popup Overlay */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSuccessPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative bg-card border border-border rounded-2xl shadow-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success Content */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <motion.button
                  onClick={() => setShowSuccessPopup(false)}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="page-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </motion.div>

        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-4 mt-6"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-500">Available for new projects</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Usually responds within 24 hours</span>
          </div>
        </motion.div>

        {/* Social Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-muted-foreground">Connect with me:</span>
          </div>
          <SocialButtons variant="horizontal" size="lg" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card magnetic"
            whileHover={{ y: -4 }}
            data-cursor-text="Fill Form"
          >
            <div className="card-header">
              <h2 className="card-title">Start a Project</h2>
              <p className="card-description">
                Tell me about your project and I'll get back to you with a detailed proposal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input transition-all ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    required
                    placeholder="Your full name"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input transition-all ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    required
                    placeholder="your@email.com"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <motion.input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input transition-all"
                    placeholder="Your company name"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Project Type *</label>
                  <motion.select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`form-input transition-all ${errors.projectType ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    required
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Select project type</option>
                    <option value="ai-ml">AI/ML Solution</option>
                    <option value="automation">Intelligent Automation</option>
                    <option value="web-app">Web Application</option>
                    <option value="consulting">Design & Consulting</option>
                    <option value="other">Other</option>
                  </motion.select>
                  {errors.projectType && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.projectType}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <motion.select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input transition-all"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-plus">$25,000+</option>
                    <option value="discuss">Let's discuss</option>
                  </motion.select>
                </div>
                <div className="form-group">
                  <label className="form-label">Timeline</label>
                  <motion.select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="form-input transition-all"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="flexible">Flexible</option>
                  </motion.select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Description *</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-input min-h-[140px] resize-vertical transition-all ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  required
                  placeholder="Tell me about your project, goals, and any specific requirements..."
                  rows={6}
                  whileFocus={{ scale: 1.005 }}
                />
                <div className="flex items-center justify-between mt-2">
                  {errors.message ? (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.message}
                    </motion.p>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {formData.message.length}/500 characters (min 20)
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Contact Info & FAQ */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card"
            whileHover={{ y: -4 }}
          >
            <h3 className="font-semibold mb-4">Other Ways to Reach Me</h3>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${method.color} bg-opacity-10`}>
                    <method.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {method.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {method.description}
                    </div>
                    <div className="text-sm text-primary">
                      {method.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Location & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card"
            whileHover={{ y: -4 }}
          >
            <h3 className="font-semibold mb-4">Location & Social</h3>
            
            <div className="flex items-center gap-3 mb-4 p-3 bg-muted/30 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">Sri Lanka</div>
                <div className="text-sm text-muted-foreground">GMT+5:30 timezone</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Follow me on</h4>
              <SocialButtons variant="horizontal" size="md" />
            </div>
          </motion.div>

          {/* Ask ARIA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20"
            whileHover={{ y: -4 }}
          >
            <h3 className="font-semibold mb-2">Quick Questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ask ARIA, my AI assistant, anything about my work, skills, or experience.
            </p>
            <CuriosityTrigger triggerType="main" />
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="card"
            whileHover={{ y: -4 }}
          >
            <h3 className="font-semibold mb-4">Frequently Asked</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
               <motion.div
                 key={faq.id} 
                  className="group"
                  whileHover={{ x: 2 }}
                >
                 <button 
                   onClick={() => toggleFaq(faq.id)}
                   className="w-full text-left font-medium cursor-pointer hover:text-primary transition-colors flex items-center justify-between"
                 >
                    {faq.question}
                   <motion.span
                     animate={{ rotate: openFaqId === faq.id ? 180 : 0 }}
                     transition={{ duration: 0.2 }}
                     className="text-muted-foreground"
                   >
                     ▼
                   </motion.span>
                 </button>
                 <motion.div
                   initial={false}
                   animate={{ 
                     height: openFaqId === faq.id ? 'auto' : 0,
                     opacity: openFaqId === faq.id ? 1 : 0
                   }}
                   transition={{ duration: 0.3, ease: 'easeInOut' }}
                   className="overflow-hidden"
                 >
                   <p className="text-sm text-muted-foreground mt-2 leading-relaxed pb-2">
                     {faq.answer}
                   </p>
                 </motion.div>
               </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}