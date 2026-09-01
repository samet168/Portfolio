'use client';

import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 overflow-hidden bg-background" />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 transition-opacity duration-1000 bg-gradient-aurora-dark dark:bg-gradient-aurora-dark bg-gradient-aurora-light" />

      {/* Animated mesh gradient - GPU accelerated */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob transform-gpu will-change-transform" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 transform-gpu will-change-transform" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000 transform-gpu will-change-transform" />
      </div>

      {/* Grid pattern - static SVG, no animation */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Subtle glow - CSS animation only */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent animate-pulse-slow" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
