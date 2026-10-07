import { type ComponentPropsWithRef } from 'react';
import { cn } from '../../lib/cn';

export interface SpinnerProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  label?: string;
}

export const Spinner = ({ className, label, ...props }: SpinnerProps) => (
  <span role="status" className={cn('inline-flex items-center', className)} {...props}>
    <span
      aria-hidden="true"
      className="size-[1em] animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    {label !== undefined && <span className="sr-only">{label}</span>}
  </span>
);
