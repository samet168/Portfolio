'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Calendar, User } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Card } from '@/components/ui/card';
import { AnimatedTitle } from '@/components/animations/animated-title';

export function About() {
  const { t } = useTranslation();

  const personalInfo = [
    { icon: User, label: t('about.personalInfo.name'), value: 'Moeun Samet' },
    { icon: Mail, label: t('about.personalInfo.email'), value: 'samet.moeun9@gmail.com' },
    { icon: MapPin, label: t('about.personalInfo.location'), value: 'Phnom Penh, Cambodia' },
    { icon: Calendar, label: t('about.personalInfo.availability'), value: 'Available for work' },
  ];

  const timeline = [
    {
      year: '01 Jul 2026 – 31 Sep 2026',
      title: 'Full Stack Developer Intern - iOne',
      description: 'Completed a 3-month internship gaining real-world experience in microservices architecture, server deployment, and team collaboration.',
    },
    {
      year: '2022 – Present',
      title: 'Royal University of Phnom Penh (RUPP)',
      description: 'Bachelor of Computer Science - Currently pursuing a degree in Computer Science with focus on software development.',
    },
    {
      year: '2024 – 2025',
      title: 'ETEC Training Center',
      description: 'Successfully passed the exam and received a scholarship at the ETEC Training Center.',
    },
    {
      year: '2024',
      title: 'Phone Shop Project',
      description: 'Participated in creating a Phone Shop Project after completing the C++ Course at ANT Training.',
    },
    {
      year: '2025',
      title: 'University Projects',
      description: 'Collaborated on various group projects at RUPP, enhancing teamwork and technical skills.',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedTitle
            text={t('about.title')}
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text justify-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Biography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <Card className="p-8 space-y-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
              <h3 className="text-2xl font-bold gradient-text mb-4">Biography</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.biography')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.passion')}
              </p>
            </Card>

            {/* Personal Information */}
            <Card className="p-8 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
              <h3 className="text-2xl font-bold gradient-text mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-white/50 dark:bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {info.label}
                      </div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Card className="p-8 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
              <h3 className="text-2xl font-bold gradient-text mb-8">Education & Experience</h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-indigo-500" />

                {/* Timeline items */}
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative pl-12"
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/30"
                        whileHover={{ scale: 1.25, rotate: 180, transition: { duration: 0.4 } }}
                      >
                        <div className="w-3 h-3 rounded-full bg-white" />
                      </motion.div>

                      {/* Timeline content */}
                      <motion.div 
                        whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
                        className="glass rounded-xl p-6 border border-white/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                      >
                        <div className="text-sm font-semibold text-blue-500 mb-2">
                          {item.year}
                        </div>
                        <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}