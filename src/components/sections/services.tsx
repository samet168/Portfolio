'use client';

import { motion } from 'framer-motion';
import { Code, Database, Smartphone, Palette, Cloud, Server } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Card } from '@/components/ui/card';
import { AnimatedTitle } from '@/components/animations/animated-title';

interface Service {
  icon: any;
  title: string;
  description: string;
  features: string[];
}

export function Services() {
  const { t } = useTranslation();

  const services: Service[] = [
    {
      icon: Code,
      title: t('services.fullStack.title'),
      description: t('services.fullStack.description'),
      features: ['React & Next.js', ' Python', 'Database Integration', 'API Development'],
    },
    {
      icon: Server,
      title: t('services.backend.title'),
      description: t('services.backend.description'),
      features: ['RESTful APIs', 'GraphQL', 'Authentication', 'Microservices'],
    },
    // {
    //   icon: Smartphone,
    //   title: t('services.mobile.title'),
    //   description: t('services.mobile.description'),
    //   features: ['Flutter', 'React Native', 'iOS & Android', 'Cross-platform'],
    // },
    // {
    //   icon: Palette,
    //   title: t('services.uiux.title'),
    //   description: t('services.uiux.description'),
    //   features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    // },
    // {
    //   icon: Cloud,
    //   title: t('services.saas.title'),
    //   description: t('services.saas.description'),
    //   features: ['Cloud Architecture', 'Scalability', 'Security', ],
    // },
    {
      icon: Database,
      title: t('services.database.title'),
      description: t('services.database.description'),
      features: ['SQL ', 'Data Modeling', 'Optimization', 'Migration'],
    },
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedTitle
            text={t('services.title')}
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text justify-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            {t('services.subtitle')}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Card className="p-8 h-full flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500 group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/25 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-blue-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="p-8 text-center">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Need a custom solution?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              I offer custom development services tailored to your specific needs. Let's discuss how I can help bring your vision to life.
            </p>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-glow transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discuss Your Project
            </motion.button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}