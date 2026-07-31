'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const variants = {
  success: 'border-green-500/50 bg-green-50 dark:bg-green-900/20',
  error: 'border-red-500/50 bg-red-50 dark:bg-red-900/20',
  info: 'border-blue-500/50 bg-blue-50 dark:bg-blue-900/20',
};

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={cn(
            'fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-xl',
            variants[type]
          )}
          {...({} as any)}
        >
          {icons[type]}
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="ml-2 rounded-full p-1 hover:bg-black/10 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}