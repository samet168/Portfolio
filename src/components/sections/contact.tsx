'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { AnimatedTitle } from '@/components/animations/animated-title';

const exactMapLink = 'https://maps.app.goo.gl/s1WYpoYj9tdrDR1PA?g_st=ic';
const mapEmbedUrl = 'https://maps.google.com/maps?q=Phnom%20Penh%2C%20Cambodia&z=12&output=embed';

function GithubSvg({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.78 2.45 3.42 1.76.1-.72.39-1.22.7-1.5-2.48-.28-5.1-1.24-5.1-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.43 3.04-1.14 3.04-1.14.61 1.54.23 2.68.12 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.63 5.23-5.12 5.5.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
}
function LinkedinSvg({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" /></svg>;
}
function FacebookSvg({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.88v2.27h3.34l-.53 3.49h-2.81V24C19.61 23.09 24 18.09 24 12.07Z" /></svg>;
}
function TelegramSvg({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.8 2.2 18.6 21c-.24 1.35-.98 1.68-1.98 1.05l-5.46-4.02-2.64 2.54c-.29.29-.53.53-1.09.53l.39-5.57L17.6 6.1c.42-.4-.09-.62-.65-.22L4.1 14.13l-5.42-1.7c-1.18-.37-1.2-1.18.25-1.75L20.45 1.35c.99-.36 1.84.22 1.35.85Z" transform="translate(1 0) scale(.96)" /></svg>;
}

const socialLinks = [
  { icon: GithubSvg, href: 'https://github.com/samet168', label: 'GitHub' },
  { icon: LinkedinSvg, href: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
  { icon: FacebookSvg, href: 'https://web.facebook.com/samet.moeunsamet/', label: 'Facebook' },
  { icon: TelegramSvg, href: 'https://t.me/sametmoeun', label: 'Telegram' },
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('samet.moeun9@gmail.com');
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setToast({ message: 'Could not copy email. Please copy it manually.', type: 'error' });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:samet.moeun9@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <AnimatedTitle text={t('contact.title')} className="mb-4 justify-center text-4xl font-bold md:text-5xl gradient-text" />
          <p className="text-base leading-7 text-gray-600 dark:text-gray-400 md:text-lg">{t('contact.subtitle')}</p>
        </header>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-5">
            <Card className="space-y-5 p-6 sm:p-8">
              <div><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-cyan-700 dark:text-cyan-300">Let&apos;s connect</p><h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('contact.info.title')}</h3></div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4 dark:border-white/10"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-300"><Mail className="h-5 w-5" /></span><div className="min-w-0 flex-1"><p className="text-xs text-gray-500 dark:text-gray-400">{t('contact.info.email')}</p><a className="break-all text-sm font-medium text-gray-900 dark:text-white" href="mailto:samet.moeun9@gmail.com">samet.moeun9@gmail.com</a></div><button type="button" onClick={copyEmail} aria-label="Copy email" className="rounded-lg p-2 text-gray-500 hover:bg-sky-500/10">{emailCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}</button></div>
                <a href="tel:+855883746083" className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4 dark:border-white/10"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-500/10 text-violet-700 dark:text-violet-300"><Phone className="h-5 w-5" /></span><span><span className="block text-xs text-gray-500 dark:text-gray-400">{t('contact.info.phone')}</span><span className="text-sm font-medium text-gray-900 dark:text-white">+855 883746083</span></span></a>
                <a href={exactMapLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4 dark:border-white/10"><span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-300"><MapPin className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block text-xs text-gray-500 dark:text-gray-400">{t('contact.info.location')}</span><span className="text-sm font-medium text-gray-900 dark:text-white">Phnom Penh, Cambodia</span></span><ExternalLink className="h-4 w-4 text-gray-400" /></a>
              </div>
              <div className="border-t border-gray-200 pt-4 dark:border-white/10"><p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">{t('contact.info.social')}</p><div className="flex gap-2">{socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 text-gray-600 hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:text-gray-300 dark:hover:text-sky-300"><social.icon className="h-4 w-4" /></a>)}</div></div>
            </Card>

            <Card className="overflow-hidden p-2 sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-[#11151b] sm:aspect-video">
                <iframe title="Map of Phnom Penh, Cambodia" src={mapEmbedUrl} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                <a href={exactMapLink} target="_blank" rel="noopener noreferrer" className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-gray-900 shadow-lg hover:bg-white"><MapPin className="h-3.5 w-3.5 text-rose-600" />Open exact location<ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .08 }}>
            <Card className="h-full p-6 sm:p-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-cyan-700 dark:text-cyan-300">Have a project in mind?</p><h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Send a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2"><label className="space-y-2"><span className="block text-sm font-medium">{t('contact.form.name')}</span><Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" required /></label><label className="space-y-2"><span className="block text-sm font-medium">{t('contact.form.email')}</span><Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required /></label></div>
                <label className="block space-y-2"><span className="block text-sm font-medium">{t('contact.form.subject')}</span><Input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Project inquiry" required /></label>
                <label className="block space-y-2"><span className="block text-sm font-medium">{t('contact.form.message')}</span><Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell me about your project..." rows={7} required /></label>
                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}><Send className="mr-2 h-4 w-4" />{t('contact.form.submit')}</Button><p className="text-center text-xs text-gray-500 dark:text-gray-400">Your email application opens with the message ready to send.</p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}
