'use client';

import { motion } from 'framer-motion';
import { Code, Database, Smartphone, Palette, Cloud, Server } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Card } from '@/components/ui/card';

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:scale-105 transition-transform group" tilt>
                <div className="p-6 space-y-6">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 5 }}
                  >
                    <service.icon className="w-8 h-8 text-blue-500" />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold gradient-text">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
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