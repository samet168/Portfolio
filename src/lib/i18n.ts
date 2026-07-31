import en from '@/locales/en.json';
import kh from '@/locales/kh.json';

export type Language = 'en' | 'kh';
export type TranslationKey = keyof typeof en;

export const translations = {
  en,
  kh,
};

export const defaultLanguage: Language = 'en';

export function getLanguageFromPath(path: string): Language {
  const segments = path.split('/').filter(Boolean);
  const langSegment = segments[0];
  
  if (langSegment === 'en' || langSegment === 'kh') {
    return langSegment;
  }
  
  return defaultLanguage;
}

export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return defaultLanguage;
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('km')) return 'kh';
  return 'en';
}

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return defaultLanguage;
  
  const stored = localStorage.getItem('language') as Language;
  if (stored === 'en' || stored === 'kh') return stored;
  
  return defaultLanguage;
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
}

export function getInitialLanguage(): Language {
  const stored = getStoredLanguage();
  if (stored !== defaultLanguage) return stored;
  
  return getBrowserLanguage();
}

export function t(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}