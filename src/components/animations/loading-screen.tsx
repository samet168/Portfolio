'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setTimeout(onComplete, 500);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center dark:bg-background bg-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-8"
            >
              <div className="relative">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-500/30"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Inner ring */}
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-cyan-500/50"
                  animate={{
                    rotate: -360,
                    scale: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Center logo */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <motion.span
                    className="text-3xl font-bold text-white"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    MS
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Loading</span>
                <span className="font-semibold text-blue-500">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Loading text */}
            <motion.div
              className="mt-4 text-sm text-gray-600 dark:text-gray-400"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Building your experience...
            </motion.div>
          </div>

          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 0.8, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}