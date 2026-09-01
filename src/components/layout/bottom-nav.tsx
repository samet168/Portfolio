'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code2, Briefcase, Layers, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function MobileBottomNav() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);

  const navItems = [
    { id: 'home', label: t('navbar.home'), icon: Home },
    { id: 'about', label: t('navbar.about'), icon: User },
    { id: 'skills', label: t('navbar.skills'), icon: Code2 },
    { id: 'projects', label: t('navbar.projects'), icon: Briefcase },
    { id: 'services', label: t('navbar.services'), icon: Layers },
    { id: 'contact', label: t('navbar.contact'), icon: MessageSquare },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 200;
          for (let i = navItems.length - 1; i >= 0; i--) {
            const element = document.getElementById(navItems[i].id);
            if (element && element.offsetTop <= scrollPosition) {
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
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.aside
      aria-label="Mobile Navigation"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 25 }}
      className="md:hidden fixed bottom-3 left-3 right-3 z-50 max-w-md mx-auto pointer-events-auto"
    >
      <div className="relative rounded-2xl bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-1.5 flex items-center justify-between">
        {/* Glow ambient background inside bar */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 pointer-events-none" />

        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 active:scale-90',
                isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              {/* Active animated pill background */}
              {isActive && (
                <motion.div
                  layoutId="activeBottomTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform duration-200',
                    isActive ? 'scale-110' : 'scale-100'
                  )}
                />
                <span
                  className={cn(
                    'text-[10px] font-medium tracking-tight truncate max-w-[52px]',
                    isActive ? 'font-semibold text-white' : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}
