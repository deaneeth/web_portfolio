'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Facebook, Twitter, Mail, MapPin, Search } from 'lucide-react';
import { ScrollingBanner } from './scrolling-banner';
import { CuriosityTrigger } from '@/components/easter-egg/curiosity-trigger';
import { 
  contactInfo, 
  navigationLinks, 
  legalLinks, 
  socialLinks, 
  copyrightText 
} from '@/data/global/footerData';

// Social icon mapping
const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter,
};

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const ariaButtonRef = useRef<HTMLDivElement>(null);

  // Function to trigger CuriosityTrigger modal
  const handleARIAClick = () => {
    // Find and click the hidden CuriosityTrigger button
    const button = ariaButtonRef.current?.querySelector('button');
    if (button) {
      button.click();
    }
  };

  return (
    <footer className="w-full mt-24 md:mt-32" role="contentinfo">
      {/* Hidden CuriosityTrigger component - only hide the button, not the modal */}
      <div ref={ariaButtonRef} className="[&>button]:hidden">
        <CuriosityTrigger triggerType="main" />
      </div>

      {/* Scrolling Banner */}
      <ScrollingBanner />

      {/* Main Footer Content */}
      <div className="w-full bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 pb-1 md:pb-2">
          {/* Three-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            
            {/* Column 1: Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">
                Contact Info
              </h3>
              
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 text-primary/70 mt-1 group-hover:text-primary transition-colors" />
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {contactInfo.address}
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/30">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">
                Navigation
              </h3>
              
              <nav className="space-y-3" aria-label="Footer navigation">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="block relative group"
                  >
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                      {link.name}
                    </span>
                    
                    {/* Underline reveal animation */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredLink === link.name ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 origin-left"
                    />
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Column 3: Social Links & ARIA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">
                Connect
              </h3>
              
              {/* Social Icons */}
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                  
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      aria-label={`Visit ${social.name} profile`}
                    >
                      <div 
                        className="w-12 h-12 bg-muted/30 hover:bg-muted/50 border border-border rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          boxShadow: 'none',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 8px 32px ${social.color}40`;
                          e.currentTarget.style.borderColor = `${social.color}60`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = 'hsl(var(--border))';
                        }}
                      >
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* ARIA Curiosity Trigger Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 border border-primary/30 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group"
                style={{
                  boxShadow: '0 4px 24px hsl(var(--primary) / 0.15)',
                }}
                onClick={handleARIAClick}
                aria-label="Open ARIA curiosity modal"
              >
                <Search className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium text-primary">Ask ARIA</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Horizontal Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground/70">
              {copyrightText}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
