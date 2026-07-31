'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'gradient';
  hover?: boolean;
  tilt?: boolean;
}

const variants = {
  glass: 'glass',
  solid: 'bg-white dark:bg-surface border border-gray-200 dark:border-gray-800',
  gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', hover = true, tilt = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl p-6 backdrop-blur-xl',
          variants[variant],
          hover && 'transition-all duration-300 hover:shadow-glow hover:scale-[1.02]',
          className
        )}
        whileHover={tilt ? { rotateX: 5, rotateY: 5 } : undefined}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';