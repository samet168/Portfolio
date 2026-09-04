'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { AnimatedTitle } from '@/components/animations/animated-title';

// SVG social icons
function GithubSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function FacebookSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TelegramSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: 'samet.moeun9@gmail.com',
      action: 'copy',
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '+855 883746083',
      action: 'call',
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: 'Phnom Penh, Cambodia',
      action: null,
    },
  ];

  const socialLinks = [
    { icon: GithubSvg, href: 'https://github.com/samet168', label: 'GitHub' },
    { icon: LinkedinSvg, href: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
    { icon: FacebookSvg, href: 'https://web.facebook.com/samet.moeunsamet/', label: 'Facebook' },
    { icon: TelegramSvg, href: 'https://t.me/sametmoeun', label: 'Telegram' },
   
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success toast
    setToast({ message: t('contact.form.success'), type: 'success' });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('samet.moeun9@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedTitle
            text={t('contact.title')}
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text justify-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <Card className="p-8 space-y-6 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500">
              <h3 className="text-2xl font-bold gradient-text mb-6">
                {t('contact.info.title')}
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {info.label}
                      </div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                    {info.action === 'copy' && (
                      <motion.button
                        onClick={copyEmail}
                        className="p-2 rounded-full hover:bg-blue-500/20 text-gray-500 hover:text-blue-500 transition-colors"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {emailCopied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                  {t('contact.info.social')}
                </div>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                      whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 300 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card>

            {/* Map Card */}
            <Card className="p-6 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-indigo-500/15 flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-bounce" />
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Phnom Penh, Cambodia
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Card className="p-8 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500">
              <h3 className="text-2xl font-bold gradient-text mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('contact.form.name')}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('contact.form.email')}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('contact.form.subject')}
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('contact.form.message')}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t('contact.form.submit')}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}