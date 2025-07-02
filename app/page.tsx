'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero-section';
import { TrustedSection } from '@/components/sections/trusted-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ContentHubSection } from '@/components/sections/content-hub-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TrustedSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <ContentHubSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}