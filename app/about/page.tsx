'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, User, Brain, Cpu, Cloud, Database, Code2, Zap, Box, Activity, GitBranch, BarChart3, LineChart, TrendingUp, Server, Layers, Boxes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ExperienceSection from '@/components/sections/experience-section';

// Skills data organized by category
const skillsData = {
  aiMl: [
    { name: 'Python', icon: Code2 },
    { name: 'TensorFlow', icon: Brain },
    { name: 'PyTorch', icon: Brain },
    { name: 'Scikit-learn', icon: Brain },
    { name: 'Pandas', icon: Database },
    { name: 'NumPy', icon: Database },
    { name: 'OpenCV', icon: Activity },
    { name: 'Hugging Face', icon: Brain },
  ],
  roboticsIot: [
    { name: 'ROS', icon: Cpu },
    { name: 'Arduino', icon: Cpu },
    { name: 'Raspberry Pi', icon: Cpu },
    { name: 'ESP32', icon: Zap },
    { name: 'MQTT', icon: Activity },
    { name: 'Firebase', icon: Cloud },
    { name: 'Embedded C', icon: Code2 },
  ],
  cloudTools: [
    { name: 'Google Cloud AI', icon: Cloud },
    { name: 'AWS IoT Core', icon: Cloud },
    { name: 'Azure ML', icon: Cloud },
    { name: 'Docker', icon: Box },
    { name: 'Git & GitHub', icon: GitBranch },
  ],
  dataViz: [
    { name: 'Power BI', icon: BarChart3 },
    { name: 'Tableau', icon: LineChart },
    { name: 'Matplotlib', icon: TrendingUp },
    { name: 'Plotly', icon: BarChart3 },
    { name: 'SQL', icon: Database },
  ],
};

// Combine all skills for the carousel rows
const allSkills = [
  ...skillsData.aiMl,
  ...skillsData.roboticsIot,
  ...skillsData.cloudTools,
  ...skillsData.dataViz,
];

// Create three rows with different skills distribution
const row1Skills = [...allSkills.slice(0, 10), ...allSkills.slice(0, 10)]; // Duplicate for seamless loop
const row2Skills = [...allSkills.slice(10, 20), ...allSkills.slice(10, 20)];
const row3Skills = [...allSkills.slice(20), ...allSkills.slice(0, 5), ...allSkills.slice(20), ...allSkills.slice(0, 5)];

export default function AboutPage() {
  const [imageError, setImageError] = useState(false);
  const [isRow1Hovered, setIsRow1Hovered] = useState(false);
  const [isRow2Hovered, setIsRow2Hovered] = useState(false);
  const [isRow3Hovered, setIsRow3Hovered] = useState(false);
  
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

      {/* My Skills Section with Animated Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full py-12"
      >
        {/* Section Title */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">My Skills</h2>
            <p className="text-base text-muted-foreground">Technologies & tools I work with</p>
          </motion.div>
        </div>

        {/* Carousel Rows Container */}
        <div className="space-y-6 relative">
          {/* Row 1 - Scrolls Left to Right */}
          <div className="relative overflow-hidden">
            {/* Left Edge Gradient Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            
            {/* Right Edge Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div 
              className="flex gap-4"
              onMouseEnter={() => setIsRow1Hovered(true)}
              onMouseLeave={() => setIsRow1Hovered(false)}
            >
              <motion.div
                className="flex gap-4 shrink-0"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  x: {
                    duration: isRow1Hovered ? 120 : 60,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  },
                }}
              >
                {[...row1Skills, ...row1Skills].map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={`row1-${index}`}
                      className="flex items-center gap-3 px-5 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full hover:border-primary/50 hover:bg-card/80 transition-all duration-300 whitespace-nowrap cursor-pointer"
                    >
                      <IconComponent className="w-5 h-5 text-primary hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Row 2 - Scrolls Right to Left */}
          <div className="relative overflow-hidden">
            {/* Left Edge Gradient Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            
            {/* Right Edge Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div 
              className="flex gap-4"
              onMouseEnter={() => setIsRow2Hovered(true)}
              onMouseLeave={() => setIsRow2Hovered(false)}
            >
              <motion.div
                className="flex gap-4 shrink-0"
                animate={{
                  x: ['-50%', '0%'],
                }}
                transition={{
                  x: {
                    duration: isRow2Hovered ? 100 : 50,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  },
                }}
              >
                {[...row2Skills, ...row2Skills].map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={`row2-${index}`}
                      className="flex items-center gap-3 px-5 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full hover:border-primary/50 hover:bg-card/80 transition-all duration-300 whitespace-nowrap cursor-pointer"
                    >
                      <IconComponent className="w-5 h-5 text-primary hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Row 3 - Scrolls Left to Right */}
          <div className="relative overflow-hidden">
            {/* Left Edge Gradient Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            
            {/* Right Edge Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div 
              className="flex gap-4"
              onMouseEnter={() => setIsRow3Hovered(true)}
              onMouseLeave={() => setIsRow3Hovered(false)}
            >
              <motion.div
                className="flex gap-4 shrink-0"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  x: {
                    duration: isRow3Hovered ? 110 : 55,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  },
                }}
              >
                {[...row3Skills, ...row3Skills].map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={`row3-${index}`}
                      className="flex items-center gap-3 px-5 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full hover:border-primary/50 hover:bg-card/80 transition-all duration-300 whitespace-nowrap cursor-pointer"
                    >
                      <IconComponent className="w-5 h-5 text-primary hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Experience Section */}
      <ExperienceSection />
    </div>
  );
}
