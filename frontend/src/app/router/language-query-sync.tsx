import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LANGUAGE_QUERY_PARAM, normalizeLocale, useLocale } from '../../shared/i18n';

export const LanguageQuerySync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { locale, setLocale } = useLocale();
  const urlLocale = searchParams.get(LANGUAGE_QUERY_PARAM);
  const previousLocale = useRef(locale);

  useEffect(() => {
    if (urlLocale === null) return;
    const requested = normalizeLocale(urlLocale);
    if (requested !== locale) setLocale(requested);
  }, [urlLocale, locale, setLocale]);

  useEffect(() => {
    if (previousLocale.current === locale) return;
    previousLocale.current = locale;

    if (searchParams.get(LANGUAGE_QUERY_PARAM) === locale) return;

    const next = new URLSearchParams(searchParams);
    next.set(LANGUAGE_QUERY_PARAM, locale);

    setSearchParams(next, { replace: true });
  }, [locale, searchParams, setSearchParams]);

  return null;
};
