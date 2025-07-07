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
  BookOpen,
  Trophy,
  Code,
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
      { name: 'Content Hub', href: '/content', icon: BookOpen },
    ]
  },
  {
    section: 'Profile',
    items: [
      { name: 'Achievement Wall', href: '/achievements', icon: Trophy },
      { name: 'Technical Skills', href: '/skills', icon: Code },
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
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
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

      {/* Local Time */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="local-time"
        >
          <div>Local Time</div>
          <div>{currentTime}</div>
        </motion.div>
      )}
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className={`dashboard-layout ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} hidden lg:block`}>
        <div className="relative">
          <SidebarContent />
          
          {/* Collapse Button */}
          <button
            onClick={toggleSidebar}
            className="collapse-btn focus-ring"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </button>
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

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="theme-toggle focus-ring"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}