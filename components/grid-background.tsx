'use client';

import { useEffect, useRef } from 'react';

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GridBackground({ children, className = '' }: GridBackgroundProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      
      const rect = gridRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      gridRef.current.style.setProperty('--mouse-x', `${x}%`);
      gridRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    const element = gridRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div 
      ref={gridRef}
      className={`grid-background ${className}`}
    >
      {children}
    </div>
  );
}