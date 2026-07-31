'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Calendar, Download, User } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function About() {
  const { t } = useTranslation();

  const personalInfo = [
    { icon: User, label: t('about.personalInfo.name'), value: 'Moeun Samet' },
    { icon: Mail, label: t('about.personalInfo.email'), value: 'contact@example.com' },
    { icon: MapPin, label: t('about.personalInfo.location'), value: 'Phnom Penh, Cambodia' },
    { icon: Calendar, label: t('about.personalInfo.availability'), value: 'Available for work' },
  ];

  const timeline = [
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Biography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="p-8 space-y-6">
              <h3 className="text-2xl font-bold gradient-text mb-4">Biography</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.biography')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.passion')}
              </p>
            </Card>

            {/* Personal Information */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold gradient-text mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-lg hover:bg-white/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-blue-500" />
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

            {/* Download CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Button size="lg" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                {t('about.downloadCV')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold gradient-text mb-8">Education & Experience</h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500" />

                {/* Timeline items */}
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-12"
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-3 h-3 rounded-full bg-white" />
                      </motion.div>

                      {/* Timeline content */}
                      <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
                        <div className="text-sm font-semibold text-blue-500 mb-2">
                          {item.year}
                        </div>
                        <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
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