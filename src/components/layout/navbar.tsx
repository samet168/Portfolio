'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/features/theme-provider';
import { useLanguage } from '@/features/language-provider';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  if (!mounted) {
    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 py-6"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold gradient-text">MS</span>
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass py-4' : 'py-6'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <span className="text-2xl font-bold gradient-text">MS</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'relative text-sm font-medium transition-colors',
                  activeSection === item.id
                    ? 'text-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass transition-all hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'KH'}</span>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full glass transition-all hover:scale-105"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full glass"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-4 py-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'text-left text-sm font-medium transition-colors',
                      activeSection === item.id
                        ? 'text-blue-500'
                        : 'text-gray-600 dark:text-gray-400'
                    )}
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <motion.button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full glass"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'KH'}</span>
                  </motion.button>

                  <motion.button
                    onClick={toggleTheme}
                    className="flex items-center justify-center w-10 h-10 rounded-full glass"
                    whileHover={{ scale: 1.05, rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}