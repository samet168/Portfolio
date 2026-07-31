'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const followerX = useSpring(mouseX, { damping: 40, stiffness: 600 });
  const followerY = useSpring(mouseY, { damping: 40, stiffness: 600 });

  const trailX = useSpring(mouseX, { damping: 50, stiffness: 500 });
  const trailY = useSpring(mouseY, { damping: 50, stiffness: 500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Cursor dot */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full" />

          {/* Cursor glow */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500/30 rounded-full blur-md"
            animate={{
              scale: isHovering ? 2 : 1,
              opacity: isHovering ? 0.6 : 0.3,
            }}
          />

          {/* Outer ring */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-blue-500/50 rounded-full"
            animate={{
              scale: isHovering ? 1.5 : 1,
              borderColor: isHovering ? 'rgba(0, 140, 255, 0.8)' : 'rgba(0, 140, 255, 0.5)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Follower cursor */}
      <motion.div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] hidden md:block"
        style={{
          x: followerX,
          y: followerY,
        }}
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-cyan-500/30"
          animate={{
            scale: isHovering ? 1.2 : 1,
          }}
        />
      </motion.div>

      {/* Trail effect */}
      <motion.div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9996] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
        }}
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-xl"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
        />
      </motion.div>
    </>
  );
}