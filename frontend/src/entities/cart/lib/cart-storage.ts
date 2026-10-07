import type { CartLine, CartState } from '../model/cart-slice';
import { DELIVERY_AREAS } from '../../../shared/commerce';

export const CART_STORAGE_KEY = 'planto:cart';

const isCartLine = (value: unknown): value is CartLine => {
  if (typeof value !== 'object' || value === null) return false;
  if (!('productId' in value) || typeof value.productId !== 'string') return false;
  if (!('quantity' in value) || typeof value.quantity !== 'number') return false;

  return (
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    value.quantity <= 99 &&
    (!('variantId' in value) ||
      value.variantId === undefined ||
      typeof value.variantId === 'string')
  );
};

const isCartState = (value: unknown): value is CartState => {
  if (typeof value !== 'object' || value === null) return false;
  if (!('lines' in value) || !Array.isArray(value.lines)) return false;

  const validArea =
    !('area' in value) ||
    value.area === undefined ||
    DELIVERY_AREAS.some((area) => area === value.area);
  return validArea && value.lines.every(isCartLine);
};

export const loadCart = (): CartState | undefined => {
  try {
    const raw = globalThis.localStorage.getItem(CART_STORAGE_KEY);
    if (raw === null) return undefined;
    const parsed: unknown = JSON.parse(raw);
    return isCartState(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
};

export const saveCart = (state: CartState): void => {
  try {
    globalThis.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
};
