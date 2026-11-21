'use client';

import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 overflow-hidden bg-[#090909]" />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#090909]">
      {/* Subtle neutral ambient lighting; keep the base monochrome and low-cost. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.07),_transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
        <svg className="w-full h-full" aria-hidden="true">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}
