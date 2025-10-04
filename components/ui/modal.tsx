'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  showCloseButton?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
};

export function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = '2xl',
  showCloseButton = true,
}: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Full Screen Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
            style={{ margin: 0, padding: 0 }}
          />

          {/* Modal Container - Centered Wrapper */}
          <div 
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[101] flex items-center justify-center p-4 pointer-events-none overflow-y-auto"
            style={{ margin: 0, padding: '1rem' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`w-full ${maxWidthClasses[maxWidth]} pointer-events-auto my-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-card border border-border rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Close Button (positioned inside modal content) */}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 hover:bg-muted rounded-lg transition-colors bg-card/80 backdrop-blur-sm"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                
                {/* Modal Content */}
                <div className="relative">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
