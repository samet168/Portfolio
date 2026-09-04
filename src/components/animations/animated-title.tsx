'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
}

// Unicode grapheme safe splitter for Khmer & English
function splitGraphemes(str: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new (Intl as unknown as {
      Segmenter: new (locale: string, opts: { granularity: string }) => {
        segment: (text: string) => Iterable<{ segment: string }>;
      };
    }).Segmenter('km', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str), (s: { segment: string }) => s.segment);
  }
  return str.split('');
}

export function AnimatedTitle({
  text,
  className = '',
  delay = 0.1,
  staggerDelay = 0.04,
  as: Component = 'h2',
}: AnimatedTextProps) {
  const words = (text || '').split(' ');
  let globalIndex = 0;

  return (
    <Component className={`inline-flex flex-wrap gap-x-2 sm:gap-x-3 select-none ${className}`}>
      {words.map((word, wordIdx) => {
        const characters = splitGraphemes(word);
        return (
          <span key={wordIdx} className="inline-flex overflow-visible">
            {characters.map((char) => {
              const currentIdx = globalIndex++;
              return (
                <motion.span
                  key={currentIdx}
                  initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: delay + currentIdx * staggerDelay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.15,
                    transition: { type: 'spring', stiffness: 400, damping: 12 },
                  }}
                  className="inline-block cursor-default will-change-transform"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
}
