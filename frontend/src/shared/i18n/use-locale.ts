import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { pickLocalized, type Locale, type LocalizedString } from '../api';
import { normalizeLocale } from './config';

export interface UseLocaleResult {
  locale: Locale;
  setLocale: (next: Locale) => void;

  localized: (field: LocalizedString) => string;
}

export const useLocale = (): UseLocaleResult => {
  const { i18n } = useTranslation();
  const locale = normalizeLocale(i18n.language);

  const setLocale = useCallback(
    (next: Locale) => {
      void i18n.changeLanguage(next);
    },
    [i18n],
  );

  const localized = useCallback((field: LocalizedString) => pickLocalized(field, locale), [locale]);

  return useMemo(() => ({ locale, setLocale, localized }), [locale, setLocale, localized]);
};
