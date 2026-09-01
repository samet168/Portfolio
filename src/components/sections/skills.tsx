'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  MonitorSmartphone, ServerCog, Database, Smartphone,
  TerminalSquare, Wrench, Code2, Globe, Palette, Layers,
  GitBranch, Container, Monitor, Layout, FileCode2, Cpu
} from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

// Category icon mapping
const categoryIcons = {
  Frontend: MonitorSmartphone,
  Backend: ServerCog,
  Database: Database,
  Mobile: Smartphone,
  'Programming Languages': TerminalSquare,
  'Tools & Platforms': Wrench,
};

// Category gradient mapping
const categoryGradients = {
  Frontend: 'from-blue-500 to-cyan-400',
  Backend: 'from-green-500 to-emerald-400',
  Database: 'from-amber-500 to-orange-400',
  Mobile: 'from-violet-500 to-purple-400',
  'Programming Languages': 'from-rose-500 to-pink-400',
  'Tools & Platforms': 'from-indigo-500 to-blue-400',
};

// Technology SVG icons - stroke-based, pixel-perfect
function TechSvgIcon({ name }: { name: string }) {
  // Map of tech names to lucide icons or custom SVGs
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'HTML5': Globe,
    'CSS3': Palette,
    'JavaScript': FileCode2,
    'React': Code2,
    'Next.js': Layout,
    'Vue.js': Layers,
    'Tailwind CSS': Palette,
    'Bootstrap': Layout,
    'Python': TerminalSquare,
    'FastAPI': Cpu,
    'Flask': ServerCog,
    'Java Spring Boot': ServerCog,
    'PHP': FileCode2,
    'Laravel': Layers,
    'PostgreSQL': Database,
    'MySQL': Database,
    'MongoDB': Database,
    'Flutter': Smartphone,
    'Java': FileCode2,
    'C++': TerminalSquare,
    'C#': TerminalSquare,
    'Git': GitBranch,
    'GitHub': GitBranch,
    'Docker': Container,
    'Linux': Monitor,
    'Postman': Globe,
    'VS Code': Code2,
    'Android Studio': Smartphone,
    'Figma': Palette,
  };

  const Icon = iconMap[name] || Code2;
  return <Icon className="w-5 h-5" />;
}

interface SkillItem {
  name: string;
}

interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

// Individual skill card with tilt, glow, and hover effects
function SkillCard({ name, index, gradient }: { name: string; index: number; gradient: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 25 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <motion.div
        ref={cardRef}
        className="relative group"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient border glow on hover */}
        <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[3px]`} />
        <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

        {/* Card body */}
        <div className="relative flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] dark:bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] dark:border-white/[0.05] hover:border-transparent transition-all duration-300">
          {/* Icon */}
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
            <div className="text-white">
              <TechSvgIcon name={name} />
            </div>
          </div>

          {/* Name */}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {name}
          </span>

          {/* Animated background on hover */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`}
          />
        </div>

        {/* Soft floating shadow */}
        <motion.div
          className={`absolute -bottom-2 left-4 right-4 h-4 rounded-full bg-gradient-to-r ${gradient} blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        />
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML5' },
        { name: 'CSS3' },
        { name: 'JavaScript' },
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'Vue.js' },
        { name: 'Tailwind CSS' },
        { name: 'Bootstrap' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Python' },
        { name: 'FastAPI' },
        { name: 'Flask' },
        { name: 'Java Spring Boot' },
        { name: 'PHP' },
        { name: 'Laravel' },
      ],
    },
    {
      category: 'Database',
      skills: [
        { name: 'PostgreSQL' },
        { name: 'MySQL' },
        { name: 'MongoDB' },
      ],
    },
    {
      category: 'Mobile',
      skills: [
        { name: 'Flutter' },
      ],
    },
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Java' },
        { name: 'Python' },
        { name: 'C++' },
        { name: 'C#' },
      ],
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'Docker' },
        { name: 'Linux' },
        { name: 'Postman' },
        { name: 'VS Code' },
        { name: 'Android Studio' },
        { name: 'Figma' },
      ],
    },
  ];

  const displayedCategories = activeCategory
    ? skillCategories.filter((c) => c.category === activeCategory)
    : skillCategories;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-72 h-72 rounded-full bg-cyan-500/[0.03] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4"
          >
            Tech Stack
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">{t('skills.title')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar justify-start sm:justify-center gap-2 pb-2 mb-10 sm:mb-14 px-1"
        >
          <motion.button
            onClick={() => setActiveCategory(null)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-300 ${
              activeCategory === null
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/5 text-gray-600 dark:text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          {skillCategories.map((cat) => {
            const Icon = categoryIcons[cat.category as keyof typeof categoryIcons] || Code2;
            return (
              <motion.button
                key={cat.category}
                onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-300 ${
                  activeCategory === cat.category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 text-gray-600 dark:text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {cat.category}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Categories Grid */}
        <div className="space-y-12">
          {displayedCategories.map((category, catIndex) => {
            const gradient = categoryGradients[category.category as keyof typeof categoryGradients] || 'from-blue-500 to-cyan-400';
            const Icon = categoryIcons[category.category as keyof typeof categoryIcons] || Code2;

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.category}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-500">{category.skills.length} technologies</span>
                  </div>
                  <div className={`ml-auto h-px flex-1 max-w-[200px] bg-gradient-to-r ${gradient} opacity-20`} />
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      index={skillIndex}
                      gradient={gradient}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20"
        >
          <div className="p-8 rounded-3xl bg-white/[0.02] dark:bg-slate-900/40 border border-white/[0.06] backdrop-blur-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '20+', label: 'Technologies' },
                { value: '6', label: 'Categories' },
                { value: '3+', label: 'Years Learning' },
                { value: '5+', label: 'Projects Built' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="space-y-1"
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
