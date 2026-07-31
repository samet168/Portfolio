'use client';

import { useState, useEffect } from 'react';
import { CustomCursor } from '@/components/animations/cursor';
import { AnimatedBackground } from '@/components/animations/animated-background';
import { LoadingScreen } from '@/components/animations/loading-screen';
import { SmoothScroll, ScrollProgress } from '@/components/animations/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Set a minimum loading time for the animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Smooth Scroll */}
        <SmoothScroll>
          {/* Scroll Progress Indicator */}
          <ScrollProgress />

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Services />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}