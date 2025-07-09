'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  Home,
  FolderOpen,
  Briefcase,
  Trophy,
  Mail,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  Circle
} from 'lucide-react';

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
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    // Remove auto-refresh - only update on mount
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
          D
        </div>
        {!isCollapsed && (
          <div className="profile-info">
            <h3>Deaneeth</h3>
            <p>AI/ML Explorer</p>
            <div className="status-badge">
              <div className="status-dot"></div>
              <span>Open for Work</span>
            </div>
          </div>
        )}
      </motion.div>

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

      {/* Static Local Time */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-auto p-4 bg-muted/30 rounded-lg text-center"
        >
          <div className="text-xs text-muted-foreground mb-1">Local Time</div>
          <div className="text-sm font-mono text-foreground">{currentTime}</div>
        </motion.div>
      )}

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
          <SidebarContent />
          
          {/* Minimal Collapse Button - Positioned at sidebar edge */}
          <motion.button
            onClick={toggleSidebar}
            className="absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 z-20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="w-4 h-4 text-white/80" />
            </motion.div>
          </motion.button>
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
          <div className="flex items-center gap-3">
            <div className="profile-avatar w-8 h-8 text-sm">
              D
            </div>
            <h2 className="font-semibold">Navigation</h2>
          </div>
          <button
            onClick={closeMobileSidebar}
            className="p-2 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Close navigation"
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
            className="p-2 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Open navigation menu"
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