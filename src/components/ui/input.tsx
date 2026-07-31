'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'glass';
  error?: boolean;
}

const variants = {
  default: 'bg-white dark:bg-surface border-gray-300 dark:border-gray-700',
  glass: 'glass border-white/20',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border px-4 py-3 text-base transition-all duration-300',
          'placeholder:text-gray-400 focus:outline-none focus:ring-2',
          'focus:ring-blue-500 focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';