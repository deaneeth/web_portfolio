'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Facebook } from 'lucide-react';
import { Twitter } from 'lucide-react'; // X (Twitter) icon

interface SocialButtonsProps {
  variant?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/deaneeth',
    color: '#333',
    hoverColor: '#000',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/deaneeth',
    color: '#0077b5',
    hoverColor: '#005885',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com/deaneeth',
    color: '#1877f2',
    hoverColor: '#0d65d9',
  },
  {
    name: 'X',
    icon: Twitter,
    href: 'https://x.com/deaneeth_',
    color: '#000000',
    hoverColor: '#1a1a1a',
  },
  {
    name: 'Medium',
    icon: ExternalLink,
    href: 'https://medium.com/@deaneeth',
    color: '#00ab6c',
    hoverColor: '#007a4d',
  },
];

export function SocialButtons({ 
  variant = 'horizontal', 
  size = 'md',
  className = '' 
}: SocialButtonsProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`flex ${variant === 'horizontal' ? 'flex-row space-x-3' : 'flex-col space-y-3'} ${className}`}>
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${sizeClasses[size]} bg-muted/30 hover:bg-muted/50 border border-border rounded-xl flex items-center justify-center transition-all duration-300 group magnetic`}
          whileHover={{ 
            scale: 1.1,
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          data-cursor-text={social.name}
          style={{
            boxShadow: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 32px ${social.hoverColor}40`;
            e.currentTarget.style.borderColor = `${social.hoverColor}60`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'hsl(var(--border))';
          }}
          aria-label={`Visit ${social.name} profile`}
        >
          <social.icon 
            className={`${iconSizes[size]} transition-colors duration-300 text-muted-foreground group-hover:text-foreground`}
          />
        </motion.a>
      ))}
    </div>
  );
}