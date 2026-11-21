'use client';

import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';

interface PerformanceModeProps {
  children: React.ReactNode;
}

/** Reduce expensive motion and visual effects on small or constrained devices. */
export function PerformanceMode({ children }: PerformanceModeProps) {
  const [lowPerformance, setLowPerformance] = useState(false);

  useEffect(() => {
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    const smallTouchDevice =
      window.matchMedia('(pointer: coarse)').matches &&
      window.matchMedia('(max-width: 767px)').matches;

    const shouldReduceEffects =
      smallTouchDevice ||
      (memory !== undefined && memory <= 4) ||
      (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) ||
      connection?.saveData === true;

    setLowPerformance(shouldReduceEffects);
    if (shouldReduceEffects) {
      document.documentElement.dataset.performance = 'low';
    }

    return () => {
      delete document.documentElement.dataset.performance;
    };
  }, []);

  return (
    <MotionConfig reducedMotion={lowPerformance ? 'always' : 'user'}>
      {children}
    </MotionConfig>
  );
}
