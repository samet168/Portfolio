import { useLanguage } from '@/features/language-provider';
import { t } from '@/lib/i18n';

export function useTranslation() {
  const { language } = useLanguage();

  return {
    language,
    t: (key: string) => t(language, key),
  };
}