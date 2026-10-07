import { ProductTools } from '../../../features/garden-tools';
import { AddToCartButton } from '../../../features/add-to-cart';
import { ProductCard, type Product } from '../../../entities/product';
import { Reveal, Skeleton } from '../../../shared/ui';

export interface ProductGridProps {
  products: readonly Product[];
  isLoading?: boolean;

  placeholders?: number;
}

export const ProductGrid = ({
  products,
  isLoading = false,
  placeholders = 6,
}: ProductGridProps) => (
  <ul className="home-product-grid">
    {isLoading
      ? Array.from({ length: placeholders }, (_, index) => (
          <li key={index} className="pt-10">
            <Skeleton className="h-[30rem] w-full rounded-card" />
          </li>
        ))
      : products.map((product, index) => (
          <li key={product.id}>
            <Reveal className="h-full">
              <ProductCard
                product={product}
                tools={<ProductTools product={product} />}
                priority={index < 3}
                action={<AddToCartButton product={product} />}
              />
            </Reveal>
          </li>
        ))}
  </ul>
);
