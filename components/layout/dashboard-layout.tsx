'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Chrome as Home, FolderOpen, Briefcase, Trophy, Mail, ChevronLeft, ChevronRight, Menu, X, Sun, Moon, Circle, BookOpen } from 'lucide-react';
import { SearchBar } from '@/components/search/search-bar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    section: 'Main',
    items: [
      { name: 'Homepage', href: '/', icon: Home }, 
      { name: 'Featured Work', href: '/work', icon: FolderOpen },
      { name: 'Creative Services', href: '/services', icon: Briefcase },
      { name: 'Articles', href: '/articles', icon: BookOpen },
    ]
  },
  {
    section: 'Profile',
    items: [
      { name: 'Achievement Wall', href: '/achievements', icon: Trophy },
      { name: 'Get in Touch', href: '/contact', icon: Mail },
    ]
  }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const SidebarContent = () => (
    <div className="sidebar-content">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="profile-section"
      >
        <div className="profile-avatar">
          <img
            src="/image.png"
            alt="Deaneeth"
            className="profile-image"
          />
        </div>
        {!isCollapsed && (
          <div className="profile-info">
            <h3>Deaneeth</h3>
            <p>AI/ML Explorer</p>
          </div>
        )}
      </motion.div>

      {/* Status Badge - Separate from profile */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="status-badge-container"
        >
          <div className="status-badge">
            <div className="status-dot"></div>
            <span>Open for Work</span>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1">
        {navigationItems.map((section, sectionIndex) => (
          <div key={section.section} className="nav-section">
            {!isCollapsed && (
              <h4>{section.section}</h4>
            )}
            {section.items.map((item, itemIndex) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: (sectionIndex * 0.1) + (itemIndex * 0.05) 
                }}
              >
                <Link
                  href={item.href}
                  className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                  onClick={closeMobileSidebar}
                >
                  <item.icon className="nav-item-icon" />
                  {!isCollapsed && <span className="sidebar-text">{item.name}</span>}
                </Link>
              </motion.div>
            ))}
          </div>
        ))}
      </nav>

      {/* Search Bar */}
      <SearchBar isCollapsed={isCollapsed} />

      {/* Theme Toggle in Sidebar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-4"
      >
        {mounted && (
          <button
            onClick={toggleTheme}
            className="w-full p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-4 w-4" />
                {!isCollapsed && <span className="text-sm">Dark Mode</span>}
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                {!isCollapsed && <span className="text-sm">Light Mode</span>}
              </>
            )}
          </button>
        )}
      </motion.div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className={`dashboard-layout ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} hidden lg:block`}>
        <div className="relative h-full">
          {/* Collapse Button - Fixed at top */}
          <button
            onClick={toggleSidebar}
            className="collapse-btn focus-ring"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
          
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`mobile-sidebar-overlay lg:hidden ${isMobileSidebarOpen ? 'open' : ''}`}
        onClick={closeMobileSidebar}
      />

      {/* Mobile Sidebar */}
      <aside className={`mobile-sidebar lg:hidden ${isMobileSidebarOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold">Navigation</h2>
          <button
            onClick={closeMobileSidebar}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <button
            onClick={toggleMobileSidebar}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Circle className="w-2 h-2 fill-green-500 text-green-500" />
            <span className="text-sm text-muted-foreground">Open for Work</span>
          </div>
        </div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="animate-fade-in"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}