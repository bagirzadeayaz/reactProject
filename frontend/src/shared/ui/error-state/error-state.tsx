import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ErrorStateProps {
  title: ReactNode;

  description?: ReactNode;

  action?: ReactNode;
  className?: string;
}

export const ErrorState = ({ title, description, action, className }: ErrorStateProps) => (
  <div
    role="alert"
    className={cn('flex flex-col items-center gap-4 px-gutter py-16 text-center', className)}
  >
    <p className="text-h2 font-(--font-weight-heading) text-ink">{title}</p>
    {description !== undefined && (
      <p className="max-w-prose text-md text-ink-muted">{description}</p>
    )}
    {action !== undefined && <div className="mt-2">{action}</div>}
  </div>
);
