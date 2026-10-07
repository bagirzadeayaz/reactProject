import { type ComponentPropsWithRef, type ElementType } from 'react';
import { cn } from '../../lib/cn';

export interface ContainerProps extends ComponentPropsWithRef<'div'> {
  as?: ElementType;
}

export const Container = ({ as: Component = 'div', className, ...props }: ContainerProps) => (
  <Component
    className={cn('site-container mx-auto w-full max-w-(--size-frame)', className)}
    {...props}
  />
);
