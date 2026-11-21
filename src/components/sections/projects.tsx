'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, ExternalLink, Github, Monitor, Moon, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { AnimatedTitle } from '@/components/animations/animated-title';
import { projects, projectCategories, type Project, type ProjectStatus } from '@/constants/projects';
import Link from 'next/link';
import Image from 'next/image';

const statusStyles: Record<ProjectStatus, string> = {
  completed: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300',
  'in-progress': 'border-amber-400/25 bg-amber-400/10 text-amber-700 dark:text-amber-300',
  'open-source': 'border-sky-400/25 bg-sky-400/10 text-sky-700 dark:text-sky-300',
};

const statusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  'open-source': 'Open source',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-xl hover:shadow-sky-950/5 dark:border-white/10 dark:bg-[#14171c] dark:hover:border-sky-300/30 dark:hover:shadow-black/25"
    >
      <Link href={`/projects/${project.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-[#1b2028]" aria-label={`View ${project.title} project details`}>
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}>
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-6 text-center">
              <span className="max-w-[18rem] text-2xl font-bold text-white drop-shadow-sm">{project.title}</span>
            </div>
            <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border border-white/20" />
            <div className="absolute -right-2 -top-4 h-28 w-28 rounded-full border border-white/15" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {project.category}
        </span>
        <span className={`absolute right-3 top-3 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur ${statusStyles[project.status]}`}>
          {statusLabels[project.status]}
        </span>
        {project.featured && <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-gray-800">Featured</span>}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4">
          <Link href={`/projects/${project.slug}`} className="text-lg font-semibold tracking-tight text-gray-900 transition-colors hover:text-sky-700 dark:text-white dark:hover:text-sky-300">
            {project.title}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{project.shortDescription}</p>
        </div>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((technology) => (
            <span key={technology} className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300">
              {technology}
            </span>
          ))}
          {project.technologies.length > 4 && <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] text-gray-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-400">+{project.technologies.length - 4}</span>}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-white/10">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            {project.isResponsive && <span className="inline-flex items-center gap-1"><Monitor className="h-3.5 w-3.5" /> Responsive</span>}
            {project.hasDarkMode && <span className="inline-flex items-center gap-1"><Moon className="h-3.5 w-3.5" /> Dark mode</span>}
            {project.github.stars !== undefined && <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 text-amber-500" /> {project.github.stars}</span>}
          </div>
          <div className="flex items-center gap-2">
            {project.github.url && <a href={project.github.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-400 hover:text-gray-900 dark:border-white/10 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white"><Github className="h-4 w-4" /></a>}
            {(project.liveUrl || project.viewUrl) && <a href={project.liveUrl || project.viewUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:text-gray-300 dark:hover:text-sky-300"><ExternalLink className="h-4 w-4" /></a>}
            <Link href={`/projects/${project.slug}`} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gray-900 px-3 text-xs font-semibold text-white transition hover:bg-sky-700 dark:bg-white dark:text-gray-900 dark:hover:bg-sky-200">
              Details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

  return (
    <section id="projects" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-sky-500/[0.06] blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-indigo-500/[0.05] blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <span className="mb-4 inline-flex rounded-full border border-sky-500/20 bg-sky-500/[0.07] px-3 py-1 text-xs font-semibold tracking-wide text-sky-700 dark:text-sky-300">Selected work</span>
          <div className="mb-4 flex justify-center"><AnimatedTitle text={t('projects.title')} className="text-4xl font-bold md:text-6xl gradient-text" /></div>
          <p className="mx-auto max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400">{t('projects.subtitle')}</p>
        </header>

        <div className="mb-8 flex flex-nowrap justify-start gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:justify-center">
          {projectCategories.map((category) => {
            const active = activeCategory === category;
            const count = category === 'All' ? projects.length : projects.filter((project) => project.category === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-offset-2 ${active ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900' : 'border-gray-200 bg-white/70 text-gray-600 hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:text-sky-300'}`}
              >
                {category}<span className={`ml-2 text-xs ${active ? 'opacity-70' : 'text-gray-400'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {visibleProjects.length > 0 ? (
          <motion.div layout className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </motion.div>
        ) : (
          <p className="py-16 text-center text-gray-500">No projects in this category yet.</p>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {hasMore && (
            <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + 6, filteredProjects.length))} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-sky-400/60 hover:text-sky-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:text-sky-300">
              Show more projects <ChevronDown className="h-4 w-4" />
            </button>
          )}
          {!hasMore && visibleCount > 6 && (
            <button type="button" onClick={() => { setVisibleCount(6); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-sky-400/60 dark:border-white/15 dark:bg-white/[0.04] dark:text-white">
              Show fewer <ChevronUp className="h-4 w-4" />
            </button>
          )}
          <Link href="/projects" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-900/15">
            Browse all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">Showing {visibleProjects.length} of {filteredProjects.length} projects</p>
      </div>
    </section>
  );
}
