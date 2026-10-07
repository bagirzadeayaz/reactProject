import { type ComponentPropsWithRef } from 'react';
import { cn } from '../../lib/cn';

export interface ImageSource {
  src: string;
  width: number;

  type?: 'image/avif' | 'image/webp';
}

const FORMAT_ORDER: NonNullable<ImageSource['type']>[] = ['image/avif', 'image/webp'];

const srcSetOf = (sources: readonly ImageSource[]): string =>
  sources.map((source) => `${source.src} ${String(source.width)}w`).join(', ');

export interface ResponsiveImageProps extends Omit<
  ComponentPropsWithRef<'img'>,
  'src' | 'srcSet' | 'width' | 'height' | 'loading'
> {
  src: string;

  sources?: readonly ImageSource[];

  width: number;
  height: number;

  priority?: boolean;
  alt: string;
}

export const ResponsiveImage = ({
  src,
  sources,
  width,
  height,
  priority = false,
  alt,
  className,
  sizes,
  ...props
}: ResponsiveImageProps) => {
  const untyped = (sources ?? []).filter((source) => source.type === undefined);
  const typed = FORMAT_ORDER.map((type) => ({
    type,
    sources: (sources ?? []).filter((source) => source.type === type),
  })).filter((group) => group.sources.length > 0);

  const img = (
    <img
      src={src}
      {...(untyped.length > 0 ? { srcSet: srcSetOf(untyped) } : {})}
      {...(sizes === undefined ? {} : { sizes })}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={cn('h-auto max-w-full', className)}
      {...props}
    />
  );

  if (typed.length === 0) return img;
  return (
    <picture>
      {typed.map((group) => (
        <source
          key={group.type}
          type={group.type}
          srcSet={srcSetOf(group.sources)}
          {...(sizes === undefined ? {} : { sizes })}
        />
      ))}
      {img}
    </picture>
  );
};
