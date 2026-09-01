'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ExternalLink, Eye, Monitor, Moon,
  Star, Clock, Users, Zap, Search, SlidersHorizontal, Grid3X3, LayoutList
} from 'lucide-react';

// Github icon (removed from lucide-react in newer versions)
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
import Link from 'next/link';
import Image from 'next/image';
import { projects, projectCategories, type Project, type ProjectStatus } from '@/constants/projects';

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

const difficultyColors = {
  beginner: 'from-green-400 to-emerald-500',
  intermediate: 'from-blue-400 to-cyan-500',
  advanced: 'from-purple-400 to-pink-500',
  expert: 'from-red-400 to-orange-500',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });

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

  const status = statusColors[project.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer h-full"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow border */}
        <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
        <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

        {/* Card */}
        <div className="relative rounded-3xl overflow-hidden bg-white/5 dark:bg-slate-900/80 backdrop-blur-xl border border-white/10 dark:border-white/5 h-full flex flex-col">
          {/* Image area */}
          <div className="relative h-52 overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}>
                <motion.div
                  className="absolute top-4 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"
                  animate={isHovered ? { scale: 1.2, y: -5 } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute bottom-3 right-3 w-40 h-28 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-2xl"
                  animate={isHovered ? { y: -6, scale: 1.04 } : { y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-1 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                  <div className="text-[8px] font-medium text-white/60 mb-1">{project.title}</div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-3/4 rounded bg-white/20" />
                    <div className="h-1.5 w-1/2 rounded bg-white/15" />
                    <div className="h-1.5 w-2/3 rounded bg-white/20" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* Glow overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={isHovered ? { x: '200%' } : { x: '-100%' }}
              transition={{ duration: 0.8 }}
            />

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <motion.div
                  className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
                  initial={{ scale: 0 }}
                  animate={isHovered ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Eye className="w-5 h-5 text-white" />
                </motion.div>
              </Link>
              <a href={project.github.url} target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
                  initial={{ scale: 0 }}
                  animate={isHovered ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <GithubIcon className="w-5 h-5 text-white" />
                </motion.div>
              </a>
            </motion.div>

            {/* Badges */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/30 text-white backdrop-blur-md border border-white/10">
                {project.category}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${status.bg} ${status.text} border ${status.border} backdrop-blur-md`}>
                {statusLabels[project.status]}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col space-y-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
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
                  className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.isResponsive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Monitor className="w-2.5 h-2.5" /> Responsive
                </span>
              )}
              {project.hasDarkMode && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Moon className="w-2.5 h-2.5" /> Dark Mode
                </span>
              )}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r ${difficultyColors[project.difficulty]} bg-clip-text text-transparent border border-white/10`}>
                <Zap className="w-2.5 h-2.5" style={{ color: project.accentColor }} />
                {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
              </span>
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
              <span className="inline-flex items-center gap-1">
                <Users className="w-3 h-3" /> {project.teamSize}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {project.github.lastUpdated}
              </span>
              {project.github.stars && (
                <span className="inline-flex items-center gap-1">
                  <Star className="w-3 h-3" /> {project.github.stars}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 mt-auto">
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-95 flex items-center justify-center"
              >
                View Details
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl text-sm border border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/5 transition-colors flex items-center justify-center active:scale-95"
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
                  className="px-3 py-2.5 rounded-xl text-sm border border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/5 transition-colors flex items-center justify-center active:scale-95"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Floating shadow */}
          <motion.div
            className={`absolute -bottom-3 left-6 right-6 h-6 rounded-full bg-gradient-to-r ${project.gradient} blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[rgb(2,6,23)]">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-purple-500/3 blur-3xl" />
      </div>

      <div className="relative">
        {/* Hero header */}
        <section className="pt-32 pb-12">
          <div className="container mx-auto px-4">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4"
              >
                Portfolio Showcase
              </motion.span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                <span className="gradient-text">All Projects</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Explore my complete collection of projects. Each one represents a unique challenge solved with modern technologies and thoughtful design.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6 mt-8"
            >
              {[
                { label: 'Total Projects', value: projects.length },
                { label: 'Completed', value: projects.filter(p => p.status === 'completed').length },
                { label: 'In Progress', value: projects.filter(p => p.status === 'in-progress').length },
                { label: 'Open Source', value: projects.filter(p => p.status === 'open-source').length },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-2xl font-bold gradient-text">{stat.value}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="pb-8 sticky top-0 z-40 bg-white/80 dark:bg-[rgb(2,6,23)]/80 backdrop-blur-xl border-b border-white/5">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all"
                />
              </div>

              {/* Category filter */}
              <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-2 flex-1 pb-1">
                {projectCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white/5 text-gray-600 dark:text-gray-400 border border-white/10 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                  aria-label="List view"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-500/10 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + searchQuery + viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={
                    viewMode === 'grid'
                      ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'grid grid-cols-1 gap-4'
                  }
                >
                  {filteredProjects.map((project, index) => (
                    viewMode === 'grid' ? (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ) : (
                      <ProjectListItem key={project.id} project={project} index={index} />
                    )
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Results count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500"
            >
              Showing {filteredProjects.length} of {projects.length} projects
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

// List view item
function ProjectListItem({ project, index }: { project: Project; index: number }) {
  const status = statusColors[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <motion.div
          className="group p-5 rounded-2xl bg-white/5 dark:bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:border-blue-500/30 transition-all flex items-center gap-6"
          whileHover={{ x: 5, scale: 1.01 }}
        >
          {/* Gradient icon */}
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shrink-0`}>
            <span className="text-2xl font-bold text-white/80">{project.title.charAt(0)}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-400 transition-colors truncate">
                {project.title}
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${status.bg} ${status.text} border ${status.border} shrink-0`}>
                {statusLabels[project.status]}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 shrink-0">
            {project.github.stars && (
              <span className="inline-flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400" /> {project.github.stars}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Users className="w-3 h-3" /> {project.teamSize}
            </span>
          </div>

          {/* Arrow */}
          <div className="text-gray-400 group-hover:text-blue-400 transition-colors shrink-0">
            <ExternalLink className="w-4 h-4" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
