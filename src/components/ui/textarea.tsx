'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'glass';
  error?: boolean;
}

const variants = {
  default: 'bg-white dark:bg-surface border-gray-300 dark:border-gray-700',
  glass: 'glass border-white/20',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-lg border px-4 py-3 text-base transition-all duration-300',
          'placeholder:text-gray-400 focus:outline-none focus:ring-2',
          'focus:ring-blue-500 focus:border-transparent resize-none',
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

Textarea.displayName = 'Textarea';