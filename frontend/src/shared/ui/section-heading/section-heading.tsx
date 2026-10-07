import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface SectionHeadingProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export const SectionHeading = ({ children, id, className }: SectionHeadingProps) => (
  <div className={cn('section-heading text-ink', className)}>
    <h2
      {...(id === undefined ? {} : { id })}
      className="min-w-0 text-balance text-center text-h2 font-(--font-weight-heading) [text-shadow:var(--shadow-heading)] sm:text-h1"
    >
      {children}
    </h2>
  </div>
);
