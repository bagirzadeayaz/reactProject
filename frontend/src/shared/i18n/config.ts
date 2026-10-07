import i18n, { type i18n as I18nInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '../api';
import { DEFAULT_NAMESPACE, NAMESPACES, resources } from './resources';

export const LANGUAGE_STORAGE_KEY = 'planto:lang';
export const LANGUAGE_QUERY_PARAM = 'lang';

const isLocale = (value: string | undefined): value is Locale =>
  value !== undefined && (LOCALES as readonly string[]).includes(value);

export const normalizeLocale = (value: string | undefined): Locale => {
  const base = value?.split('-')[0];
  return isLocale(base) ? base : DEFAULT_LOCALE;
};

export const syncDocumentLanguage = (instance: I18nInstance): void => {
  if (typeof document === 'undefined') return;
  const locale = normalizeLocale(instance.language);
  document.documentElement.lang = locale;
  document.title = instance.t('brand', { ns: 'common' });
};

export const initI18n = (): I18nInstance => {
  if (i18n.isInitialized) return i18n;

  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      ns: [...NAMESPACES],
      defaultNS: DEFAULT_NAMESPACE,
      fallbackLng: DEFAULT_LOCALE,
      supportedLngs: [...LOCALES],

      load: 'languageOnly',
      nonExplicitSupportedLngs: true,
      returnNull: false,
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        lookupQuerystring: LANGUAGE_QUERY_PARAM,
        lookupLocalStorage: LANGUAGE_STORAGE_KEY,
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false,
      },
    });

  syncDocumentLanguage(i18n);
  i18n.on('languageChanged', () => {
    syncDocumentLanguage(i18n);
  });

  return i18n;
};

export { i18n };
