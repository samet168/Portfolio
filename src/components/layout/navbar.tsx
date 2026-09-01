'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, Send } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/features/theme-provider';
import { useLanguage } from '@/features/language-provider';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { id: 'home', label: t('navbar.home') },
    { id: 'about', label: t('navbar.about') },
    { id: 'skills', label: t('navbar.skills') },
    { id: 'experience', label: t('navbar.experience') },
    { id: 'projects', label: t('navbar.projects') },
    { id: 'services', label: t('navbar.services') },
    { id: 'contact', label: t('navbar.contact') },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);

          // Update active section
          const sections = navItems.map((item) => document.getElementById(item.id));
          const scrollPosition = window.scrollY + 120;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(navItems[i].id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMobileDrawerOpen(false);
    }
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 py-3 sm:py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-blue-500/50 bg-slate-800">
                <Image
                  src="/images/hero/profile.jpg"
                  alt="Moeun Samet"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-bold text-sm sm:text-base gradient-text">Moeun Samet</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'glass py-2.5 sm:py-3 shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-transparent py-3.5 sm:py-5'
        )}
      >
        <div className="container mx-auto px-3.5 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo with Profile Photo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer flex items-center gap-2.5 sm:gap-3 group"
              onClick={() => scrollToSection('home')}
            >
              {/* Profile Avatar Logo */}
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 shadow-md shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
                    <Image
                      src="/images/hero/profile.jpg"
                      alt="Moeun Samet Logo"
                      fill
                      sizes="40px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      priority
                    />
                  </div>
                </div>
                {/* Active online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              {/* Name & Role Text */}
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base leading-tight gradient-text">
                  Moeun Samet
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium hidden xs:inline-block">
                  Full Stack Developer
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 px-3 py-1.5 rounded-full glass border border-white/20 dark:border-white/10 shadow-sm">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'relative px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200',
                      isActive
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="desktopActiveNav"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/30 -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Controls (Theme, Language, Mobile Drawer Button) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Language Switcher */}
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full glass hover:bg-white/10 transition-all text-xs font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {language === 'en' ? 'EN' : 'KH'}
                </span>
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full glass hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 text-blue-600" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </motion.button>

              {/* Mobile Drawer Button */}
              <motion.button
                onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-full glass hover:bg-white/10 transition-all"
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle quick menu"
              >
                {isMobileDrawerOpen ? (
                  <X className="w-4 h-4 text-blue-500" />
                ) : (
                  <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile App Sheet / Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Bottom Sheet Card */}
            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pb-8 rounded-t-3xl bg-white dark:bg-slate-950 border-t border-white/20 dark:border-white/10 shadow-2xl space-y-4"
            >
              {/* Sheet Drag Indicator Handle */}
              <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto" />

              {/* Profile Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                    <Image
                      src="/images/hero/profile.jpg"
                      alt="Moeun Samet"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base gradient-text">Moeun Samet</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Available for Projects</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Navigation Grid */}
              <div className="grid grid-cols-3 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'p-2.5 rounded-xl text-center text-xs font-semibold transition-all',
                      activeSection === item.id
                        ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                        : 'bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Quick Contact & Socials */}
              <div className="flex items-center justify-between pt-2">
                <a
                  href="mailto:samet.moeun9@gmail.com"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold text-center flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  samet.moeun9@gmail.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}