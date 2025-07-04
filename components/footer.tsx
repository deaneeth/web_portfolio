'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Code, 
  Coffee, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Send,
  ExternalLink,
  Zap,
  ArrowUp,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com',
    color: '#ffffff',
    hoverColor: '#f97316'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com',
    color: '#0077b5',
    hoverColor: '#0077b5'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com',
    color: '#1da1f2',
    hoverColor: '#1da1f2'
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:dineth@example.com',
    color: '#ea4335',
    hoverColor: '#ea4335'
  }
];

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Use', href: '/terms' }
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to play subtle notification sound
  const playNotificationSound = () => {
    try {
      // Create a subtle, pleasant notification sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillators for a pleasant chord
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const oscillator3 = audioContext.createOscillator();
      
      const gainNode = audioContext.createGain();
      
      // Set frequencies for a pleasant C major chord
      oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
      oscillator3.frequency.setValueAtTime(783.99, audioContext.currentTime); // G5
      
      // Use sine waves for a soft sound
      oscillator1.type = 'sine';
      oscillator2.type = 'sine';
      oscillator3.type = 'sine';
      
      // Connect oscillators to gain node
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      oscillator3.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set volume (very subtle)
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      
      // Start and stop the sound
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator3.start(audioContext.currentTime);
      
      oscillator1.stop(audioContext.currentTime + 0.8);
      oscillator2.stop(audioContext.currentTime + 0.8);
      oscillator3.stop(audioContext.currentTime + 0.8);
      
    } catch (error) {
      // Fallback: try to use a simple beep if Web Audio API fails
      console.log('🎵 Easter egg sound would play here!');
    }
  };

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thanks for reaching out! I\'ll get back to you soon.');
      setEmail('');
    }
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      toast.success('Welcome aboard! You\'re now subscribed to updates.');
      setNewsletterEmail('');
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEasterEgg = () => {
    const newCount = easterEggClicks + 1;
    setEasterEggClicks(newCount);
    
    if (newCount === 5) {
      setShowEasterEgg(true);
      playNotificationSound(); // Play sound when easter egg appears
      setTimeout(() => setShowEasterEgg(false), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const socialIconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { scale: 0.95 }
  };

  return (
    <footer ref={footerRef} className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.03, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-black text-white leading-none tracking-tighter"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 0 100px rgba(255, 255, 255, 0.1)'
          }}
        >
          deaneeth
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & CTA Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Brand */}
            <div>
              <motion.div
                className="flex items-center space-x-3 mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="avatar-gradient-bg w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold navbar-gradient-text">Deaneeth</h3>
                  <p className="text-gray-400 text-sm">AI/ML Explorer & Creative Technologist</p>
                </div>
              </motion.div>
              
              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6"
              >
                <h4 className="text-xl font-semibold text-white mb-2">Let's collaborate!</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Available for new projects and exciting opportunities
                </p>
                <motion.div
                  className="inline-flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors cursor-pointer group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleNavClick('#contact')}
                >
                  <Zap className="h-4 w-4" />
                  <span className="font-medium">Get in touch</span>
                  <motion.div
                    className="w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Quick Contact Form */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick message</h4>
              <form onSubmit={handleQuickContact} className="flex gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-teal-500/50 focus:ring-teal-500/20"
                  required
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 transition-all duration-300"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-gray-400 hover:text-white text-left text-sm transition-colors duration-200 group relative"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 w-0 group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-4">
                No spam, just good stuff about AI, tech, and creativity
              </p>
              <form onSubmit={handleNewsletterSignup} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-teal-500/50 focus:ring-teal-500/20"
                  required
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 transition-all duration-300"
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    variants={socialIconVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    style={{
                      boxShadow: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 8px 32px ${social.hoverColor}40`;
                      e.currentTarget.style.borderColor = `${social.hoverColor}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <social.icon 
                      className="h-5 w-5 transition-colors duration-300" 
                      style={{ color: social.color }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800/50 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright & Credits */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span>© 2025 Deaneeth. All rights reserved.</span>
                <motion.div
                  className="cursor-pointer"
                  onClick={handleEasterEgg}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="h-4 w-4 text-red-500" />
                </motion.div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <span>Built with</span>
                  <Code className="h-3 w-3 text-blue-400" />
                  <span>Next.js & Tailwind</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Coffee className="h-3 w-3 text-amber-500" />
                  <span>Fueled by curiosity</span>
                </div>
              </div>
            </div>

            {/* Legal Links & Theme Toggle */}
            <div className="flex items-center space-x-6">
              {/* Legal Links */}
              <div className="flex items-center space-x-4">
                {legalLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-white text-xs transition-colors duration-200 relative group"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-teal-400 w-0 group-hover:w-full transition-all duration-300"
                    />
                  </motion.a>
                ))}
              </div>

              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Sun className="h-4 w-4 text-yellow-400" />
                  )}
                </motion.button>
              )}

              {/* Scroll to Top */}
              <motion.button
                onClick={scrollToTop}
                className="p-2 bg-gradient-to-r from-teal-500 to-purple-500 rounded-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp className="h-4 w-4 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Easter Egg - Custom Motion Popup (Black Theme) */}
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={showEasterEgg ? { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
              type: "spring",
              damping: 15,
              stiffness: 300
            }
          } : { 
            opacity: 0, 
            scale: 0, 
            y: 50 
          }}
          className="fixed bottom-4 right-4 bg-gray-900/95 border border-gray-800/50 backdrop-blur-md text-white p-4 rounded-xl shadow-2xl z-50 max-w-sm"
          style={{
            boxShadow: '0 20px 60px rgba(20, 184, 166, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: -20, opacity: 0 }}
            animate={showEasterEgg ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.div
              animate={showEasterEgg ? { 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ 
                duration: 0.6,
                repeat: 2,
                delay: 0.3
              }}
            >
              🎉
            </motion.div>
            <div>
              <div className="font-semibold text-sm text-white">You found the easter egg!</div>
              <div className="text-xs text-gray-400">ADHD-powered curiosity strikes again!</div>
            </div>
            <motion.div
              animate={showEasterEgg ? { 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              } : {}}
              transition={{ 
                duration: 1,
                repeat: 1,
                delay: 0.5
              }}
            >
              <Zap className="h-5 w-5 text-teal-400" />
            </motion.div>
          </motion.div>
          
          {/* Subtle animated border */}
          <motion.div
            className="absolute inset-0 rounded-xl border border-teal-500/30"
            animate={showEasterEgg ? {
              opacity: [0.3, 0.8, 0.3],
            } : { opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </footer>
  );
}