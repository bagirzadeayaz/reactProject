import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface EmptyStateProps {
  title: ReactNode;

  description?: ReactNode;

  media?: ReactNode;

  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({ title, description, media, action, className }: EmptyStateProps) => (
  <div
    role="status"
    className={cn('flex flex-col items-center gap-4 px-gutter py-16 text-center', className)}
  >
    {media !== undefined && <div aria-hidden="true">{media}</div>}
    <p className="text-h2 font-(--font-weight-heading) text-ink">{title}</p>
    {description !== undefined && (
      <p className="max-w-prose text-md text-ink-muted">{description}</p>
    )}
    {action !== undefined && <div className="mt-2">{action}</div>}
  </div>
);
