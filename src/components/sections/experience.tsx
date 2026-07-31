'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, FolderGit2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  type: 'work' | 'education' | 'project';
}

export function Experience() {
  const { t } = useTranslation();

  const experiences: ExperienceItem[] = [
    {
      year: '2024 – 2025',
      title: 'Scholarship Recipient',
      company: 'ETEC Training Center',
      description: 'Successfully passed the competitive exam and received a scholarship to study at ETEC Training Center, focusing on advanced programming and software development.',
      technologies: ['C++', 'Programming', 'Software Development'],
      type: 'education',
    },
    {
      year: '2024',
      title: 'Phone Shop Management System',
      company: 'ANT Training Project',
      description: 'Developed a comprehensive phone shop management system after completing the C++ course. Implemented inventory management, sales tracking, and customer management features.',
      technologies: ['C++', 'OOP', 'Data Structures', 'File Handling'],
      type: 'project',
    },
    {
      year: '2025',
      title: 'Group Project Collaboration',
      company: 'Royal University of Phnom Penh',
      description: 'Led and participated in various group projects at RUPP, developing teamwork skills, project management abilities, and technical expertise in collaborative environments.',
      technologies: ['Java', 'Python', 'Web Development', 'Database'],
      type: 'work',
    },
    {
      year: '2022 – Present',
      title: 'Computer Science Student',
      company: 'Royal University of Phnom Penh',
      description: 'Currently pursuing a Bachelor of Computer Science degree. Gaining comprehensive knowledge in programming, algorithms, data structures, and software engineering principles.',
      technologies: ['Java', 'Python', 'C++', 'Algorithms', 'Data Structures'],
      type: 'education',
    },
  ];

  const typeColors = {
    work: 'bg-blue-500/20 text-blue-500 border-blue-500/50',
    education: 'bg-green-500/20 text-green-500 border-green-500/50',
    project: 'bg-purple-500/20 text-purple-500 border-purple-500/50',
  };

  const typeIcons = {
    work: Briefcase,
    education: GraduationCap,
    project: FolderGit2,
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 transform md:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'}`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-0 md:left-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transform -translate-x-1/2 z-10`}
                    whileHover={{ scale: 1.5 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping" />
                  </motion.div>

                  {/* Content */}
                  <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className="p-6 hover:scale-105 transition-transform">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <Badge className={`mb-2 ${typeColors[experience.type]}`}>
                            {(() => { const Icon = typeIcons[experience.type]; return <Icon className="w-3.5 h-3.5 mr-1 inline" />; })()}
                            {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                          </Badge>
                          <div className="text-sm font-semibold text-blue-500 mb-1">
                            {experience.year}
                          </div>
                          <h3 className="text-xl font-bold">{experience.title}</h3>
                          <div className="text-gray-600 dark:text-gray-400">
                            {experience.company}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 inline-block">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Ready to work together?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-glow transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}