'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function AboutPage() {
  const [imageError, setImageError] = useState(false);
  
  const handleDownloadResume = () => {
    // Trigger download of resume PDF
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf';
    link.download = 'Dineth_Hettiarachchi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="page-title">About Me</h1>
          </div>
          <p className="page-subtitle">
            AI & Machine Learning Engineer | Full Stack Developer | IoT Enthusiast
          </p>
        </motion.div>
      </div>

      {/* Introduction Section - No Background Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Name and Title */}
            <div className="space-y-3">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-foreground"
              >
                Dineth Hettiarachchi
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl text-muted-foreground font-medium"
              >
                AI & Machine Learning Engineer
              </motion.p>
            </div>

            {/* Introduction Paragraph Only */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-base text-muted-foreground leading-relaxed">
                I'm Dineth, an AI & Machine Learning engineer and full-stack developer from Sri Lanka with over 3 years of experience 
                focusing on artificial intelligence, machine learning applications, and IoT systems. I specialize in creating intelligent 
                solutions that bridge the gap between cutting-edge technology and real-world applications.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                My expertise spans across deep learning, computer vision, natural language processing, and building scalable web applications. 
                I'm passionate about leveraging AI to solve complex problems and create user-centered solutions in SaaS products.
              </p>
            </motion.div>

            {/* Download Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-2"
            >
              <Button
                onClick={handleDownloadResume}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 group"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Profile Image with Square Rounded Corners */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
            >
              {/* Animated Rotating Gradient Background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-3xl opacity-70"
                animate={{ 
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Image Container - Wider with Rounded Corners */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[26rem] lg:h-[28rem] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-border/50 backdrop-blur-sm">
                {!imageError ? (
                  <Image
                    src="/assets/pfimg.png"
                    alt="Dineth Hettiarachchi"
                    fill
                    className="object-cover object-center"
                    priority
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
                    <User className="w-32 h-32 text-primary/50" />
                  </div>
                )}
                
                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
