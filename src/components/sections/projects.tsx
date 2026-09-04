'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Eye, ArrowRight, Monitor, Moon, Star, Clock, Users, Zap } from 'lucide-react';

// Github icon (removed from lucide-react in newer versions)
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
import { useTranslation } from '@/hooks/use-translation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedTitle } from '@/components/animations/animated-title';
import { projects, projectCategories, type Project, type ProjectStatus } from '@/constants/projects';
import Link from 'next/link';
import Image from 'next/image';

// Status badge color mapping
const statusColors: Record<ProjectStatus, { bg: string; text: string; border: string }> = {
  completed: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
  'in-progress': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  'open-source': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
};

const statusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  'open-source': 'Open Source',
};

// Difficulty colors
const difficultyColors = {
  beginner: 'from-green-400 to-emerald-500',
  intermediate: 'from-blue-400 to-cyan-500',
  advanced: 'from-purple-400 to-pink-500',
  expert: 'from-red-400 to-orange-500',
};

// Premium Project Card with all hover effects
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  const status = statusColors[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow border effect */}
        <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />

        {/* Animated gradient border */}
        <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

        {/* Card body */}
        <div className="relative rounded-3xl overflow-hidden bg-white/5 dark:bg-slate-900/80 backdrop-blur-xl border border-white/10 dark:border-white/5">
          {/* Image / Gradient Placeholder Area */}
          <div className="relative h-56 overflow-hidden">
            {/* Real image or gradient fallback */}
            {project.image ? (
              <>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </>
            ) : (
              /* Gradient placeholder with mockup for projects without images */
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}>
                <motion.div
                  className="absolute top-4 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"
                  animate={isHovered ? { scale: 1.2, y: -5 } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute bottom-6 left-6 w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm rotate-12"
                  animate={isHovered ? { rotate: 45, scale: 1.1 } : { rotate: 12, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Browser mockup fallback */}
                <motion.div
                  className="absolute bottom-4 right-4 w-48 h-32 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-3 shadow-2xl"
                  animate={isHovered ? { y: -8, scale: 1.05 } : { y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-1 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="text-[9px] font-medium text-white/70 mb-1.5">{project.title}</div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-3/4 rounded bg-white/20" />
                    <div className="h-2 w-1/2 rounded bg-white/15" />
                    <div className="h-2 w-2/3 rounded bg-white/20" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* Glow effect on image */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={isHovered ? { x: '200%' } : { x: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Glass overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Eye className="w-5 h-5 text-white" />
                </motion.div>
              </Link>
              {project.github.url && (
                <a href={project.github.url} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <GithubIcon className="w-5 h-5 text-white" />
                  </motion.div>
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </motion.div>
                </a>
              )}
            </motion.div>

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/30 text-white backdrop-blur-md border border-white/10">
                {project.category}
              </span>
            </div>

            {/* Status badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text} border ${status.border} backdrop-blur-md`}>
                {statusLabels[project.status]}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Title and description */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {project.shortDescription}
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Meta badges row */}
            <div className="flex flex-wrap gap-2">
              {project.isResponsive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Monitor className="w-3 h-3" /> Responsive
                </span>
              )}
              {project.hasDarkMode && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Moon className="w-3 h-3" /> Dark Mode
                </span>
              )}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r ${difficultyColors[project.difficulty]} bg-clip-text text-transparent border border-white/10`}>
                <Zap className="w-3 h-3 text-current" style={{ color: project.accentColor }} />
                {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
              </span>
            </div>

            {/* Project meta */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
              <span className="inline-flex items-center gap-1">
                <Users className="w-3 h-3" /> {project.teamSize} {project.teamSize > 1 ? 'members' : 'member'}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {project.timeline.reduce((_, t) => t, project.timeline[0]).phase}
              </span>
              {project.github.stars && (
                <span className="inline-flex items-center gap-1">
                  <Star className="w-3 h-3" /> {project.github.stars}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-95 flex items-center justify-center"
              >
                View Details
              </Link>
              {(project.liveUrl || project.viewUrl) && (
                <a
                  href={project.liveUrl || project.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/5 transition-colors flex items-center justify-center active:scale-95"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.github.url && (
                <a
                  href={project.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/5 transition-colors flex items-center justify-center active:scale-95"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Floating shadow effect */}
          <motion.div
            className={`absolute -bottom-4 left-8 right-8 h-8 rounded-full bg-gradient-to-r ${project.gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4"
          >
            Portfolio Showcase
          </motion.span>
          <div className="flex justify-center mb-4">
            <AnimatedTitle
              text={t('projects.title')}
              className="text-4xl md:text-6xl font-bold gradient-text"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {t('projects.subtitle')}
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar justify-start sm:justify-center gap-2 pb-2 mb-8 sm:mb-12 px-1"
        >
          {projectCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 text-gray-600 dark:text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-blue-500 to-transparent" />
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Featured</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-cyan-500 to-transparent" />
              <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">More Projects</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold border border-white/10 text-gray-700 dark:text-white/80 hover:bg-white/5 hover:border-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-[0_0_30px_rgba(0,140,255,0.2)]"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
