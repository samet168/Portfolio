'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 transition-opacity duration-1000 bg-gradient-aurora-dark dark:bg-gradient-aurora-dark bg-gradient-aurora-light" />

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/50 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            }}
            animate={{
              y: [null, typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Grid animation */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Moving lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            initial={{ x: '-100%', width: '200%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
            style={{
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Dynamic glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}