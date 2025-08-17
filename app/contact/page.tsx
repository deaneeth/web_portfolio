'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  ExternalLink
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
    question: 'What types of projects do you work on?',
    answer: 'I specialize in AI/ML solutions, intelligent automation, web applications, and technical consulting. From custom machine learning models to full-stack web apps.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. Simple automation scripts take 1-2 weeks, while complex AI solutions can take 4-8 weeks. I always provide detailed timelines upfront.'
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Absolutely! I work with clients worldwide and am comfortable with different time zones. Most communication happens via email, Slack, or scheduled video calls.'
  },
  {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: '',
      budget: '',
      message: '',
      timeline: ''
    });
  };

  return (
    <div className="space-y-12">
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

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input magnetic"
                      required
                      placeholder="Your full name"
                      data-cursor-text="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input magnetic"
                      required
                      placeholder="your@email.com"
                      data-cursor-text="Email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input magnetic"
                      placeholder="Your company name"
                      data-cursor-text="Company"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project Type *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-input magnetic"
                      required
                      data-cursor-text="Select Type"
                    >
                      <option value="">Select project type</option>
                      <option value="ai-ml">AI/ML Solution</option>
                      <option value="automation">Intelligent Automation</option>
                      <option value="web-app">Web Application</option>
                      <option value="consulting">Design & Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="form-input magnetic"
                      data-cursor-text="Select Budget"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-plus">$25,000+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="form-input magnetic"
                      data-cursor-text="Select Timeline"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Description *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input form-textarea magnetic"
                    required
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                    rows={6}
                    data-cursor-text="Describe Project"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full magnetic"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor-text="Send Message"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Contact Info & FAQ */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card magnetic"
            whileHover={{ y: -4 }}
            data-cursor-text="Contact Info"
          >
            <h3 className="font-semibold mb-4">Other Ways to Reach Me</h3>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group magnetic"
                  whileHover={{ x: 4 }}
                  data-cursor-text={method.title}
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
            className="card magnetic"
            whileHover={{ y: -4 }}
            data-cursor-text="Location"
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
            className="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 magnetic"
            whileHover={{ y: -4 }}
            data-cursor-text="Ask ARIA"
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
            className="card magnetic"
            whileHover={{ y: -4 }}
            data-cursor-text="FAQ"
          >
            <h3 className="font-semibold mb-4">Frequently Asked</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.details 
                  key={index} 
                  className="group magnetic"
                  whileHover={{ x: 2 }}
                  data-cursor-text="Expand"
                >
                  <summary className="font-medium cursor-pointer hover:text-primary transition-colors">
                    {faq.question}
                  </summary>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}