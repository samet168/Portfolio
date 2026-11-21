'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check, ExternalLink, Github, Linkedin, Facebook } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { AnimatedTitle } from '@/components/animations/animated-title';

const mapLink = 'https://maps.app.goo.gl/s1WYpoYj9tdrDR1PA?g_st=ic';
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent('https://maps.app.goo.gl/s1WYpoYj9tdrDR1PA')}&output=embed`;

const socials = [
  { icon: Github, href: 'https://github.com/samet168', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://web.facebook.com/samet.moeunsamet/', label: 'Facebook' },
  { icon: Send, href: 'https://t.me/sametmoeun', label: 'Telegram' },
];

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:samet.moeun9@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
    setToast({ message: 'Your email app should open with the message ready to send.', type: 'success' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('samet.moeun9@gmail.com');
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setToast({ message: 'Could not copy the email. Please copy it manually.', type: 'error' });
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <AnimatedTitle text={t('contact.title')} className="mb-4 justify-center text-4xl font-bold md:text-5xl gradient-text" />
          <p className="text-base leading-7 text-gray-600 dark:text-gray-400 md:text-lg">{t('contact.subtitle')}</p>
        </header>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
            <Card className="space-y-6 p-6 sm:p-8">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">Let&apos;s connect</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('contact.info.title')}</h3>
              </div>

              <div className="space-y-3">
                <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-gray-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-300"><Mail className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1"><p className="text-xs text-gray-500 dark:text-gray-400">{t('contact.info.email')}</p><a className="break-all text-sm font-medium text-gray-900 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-300" href="mailto:samet.moeun9@gmail.com">samet.moeun9@gmail.com</a></div>
                  <button type="button" onClick={copyEmail} className="rounded-lg p-2 text-gray-500 transition hover:bg-sky-500/10 hover:text-sky-600" aria-label="Copy email">{emailCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}</button>
                </div>

                <a href="tel:+855883746083" className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white/70 p-4 transition hover:border-sky-400/50 dark:border-white/10 dark:bg-white/[0.03]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-300"><Phone className="h-5 w-5" /></span>
                  <span><span className="block text-xs text-gray-500 dark:text-gray-400">{t('contact.info.phone')}</span><span className="text-sm font-medium text-gray-900 dark:text-white">+855 883746083</span></span>
                </a>

                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white/70 p-4 transition hover:border-sky-400/50 dark:border-white/10 dark:bg-white/[0.03]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300"><MapPin className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-xs text-gray-500 dark:text-gray-400">{t('contact.info.location')}</span><span className="text-sm font-medium text-gray-900 dark:text-white">Phnom Penh, Cambodia</span></span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-gray-400" />
                </a>
              </div>

              <div className="border-t border-gray-200 pt-5 dark:border-white/10">
                <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">{t('contact.info.social')}</p>
                <div className="flex flex-wrap gap-2">
                  {socials.map(({ icon: Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 text-gray-600 transition hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-sky-600 dark:border-white/10 dark:text-gray-300 dark:hover:text-sky-300"><Icon className="h-4 w-4" /></a>)}
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden p-2 sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-[#11151b] sm:aspect-[16/9] lg:aspect-[4/3]">
                <iframe
                  title="Google Maps location in Phnom Penh, Cambodia"
                  src={mapEmbed}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/75 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition hover:bg-black/90">
                  <MapPin className="h-3.5 w-3.5" /> Open exact pin in Google Maps <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <Card className="h-full p-6 sm:p-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">Have a project in mind?</p>
              <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Send a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2"><span className="block text-sm font-medium">{t('contact.form.name')}</span><Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" required /></label>
                  <label className="space-y-2"><span className="block text-sm font-medium">{t('contact.form.email')}</span><Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required /></label>
                </div>
                <label className="block space-y-2"><span className="block text-sm font-medium">{t('contact.form.subject')}</span><Input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Project inquiry" required /></label>
                <label className="block space-y-2"><span className="block text-sm font-medium">{t('contact.form.message')}</span><Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell me a little about what you need..." rows={7} required /></label>
                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}><Send className="mr-2 h-4 w-4" />{t('contact.form.submit')}</Button>
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">Your email application opens with the message ready to send.</p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}
