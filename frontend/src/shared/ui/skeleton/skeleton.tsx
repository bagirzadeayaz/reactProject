import { type ComponentPropsWithRef } from 'react';
import { cn } from '../../lib/cn';

export type SkeletonProps = Omit<ComponentPropsWithRef<'div'>, 'children'>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    aria-hidden="true"
    data-testid="skeleton"
    className={cn('animate-pulse rounded-control bg-surface-glass', className)}
    {...props}
  />
);
