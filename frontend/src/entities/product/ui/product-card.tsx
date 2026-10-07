import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useFormatters, useLocale } from '../../../shared/i18n';
import { cn } from '../../../shared/lib/cn';
import { ResponsiveImage } from '../../../shared/ui';
import { PRODUCT_IMAGE_SIZE, productImageSources } from '../lib/product-image';
import type { Product } from '../model/schema';

export interface ProductCardProps {
  product: Product;

  action?: ReactNode;
  tools?: ReactNode;

  priority?: boolean;

  headingLevel?: 2 | 3;
  className?: string;
}

export const ProductCard = ({
  product,
  action,
  tools,
  priority = false,
  headingLevel = 3,
  className,
}: ProductCardProps) => {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const reducedMotion = useReducedMotion();
  const { t } = useTranslation('product');
  const { locale, localized } = useLocale();
  const format = useFormatters(locale);
  const name = localized(product.name);
  const { pathname, search } = useLocation();
  const returnState = pathname === '/catalog' ? { catalogReturnTo: pathname + search } : undefined;

  return (
    <motion.article
      whileHover={reducedMotion ? {} : { y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'product-card linked-product flex h-full flex-col',
        'backdrop-blur-panel',
        className,
      )}
    >
      <Link
        to={`/catalog/${product.slug}`}
        state={returnState}
        aria-hidden="true"
        tabIndex={-1}
        className="product-card-hitarea"
      />
      {tools && <div className="product-card__tools">{tools}</div>}

      <Link
        to={`/catalog/${product.slug}`}
        state={returnState}
        tabIndex={-1}
        aria-hidden="true"
        className="product-card__image group"
      >
        <ResponsiveImage
          src={product.imageUrl}
          sources={productImageSources(product)}
          width={PRODUCT_IMAGE_SIZE}
          height={PRODUCT_IMAGE_SIZE}
          sizes="(min-width: 1024px) 512px, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          alt=""
          className="mx-auto object-contain drop-shadow-media"
        />
      </Link>

      <div className="product-card__copy flex flex-1 flex-col gap-3">
        <Heading className="text-h2 text-ink-muted">
          <Link to={`/catalog/${product.slug}`} state={returnState} className="hover:text-ink">
            {name}
          </Link>
        </Heading>
        <p className="product-card__description line-clamp-2 text-md text-ink-muted">
          {localized(product.description)}
        </p>
        <p
          className="product-card__stock text-sm text-ink-muted"
          data-available={
            product.inStock &&
            (!product.variants?.length || product.variants.some((variant) => variant.stock > 0))
          }
        >
          {t(
            product.inStock &&
              (!product.variants?.length || product.variants.some((variant) => variant.stock > 0))
              ? 'inStock'
              : 'outOfStock',
          )}
        </p>
      </div>

      <div className="product-card__price flex items-center justify-between gap-4">
        <p className="text-h2 text-ink-muted">
          {product.variants && new Set(product.variants.map((variant) => variant.price)).size > 1
            ? t('options.from', { price: format.currency(product.price, product.currency) })
            : format.currency(product.price, product.currency)}
        </p>
        {action}
      </div>
    </motion.article>
  );
};
