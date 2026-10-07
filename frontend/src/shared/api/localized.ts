export const LOCALES = ['en', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export type LocalizedString = Record<Locale, string>;

export const pickLocalized = (field: LocalizedString, locale: Locale): string =>
  field[locale] || field[DEFAULT_LOCALE];
