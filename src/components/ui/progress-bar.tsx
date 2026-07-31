'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const variants = {
  default: 'bg-blue-500',
  gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
};

const sizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    variant = 'gradient', 
    size = 'md', 
    showLabel = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className={cn('w-full rounded-full bg-gray-200 dark:bg-gray-800', sizes[size])}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={cn('h-full rounded-full', variants[variant], sizes[size])}
          />
        </div>
        {showLabel && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';