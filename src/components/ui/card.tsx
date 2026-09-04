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
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 ease-out',
          variants[variant],
          hover && 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-500/30',
          className
        )}
        {...(props as any)}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';