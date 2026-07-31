'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 400);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center dark:bg-background bg-white transition-opacity duration-400 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
            <span className="text-2xl font-bold text-white">MS</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-56">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Loading</span>
            <span className="font-semibold text-blue-500">{Math.min(Math.round(progress), 100)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-100 ease-out rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
