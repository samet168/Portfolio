'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

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
          setIsExiting(true);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + Math.random() * 25 + 15;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center dark:bg-[rgb(2,6,23)] bg-white transition-opacity duration-200 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo Avatar */}
        <div className="mb-6 relative">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60 blur-md animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full p-[3px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 shadow-xl shadow-blue-500/30">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
              <Image
                src="/images/hero/profile.jpg"
                alt="Moeun Samet"
                fill
                sizes="80px"
                className="object-cover"
                priority
                loading="eager"
              />
            </div>
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
