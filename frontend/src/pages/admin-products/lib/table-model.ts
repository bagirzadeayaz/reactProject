import type { Product } from '../../../entities/product';
import { type Locale, pickLocalized } from '../../../shared/api';

export const SORT_KEYS = ['name', 'price', 'category', 'stock', 'created'] as const;
export type SortKey = (typeof SORT_KEYS)[number];
export type SortDirection = 'asc' | 'desc';

export interface TableSort {
  key: SortKey;
  direction: SortDirection;
}

export const DEFAULT_SORT: TableSort = { key: 'created', direction: 'desc' };

export const nextSort = (current: TableSort, key: SortKey): TableSort => ({
  key,
  direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
});

const compareBy = (key: SortKey, locale: Locale) => {
  const collator = new Intl.Collator(locale);
  switch (key) {
    case 'name':
      return (a: Product, b: Product) =>
        collator.compare(pickLocalized(a.name, locale), pickLocalized(b.name, locale));
    case 'price':
      return (a: Product, b: Product) => a.price - b.price;
    case 'category':
      return (a: Product, b: Product) => collator.compare(a.category, b.category);
    case 'stock':
      return (a: Product, b: Product) => Number(a.inStock) - Number(b.inStock);
    case 'created':
      return (a: Product, b: Product) => a.createdAt.localeCompare(b.createdAt);
  }
};

export const sortProducts = (
  items: readonly Product[],
  sort: TableSort,
  locale: Locale,
): Product[] => {
  const compare = compareBy(sort.key, locale);
  const sign = sort.direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => sign * compare(a, b));
};

export const filterProducts = (items: readonly Product[], query: string): Product[] => {
  const search = query.trim().toLowerCase();
  if (search === '') return [...items];
  return items.filter(
    (item) =>
      item.slug.includes(search) ||
      item.name.en.toLowerCase().includes(search) ||
      item.name.ru.toLowerCase().includes(search),
  );
};
