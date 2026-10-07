import type { Product, ProductPatch } from '../model/schema';
import type { productApi } from './product-api';

type Api = typeof productApi;
type CacheState = Parameters<Api['util']['selectCachedArgsForQuery']>[0];
type Patch = ReturnType<ReturnType<Api['util']['updateQueryData']>>;

export interface OptimisticContext {
  api: Api;
  dispatch: (action: ReturnType<Api['util']['updateQueryData']>) => Patch;
  getState: () => CacheState;
}

const patchEverywhere = (
  { api, dispatch, getState }: OptimisticContext,
  edit: (items: Product[]) => Product[],
): Patch[] => {
  const state = getState();
  const lists = api.util.selectCachedArgsForQuery(state, 'getProducts').map((args) =>
    dispatch(
      api.util.updateQueryData('getProducts', args, (draft) => {
        const next = edit(draft.items);
        draft.total += next.length - draft.items.length;
        draft.items = next;
      }),
    ),
  );
  const singles = api.util.selectCachedArgsForQuery(state, 'getProductBySlug').map((slug) =>
    dispatch(
      api.util.updateQueryData('getProductBySlug', slug, (draft) => {
        const [next] = edit([draft]);
        if (next) Object.assign(draft, next);
      }),
    ),
  );
  return [...lists, ...singles];
};

const isRealChange = ([key, value]: [string, unknown]): boolean =>
  value !== undefined && !(key === 'slug' && value === '');

export const optimisticUpdate = (
  context: OptimisticContext,
  id: string,
  patch: ProductPatch,
): Patch[] => {
  const changes = Object.fromEntries(
    Object.entries(patch).filter(isRealChange),
  ) as Partial<Product>;
  return patchEverywhere(context, (items) =>
    items.map((item) => (item.id === id ? { ...item, ...changes } : item)),
  );
};

export const optimisticDelete = (context: OptimisticContext, id: string): Patch[] =>
  patchEverywhere(context, (items) => items.filter((item) => item.id !== id));

export const rollback = (patches: Patch[]): void => {
  for (const patch of [...patches].reverse()) patch.undo();
};
