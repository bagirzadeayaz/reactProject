import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  isFilterKey,
  readCatalogParams,
  writeCatalogParams,
  type CatalogParams,
} from './catalog-params';

export interface UseCatalogParamsResult {
  params: CatalogParams;

  update: (next: Partial<CatalogParams>) => void;
  reset: () => void;
}

export const useCatalogParams = (): UseCatalogParamsResult => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => readCatalogParams(searchParams), [searchParams]);

  const update = useCallback(
    (next: Partial<CatalogParams>) => {
      const resetsPage = (Object.keys(next) as (keyof CatalogParams)[]).some(isFilterKey);
      setSearchParams(
        (current) => writeCatalogParams(current, resetsPage ? { ...next, page: 1 } : next),

        { replace: true },
      );
    },
    [setSearchParams],
  );

  const reset = useCallback(() => {
    setSearchParams((current) => {
      const lang = current.get('lang');
      const out = new URLSearchParams();
      if (lang !== null) out.set('lang', lang);
      return out;
    });
  }, [setSearchParams]);

  return useMemo(() => ({ params, update, reset }), [params, update, reset]);
};
