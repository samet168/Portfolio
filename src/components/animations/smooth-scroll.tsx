'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScroll, useTransform, motion } from 'framer-motion';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Integrate with requestAnimationFrame
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}

// Custom hook for scroll progress
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return progress;
}

// Scroll progress indicator component
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-[100] origin-left"
      style={{ scaleX: progress }}
    />
  );
}

// Scroll-triggered animation wrapper
export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const variants = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants[direction]}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

// Parallax effect component
export function Parallax({ children, speed = 0.5 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}