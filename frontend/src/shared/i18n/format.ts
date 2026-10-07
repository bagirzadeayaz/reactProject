import { useMemo } from 'react';
import type { Locale } from '../api';

export const formatCurrency = (value: number, currency: string, locale: Locale): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number, locale: Locale): string =>
  new Intl.NumberFormat(locale).format(value);

export const formatDate = (value: string | Date, locale: Locale): string =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(value));

export interface Formatters {
  currency: (value: number, currency: string) => string;
  number: (value: number) => string;
  date: (value: string | Date) => string;
}

export const useFormatters = (locale: Locale): Formatters =>
  useMemo(
    () => ({
      currency: (value, currency) => formatCurrency(value, currency, locale),
      number: (value) => formatNumber(value, locale),
      date: (value) => formatDate(value, locale),
    }),
    [locale],
  );
