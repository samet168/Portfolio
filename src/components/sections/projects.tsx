'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { AnimatedTitle } from '@/components/animations/animated-title';
import { projects, projectCategories, type Project } from '@/constants/projects';
import Link from 'next/link';
import Image from 'next/image';

const PAGE_SIZE = 6;

function GithubMark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.78 2.45 3.42 1.76.1-.72.39-1.22.7-1.5-2.48-.28-5.1-1.24-5.1-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.43 3.04-1.14 3.04-1.14.61 1.54.23 2.68.12 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.63 5.23-5.12 5.5.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#14171c]">
      <Link href={`/projects/${project.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-[#1b2028]}" aria-label={`View ${project.title} details`}>
        {project.image ? <Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${project.gradient} p-6 text-center`}><span className="text-xl font-bold text-white">{project.title}</span></div>}
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white">{project.category}</span>
        <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white">{project.status === 'in-progress' ? 'In progress' : project.status === 'open-source' ? 'Open source' : 'Completed'}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/projects/${project.slug}`} className="text-lg font-semibold text-gray-900 hover:text-sky-700 dark:text-white dark:hover:text-sky-300">{project.title}</Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{project.technologies.slice(0, 4).map((tech) => <span key={tech} className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] text-gray-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300">{tech}</span>)}{project.technologies.length > 4 && <span className="rounded-md border border-gray-200 px-2 py-1 text-[11px] text-gray-500 dark:border-white/10">+{project.technologies.length - 4}</span>}</div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-white/10">
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">{project.github.stars !== undefined && <><Star className="h-3.5 w-3.5 text-amber-500" />{project.github.stars}</>}</span>
          <div className="flex items-center gap-2">
            {project.github.url && project.github.url !== '#' && <a href={project.github.url} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${project.title}`} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 dark:border-white/10 dark:text-gray-300 dark:hover:text-white"><GithubMark className="h-4 w-4" /></a>}
            {(project.liveUrl || project.viewUrl) && <a href={project.liveUrl || project.viewUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} demo`} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-600 hover:text-sky-700 dark:border-white/10 dark:text-gray-300 dark:hover:text-sky-300"><ExternalLink className="h-4 w-4" /></a>}
            <Link href={`/projects/${project.slug}`} className="inline-flex h-9 items-center gap-1 rounded-lg bg-gray-900 px-3 text-xs font-semibold text-white dark:bg-white dark:text-gray-900">Details <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const filtered = activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageProjects = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectCategory = (category: string) => { setActiveCategory(category); setPage(1); };

  return (
    <section id="projects" className="relative overflow-hidden py-20 md:py-28">
      <div className="container relative mx-auto px-4">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300">Selected work</span>
          <div className="mb-4 flex justify-center"><AnimatedTitle text={t('projects.title')} className="text-4xl font-bold md:text-6xl gradient-text" /></div>
          <p className="mx-auto max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400">{t('projects.subtitle')}</p>
        </header>
        <div className="mb-8 flex flex-nowrap justify-start gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:justify-center">
          {projectCategories.map((category) => {
            const selected = activeCategory === category;
            const count = category === 'All' ? projects.length : projects.filter((project) => project.category === category).length;
            return <button key={category} type="button" aria-pressed={selected} onClick={() => selectCategory(category)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${selected ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900' : 'border-gray-200 bg-white text-gray-600 hover:border-sky-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300'}`}>{category}<span className="ml-2 text-xs opacity-70">{count}</span></button>;
          })}
        </div>
        <motion.div key={`${activeCategory}-${page}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {pageProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </motion.div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} projects</p>
          <nav aria-label="Project pages" className="flex items-center gap-2">
            <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="inline-flex h-10 items-center gap-1 rounded-xl border border-gray-200 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10"><ArrowLeft className="h-4 w-4" /> Previous</button>
            <span aria-live="polite" className="min-w-20 text-center text-sm text-gray-600 dark:text-gray-300">Page {page} / {pageCount}</span>
            <button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page >= pageCount} className="inline-flex h-10 items-center gap-1 rounded-xl border border-gray-200 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10">Next <ArrowRight className="h-4 w-4" /></button>
          </nav>
          <Link href="/projects" className="text-sm font-semibold text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200">Browse all projects <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
