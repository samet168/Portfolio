'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, Mail, Code2, Database, Globe, Layers, Monitor, ServerCog } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// SVG social icons
function GithubSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function FacebookSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

// Floating tech icons that orbit the profile image
const floatingIcons = [
  { icon: Code2, delay: 0, angle: 0 },
  { icon: Database, delay: 0.5, angle: 60 },
  { icon: Globe, delay: 1, angle: 120 },
  { icon: Layers, delay: 1.5, angle: 180 },
  { icon: Monitor, delay: 2, angle: 240 },
  { icon: ServerCog, delay: 2.5, angle: 300 },
];

export function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax transforms for different depths
  const imageX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-15, 15]);
  const iconX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const iconY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const stats = [
    { value: 3, label: t('hero.stats.experience') },
    { value: 5, label: t('hero.stats.projects') },
    { value: 15, label: t('hero.stats.technologies') },
    { value: 10, label: t('hero.stats.clients') },
  ];

  const socialLinks = [
    { icon: GithubSvg, href: 'https://github.com/samet168', label: 'GitHub' },
    { icon: LinkedinSvg, href: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
    { icon: FacebookSvg, href: 'https://web.facebook.com/samet.moeunsamet/', label: 'Facebook' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-500/[0.04] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan-500/[0.04] blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-2 lg:order-1"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-blue-500 font-medium tracking-wider uppercase text-sm">
                {t('hero.greeting')}
              </p>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              <span className="gradient-text">{t('hero.name')}</span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400"
            >
              <span className="font-semibold">{t('hero.title')}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('hero.cta')}
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                {t('hero.downloadCV')}
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Profile Image with effects */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-72 h-72 md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px]">
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, rgb(0,140,255), rgb(0,210,255), rgb(0,255,255), rgb(0,210,255), rgb(0,140,255))',
                  padding: '3px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-[rgb(2,6,23)]" />
              </motion.div>

              {/* Outer glow pulse */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl"
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Image container with parallax */}
              <motion.div
                className="absolute inset-[4px] rounded-full overflow-hidden border-2 border-white/10"
                style={{ x: imageX, y: imageY }}
              >
                <Image
                  src="/images/hero/profile.jpg"
                  alt="Moeun Samet - Full Stack Developer"
                  fill
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 360px, 420px"
                  className="object-cover"
                  priority
                />
                {/* Glass overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating tech icons with parallax */}
              <motion.div
                className="absolute inset-0"
                style={{ x: iconX, y: iconY }}
              >
                {floatingIcons.map((item, i) => {
                  const radius = 52; // percentage from center
                  const angleRad = (item.angle * Math.PI) / 180;
                  const x = 50 + radius * Math.cos(angleRad);
                  const y = 50 + radius * Math.sin(angleRad);

                  return (
                    <motion.div
                      key={i}
                      className="absolute w-10 h-10 rounded-xl bg-white/10 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center justify-center shadow-lg"
                      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                      transition={{
                        opacity: { delay: 1 + item.delay * 0.3 },
                        scale: { delay: 1 + item.delay * 0.3, type: 'spring' },
                        y: { delay: 1.5 + item.delay * 0.3, duration: 3, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    >
                      <item.icon className="w-4 h-4 text-blue-400" />
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-2 -right-2 md:top-2 md:right-0 glass rounded-2xl px-4 py-3 shadow-lg border border-white/10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-2xl font-bold gradient-text">3+</div>
                <div className="text-[10px] text-gray-600 dark:text-gray-400">Years Exp</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 md:bottom-4 md:left-0 glass rounded-2xl px-4 py-3 shadow-lg border border-white/10"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <div className="text-2xl font-bold gradient-text">5+</div>
                <div className="text-[10px] text-gray-600 dark:text-gray-400">Projects</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <Card className="text-center hover:scale-105 transition-transform">
                <motion.div
                  className="text-4xl font-bold gradient-text mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, type: 'spring' }}
                >
                  {stat.value}+
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-blue-500/50 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-blue-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
