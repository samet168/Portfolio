'use client';

import { use, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ExternalLink, Globe, Star,
  Clock, Users, Zap, Monitor, Moon, CheckCircle2, ChevronRight,
  Copy, GitBranch, Calendar, Code2, Layers, Database, Cloud,
  AlertTriangle, Lightbulb, BookOpen, Mail, Lock, Eye, EyeOff
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
import { getProjectBySlug, getRelatedProjects, getAdjacentProjects, type Project } from '@/constants/projects';

// --- Sub-components for the detail page ---

function ProjectHero({ project }: { project: Project }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const statusLabels = { completed: 'Completed', 'in-progress': 'In Progress', 'open-source': 'Open Source' };
  const statusColors = {
    completed: 'bg-green-500/10 text-green-400 border-green-500/30',
    'in-progress': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'open-source': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Hero background - real image or gradient */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[rgb(2,6,23)] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 dark:from-[rgb(2,6,23)]/80 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[rgb(2,6,23)] via-transparent to-transparent" />
          </>
        )}
      </motion.div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-20 right-[20%] w-72 h-72 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-3xl`}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-[10%] w-48 h-48 rounded-full bg-blue-500/10 blur-2xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div style={{ opacity }} className="container mx-auto px-4 relative pt-32 pb-16">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Category & Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-white/20 dark:border-white/10 backdrop-blur-md">
            {project.category}
          </span>
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium border backdrop-blur-md ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="gradient-text">{project.title}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-8"
        >
          {project.longDescription}
        </motion.p>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {project.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.05 }}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-white/10 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-white/20 dark:border-white/10 backdrop-blur-md"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          {project.liveUrl && project.liveUrl !== project.viewUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" /> Live Demo
              </motion.button>
            </a>
          )}
          {project.viewUrl && (
            <a href={project.viewUrl} target="_blank" rel="noopener noreferrer">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" /> View
              </motion.button>
            </a>
          )}
          {project.frontendUrl && (
            <a href={project.frontendUrl} target="_blank" rel="noopener noreferrer">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/10 text-gray-700 dark:text-white hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon className="w-5 h-5" /> Frontend
              </motion.button>
            </a>
          )}
          {project.backendUrl && (
            <a href={project.backendUrl} target="_blank" rel="noopener noreferrer">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/10 text-gray-700 dark:text-white hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon className="w-5 h-5" /> Backend
              </motion.button>
            </a>
          )}
          {!project.frontendUrl && !project.backendUrl && (
            <a href={project.github.url} target="_blank" rel="noopener noreferrer">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/10 text-gray-700 dark:text-white hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon className="w-5 h-5" /> GitHub
              </motion.button>
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectOverview({ project }: { project: Project }) {
  const items = [
    { icon: BookOpen, label: 'Introduction', text: project.overview.introduction },
    { icon: AlertTriangle, label: 'Problem', text: project.overview.problem },
    { icon: Lightbulb, label: 'Solution', text: project.overview.solution },
    { icon: Star, label: 'Goal', text: project.overview.goal },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Overview" subtitle="Understanding the project" />
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 dark:bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.label}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/10"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.overview.keyFeatures.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TechIcon({ name }: { name: string }) {
  // SVG-based tech icons - stroke-based, consistent sizing
  const icons: Record<string, React.ReactNode> = {
    'Next.js': <path d="M12 2L2 19.5h20L12 2zm0 4l7 12H5l7-12z" fill="currentColor"/>,
    'React': <><circle cx="12" cy="12" r="2.5" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)"/></>,
    'Vue.js': <path d="M2 3h4l6 10.5L18 3h4L12 21 2 3z" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    'TypeScript': <><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><text x="8" y="16" fontSize="10" fontWeight="bold" fill="currentColor">TS</text></>,
    'JavaScript': <><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><text x="8" y="16" fontSize="10" fontWeight="bold" fill="currentColor">JS</text></>,
  };

  // Default icon for techs not in the map
  const defaultIcon = (
    <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="3" fill="currentColor"/></>
  );

  return (
    <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {icons[name] || defaultIcon}
    </svg>
  );
}

function TechStackSection({ project }: { project: Project }) {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Tech Stack" subtitle="Technologies powering this project" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {project.technologies.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-4 rounded-2xl bg-white/5 dark:bg-slate-900/50 border border-white/10 backdrop-blur-xl text-center hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-default"
            >
              <div className="flex justify-center mb-2"><TechIcon name={tech} /></div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{tech}</div>
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ project }: { project: Project }) {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Features" subtitle="What this project delivers" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group p-5 rounded-2xl bg-white/5 dark:bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:border-green-500/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{feature}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // If project has a real image, show it in multiple device mockups
  const hasImage = !!project.image;

  // Gallery items: real image in different frames + placeholder mockups
  const galleryItems = [
    { label: 'Desktop Preview', type: 'desktop' as const },
    { label: 'Tablet View', type: 'tablet' as const },
    { label: 'Mobile View', type: 'mobile' as const },
    { label: 'Code Architecture', type: 'code' as const },
  ];

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Project Gallery" subtitle="Visual showcase of the project" />

        {/* Main large preview */}
        {hasImage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={project.image!}
                alt={`${project.title} - Full Preview`}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
              {/* Glass border glow */}
              <div className={`absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-blue-500/30 transition-all`} />
            </div>
          </motion.div>
        )}

        {/* Device mockups grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-blue-500/30 transition-all"
              onClick={() => hasImage && openLightbox(i + 1)}
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} relative`}>
                {item.type === 'desktop' && (
                  <div className="absolute inset-4 rounded-lg bg-black/30 backdrop-blur-md border border-white/20 overflow-hidden shadow-2xl">
                    <div className="h-6 bg-black/30 flex items-center px-2 gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-400/70" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                      <div className="w-2 h-2 rounded-full bg-green-400/70" />
                      <div className="ml-3 flex-1 h-3 rounded bg-white/10" />
                    </div>
                    {hasImage ? (
                      <div className="relative w-full h-[calc(100%-1.5rem)]">
                        <Image src={project.image!} alt={project.title} fill className="object-cover object-top" sizes="300px" />
                      </div>
                    ) : (
                      <div className="p-3 space-y-2">
                        <div className="h-3 w-2/3 rounded bg-white/20" />
                        <div className="h-2 w-full rounded bg-white/10" />
                        <div className="h-2 w-4/5 rounded bg-white/10" />
                      </div>
                    )}
                  </div>
                )}

                {item.type === 'tablet' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-36 h-48 rounded-xl bg-black/30 backdrop-blur-md border-2 border-white/20 overflow-hidden shadow-2xl">
                      <div className="h-3 flex justify-center pt-0.5">
                        <div className="w-6 h-1 rounded-full bg-white/20" />
                      </div>
                      {hasImage ? (
                        <div className="relative w-full h-[calc(100%-0.75rem)]">
                          <Image src={project.image!} alt={project.title} fill className="object-cover object-top" sizes="150px" />
                        </div>
                      ) : (
                        <div className="p-2 space-y-1.5">
                          <div className="h-2 w-full rounded bg-white/20" />
                          <div className="h-8 rounded bg-white/10" />
                          <div className="h-2 w-2/3 rounded bg-white/15" />
                          <div className="h-6 rounded bg-white/10" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {item.type === 'mobile' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-44 rounded-2xl bg-black/30 backdrop-blur-md border-2 border-white/20 overflow-hidden shadow-2xl">
                      <div className="h-3 flex justify-center pt-0.5">
                        <div className="w-8 h-1 rounded-full bg-white/20" />
                      </div>
                      {hasImage ? (
                        <div className="relative w-full h-[calc(100%-0.75rem)]">
                          <Image src={project.image!} alt={project.title} fill className="object-cover object-top" sizes="100px" />
                        </div>
                      ) : (
                        <div className="p-1.5 space-y-1">
                          <div className="h-2 w-full rounded bg-white/20" />
                          <div className="h-6 rounded bg-white/10" />
                          <div className="h-2 w-2/3 rounded bg-white/15" />
                          <div className="h-5 rounded bg-white/10" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {item.type === 'code' && (
                  <div className="absolute inset-4 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 p-3 font-mono text-[10px] overflow-hidden">
                    <div className="space-y-1 text-white/70">
                      <div><span className="text-purple-300">import</span> {'{ '}<span className="text-cyan-300">useState</span>{' }'} <span className="text-purple-300">from</span> <span className="text-green-300">&apos;react&apos;</span></div>
                      <div><span className="text-purple-300">import</span> {'{ '}<span className="text-cyan-300">motion</span>{' }'} <span className="text-purple-300">from</span> <span className="text-green-300">&apos;framer-motion&apos;</span></div>
                      <div className="mt-1"><span className="text-blue-300">export function</span> <span className="text-yellow-300">App</span>() {'{'}</div>
                      <div className="pl-3"><span className="text-purple-300">return</span> {'<'}<span className="text-cyan-300">motion.div</span>{' />'}</div>
                      <div>{'}'}</div>
                    </div>
                  </div>
                )}

                {/* Label */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-black/30 text-white backdrop-blur-md border border-white/10">
                    {item.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && hasImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.image!}
              alt={project.title}
              width={1200}
              height={700}
              className="w-full h-auto object-contain rounded-2xl"
              sizes="90vw"
            />
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function ArchitectureSection({ project }: { project: Project }) {
  const layers = [
    { key: 'frontend', label: 'Frontend', icon: Monitor, value: project.architecture.frontend },
    { key: 'backend', label: 'Backend', icon: Layers, value: project.architecture.backend },
    { key: 'api', label: 'API Layer', icon: Code2, value: project.architecture.api },
    { key: 'database', label: 'Database', icon: Database, value: project.architecture.database },
    { key: 'deployment', label: 'Deployment', icon: Cloud, value: project.architecture.deployment },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Architecture" subtitle="System design and tech decisions" />
        <div className="max-w-2xl mx-auto">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.key}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/20 shrink-0`}>
                  <layer.icon className="w-6 h-6 text-blue-400" />
                </div>
                {/* Content */}
                <div className="flex-1 p-4 rounded-xl bg-white/5 dark:bg-slate-900/50 border border-white/10">
                  <div className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-1">{layer.label}</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{layer.value}</div>
                </div>
              </div>
              {/* Connector line */}
              {i < layers.length - 1 && (
                <div className="ml-6 w-px h-6 bg-gradient-to-b from-blue-500/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ project }: { project: Project }) {
  const phaseColors = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-amber-500 to-orange-500', 'from-green-500 to-emerald-500', 'from-red-500 to-rose-500'];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Project Timeline" subtitle="Development phases and milestones" />
        <div className="max-w-3xl mx-auto">
          {project.timeline.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex gap-6"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-4 h-4 rounded-full bg-gradient-to-br ${phaseColors[i % phaseColors.length]} shadow-lg`}
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2 }}
                />
                {i < project.timeline.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-blue-500/40 to-transparent min-h-[60px]" />
                )}
              </div>
              {/* Content */}
              <div className="pb-8 flex-1">
                <div className="p-5 rounded-xl bg-white/5 dark:bg-slate-900/50 border border-white/10 hover:border-blue-500/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 dark:text-white">{phase.phase}</h4>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{phase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChallengesSection({ project }: { project: Project }) {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Challenges & Solutions" subtitle="Problems faced and lessons learned" />
        <div className="space-y-6 max-w-4xl mx-auto">
          {project.challenges.map((challenge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6 rounded-2xl bg-white/5 dark:bg-slate-900/50 border border-white/10 backdrop-blur-xl"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Problem */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Problem</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.problem}</p>
                </div>
                {/* Solution */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Lightbulb className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Solution</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.solution}</p>
                </div>
                {/* Lesson */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Lesson</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.lesson}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GithubSection({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(`git clone ${project.github.url}.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="GitHub Repository" subtitle="Source code and contributions" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-white/5 dark:bg-slate-900/50 border border-white/10 backdrop-blur-xl">
            {/* Repo header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shrink-0">
                <GithubIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{project.github.repoName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.github.repoDescription}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              {project.github.stars !== undefined && (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{project.github.stars} stars</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>{project.github.language}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 text-green-400" />
                <span>Updated {project.github.lastUpdated}</span>
              </div>
            </div>

            {/* Clone command */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5 mb-6">
              <GitBranch className="w-4 h-4 text-gray-500 shrink-0" />
              <code className="flex-1 text-sm text-gray-400 overflow-x-auto">
                git clone {project.github.url}.git
              </code>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                aria-label="Copy clone command"
              >
                <Copy className={`w-4 h-4 ${copied ? 'text-green-400' : 'text-gray-500'}`} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a href={project.github.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <motion.button
                  className="w-full px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800 transition-colors text-sm flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GithubIcon className="w-4 h-4" /> View on GitHub
                </motion.button>
              </a>
              <motion.button
                onClick={handleCopy}
                className="px-5 py-3 rounded-xl font-semibold border border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/5 transition-colors text-sm flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Copy className="w-4 h-4" /> Clone
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LiveDemoSection({ project }: { project: Project }) {
  if (!project.liveUrl) return null;

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Live Demo" subtitle="See the project in action" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Browser mockup */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 dark:bg-slate-900/50 backdrop-blur-xl">
            {/* Browser bar */}
            <div className="h-10 bg-black/20 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 text-sm text-gray-400">
                  <Globe className="w-3.5 h-3.5" />
                  {project.liveUrl}
                </div>
              </div>
            </div>
            {/* Preview area */}
            <div className={`aspect-video bg-gradient-to-br ${project.gradient} relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
                  >
                    <Globe className="w-8 h-8 text-white" />
                  </motion.div>
                  <p className="text-white/80 font-medium mb-4">Live Production Website</p>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      className="px-6 py-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white font-medium border border-white/30 hover:bg-white/30 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visit Website <ExternalLink className="w-4 h-4 inline ml-1" />
                    </motion.button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DemoAccountSection({ project }: { project: Project }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  if (!project.demoAccount) return null;

  function copyText(text: string, type: 'email' | 'password') {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2000);
    }
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Demo Account" subtitle="Use these credentials to try the live demo" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="p-8 rounded-2xl bg-white/5 dark:bg-slate-900/50 border border-white/10 backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/20">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Test Credentials</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">For demo purposes only</p>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 block">Email</label>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="flex-1 text-sm text-gray-300 font-mono">{project.demoAccount.email}</span>
                <button
                  onClick={() => copyText(project.demoAccount!.email, 'email')}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Copy email"
                >
                  <Copy className={`w-4 h-4 ${copiedEmail ? 'text-green-400' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 block">Password</label>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="flex-1 text-sm text-gray-300 font-mono">
                  {showPassword ? project.demoAccount.password : '•'.repeat(project.demoAccount.password.length)}
                </span>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Toggle password visibility"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4 text-gray-500" />
                    : <Eye className="w-4 h-4 text-gray-500" />
                  }
                </button>
                <button
                  onClick={() => copyText(project.demoAccount!.password, 'password')}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Copy password"
                >
                  <Copy className={`w-4 h-4 ${copiedPassword ? 'text-green-400' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>

            {/* Visit button */}
            {project.viewUrl && (
              <a href={project.viewUrl} target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="w-full px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4" /> Open Live Demo
                </motion.button>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedProjects(currentSlug, 3);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Related Projects" subtitle="You might also like" />
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <motion.div
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 dark:bg-slate-900/50 backdrop-blur-xl hover:border-blue-500/30 transition-all"
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  {/* Gradient header */}
                  <div className={`h-32 bg-gradient-to-br ${project.gradient} relative`}>
                    <motion.div
                      className="absolute top-3 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute bottom-3 left-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/30 text-white backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-400 transition-colors">{project.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{project.shortDescription}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs text-blue-400 font-medium">
                      View Project <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectNavigation({ currentSlug }: { currentSlug: string }) {
  const { previous, next } = getAdjacentProjects(currentSlug);

  return (
    <section className="py-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Previous */}
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className="group flex-1">
              <motion.div
                className="p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all flex items-center gap-3"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Previous</div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">{previous.title}</div>
                </div>
              </motion.div>
            </Link>
          ) : <div className="flex-1" />}

          {/* Back to portfolio */}
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-gray-600 dark:text-gray-400 hover:border-blue-500/30 hover:text-blue-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
          >
            All Projects
          </Link>

          {/* Next */}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="group flex-1">
              <motion.div
                className="p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all flex items-center justify-end gap-3"
                whileHover={{ x: 5 }}
              >
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-500">Next</div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">{next.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </motion.div>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </section>
  );
}

// Reusable section header
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
    </motion.div>
  );
}

// Project info sidebar
function ProjectInfoSidebar({ project }: { project: Project }) {
  const difficultyColors = {
    beginner: 'text-green-400',
    intermediate: 'text-blue-400',
    advanced: 'text-purple-400',
    expert: 'text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl bg-white/5 dark:bg-slate-900/50 border border-white/10 backdrop-blur-xl sticky top-24"
    >
      <h3 className="font-bold text-gray-900 dark:text-white mb-6">Project Info</h3>
      <div className="space-y-4">
        <InfoRow label="My Role" value={project.myRole} />
        <InfoRow label="Team Size" value={`${project.teamSize} ${project.teamSize > 1 ? 'members' : 'member'}`} />
        <InfoRow label="Difficulty" value={
          <span className={difficultyColors[project.difficulty]}>
            {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
          </span>
        } />
        <InfoRow label="Responsive" value={
          project.isResponsive ? <span className="text-green-400">Yes</span> : <span className="text-gray-500">No</span>
        } />
        <InfoRow label="Dark Mode" value={
          project.hasDarkMode ? <span className="text-green-400">Yes</span> : <span className="text-gray-500">No</span>
        } />
        <InfoRow label="Language" value={project.github.language} />
        <InfoRow label="Last Updated" value={project.github.lastUpdated} />
      </div>
    </motion.div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-xs text-gray-500 dark:text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}

// --- Main Page Component ---
export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[rgb(2,6,23)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Project Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/projects"
            className="inline-block px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 active:scale-95 transition-all"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[rgb(2,6,23)]">
      {/* Scroll progress */}
      <ScrollProgressBar />

      {/* Hero */}
      <ProjectHero project={project} />

      {/* Main content with optional sidebar */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          <div>
            <ProjectOverview project={project} />
            <TechStackSection project={project} />
            <FeaturesSection project={project} />
            <GallerySection project={project} />
            <ArchitectureSection project={project} />
            <TimelineSection project={project} />
            <ChallengesSection project={project} />
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ProjectInfoSidebar project={project} />
            </div>
          </div>
        </div>
      </div>

      {/* Full-width sections */}
      <GithubSection project={project} />
      <LiveDemoSection project={project} />
      <DemoAccountSection project={project} />
      <RelatedProjects currentSlug={slug} />
      <ProjectNavigation currentSlug={slug} />
    </div>
  );
}

// Scroll progress bar
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
