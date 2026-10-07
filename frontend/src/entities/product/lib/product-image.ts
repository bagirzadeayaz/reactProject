import type { ImageSource } from '../../../shared/ui';
import type { Product } from '../model/schema';

export const PRODUCT_IMAGE_WIDTHS = [400, 800, 1200] as const;

export const PRODUCT_IMAGE_SIZE = 800;

export const productImageSources = (product: Pick<Product, 'imageUrl'>): ImageSource[] => {
  const match = /^\/plants\/([a-z0-9-]+)\.png$/.exec(product.imageUrl);
  if (!match) return [];
  const slug = match[1] ?? '';
  return (['image/avif', 'image/webp'] as const).flatMap((type) =>
    PRODUCT_IMAGE_WIDTHS.map((width) => ({
      src: `/plants/${slug}-${String(width)}.${type === 'image/avif' ? 'avif' : 'webp'}`,
      width,
      type,
    })),
  );
};
