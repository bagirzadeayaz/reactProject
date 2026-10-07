export const CATALOG_SORTS = ['newest', 'price-asc', 'price-desc', 'name-asc'] as const;
export type CatalogSort = (typeof CATALOG_SORTS)[number];

export interface CatalogParams {
  search: string;
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  sort: CatalogSort;
  page: number;
}

export const DEFAULT_CATALOG_PARAMS: CatalogParams = {
  search: '',
  category: null,
  minPrice: null,
  maxPrice: null,
  inStock: false,
  sort: 'newest',
  page: 1,
};

const isSort = (value: string | null): value is CatalogSort =>
  CATALOG_SORTS.some((sort) => sort === value);

const nonNegative = (value: string | null): number | null => {
  if (value === null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

export const readCatalogParams = (params: URLSearchParams): CatalogParams => {
  const sort = params.get('sort');
  return {
    search: params.get('search') ?? '',
    category: params.get('category'),
    minPrice: nonNegative(params.get('minPrice')),
    maxPrice: nonNegative(params.get('maxPrice')),
    inStock: params.get('inStock') === 'true',
    sort: isSort(sort) ? sort : DEFAULT_CATALOG_PARAMS.sort,
    page: Math.max(1, Number.parseInt(params.get('page') ?? '1', 10) || 1),
  };
};

export const writeCatalogParams = (
  current: URLSearchParams,
  next: Partial<CatalogParams>,
): URLSearchParams => {
  const merged = { ...readCatalogParams(current), ...next };
  const params = new URLSearchParams(current);
  const setParam = (key: string, value: string | null): void => {
    if (value === null || value === '') params.delete(key);
    else params.set(key, value);
  };
  setParam('search', merged.search.trim());
  setParam('category', merged.category);
  setParam('minPrice', merged.minPrice === null ? null : String(merged.minPrice));
  setParam('maxPrice', merged.maxPrice === null ? null : String(merged.maxPrice));
  setParam('inStock', merged.inStock ? 'true' : null);
  setParam('sort', merged.sort === 'newest' ? null : merged.sort);
  setParam('page', merged.page <= 1 ? null : String(merged.page));
  return params;
};

export const isFilterKey = (key: keyof CatalogParams): boolean => key !== 'page';
