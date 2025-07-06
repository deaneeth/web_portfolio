'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { GridBackground } from '@/components/grid-background';
import { ScrollProgress } from '@/components/scroll-progress';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ContentHubSection } from '@/components/sections/content-hub-section';
import { AchievementsSection } from '@/components/sections/achievements-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <ScrollProgress />
      <Navigation />
      
      <main>
        {/* Hero Section - Pure Black Background */}
        <HeroSection />
        
        {/* All Other Sections - With Grid Background */}
        <GridBackground>
          <AboutSection />
          <ProjectsSection />
          <ServicesSection />
          <ContentHubSection />
          <AchievementsSection />
          <SkillsSection />
          <ContactSection />
        </GridBackground>
      </main>
      
      <GridBackground>
        <Footer />
      </GridBackground>
    </div>
  );
}