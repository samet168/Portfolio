'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  asChild?: boolean;
}

const variants = {
  primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-glow',
  secondary: 'bg-white/10 text-white hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10',
  glass: 'glass text-white hover:bg-white/20',
  outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  ghost: 'text-white hover:bg-white/10',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...(props as any)}
      >
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </motion.div>
        )}
        <span className={isLoading ? 'invisible' : ''}>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';