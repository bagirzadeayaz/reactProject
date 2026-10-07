import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Container } from '../container';

export interface SectionProps extends Omit<ComponentPropsWithRef<'section'>, 'title'> {
  title?: ReactNode;

  titleId?: string;
  children: ReactNode;
}

export const Section = ({ title, titleId, className, children, ...props }: SectionProps) => (
  <section
    className={cn('py-12 sm:py-16 lg:py-20', className)}
    {...(title !== undefined && titleId !== undefined ? { 'aria-labelledby': titleId } : {})}
    {...props}
  >
    <Container>
      {title !== undefined && (
        <h2
          {...(titleId === undefined ? {} : { id: titleId })}
          className="mb-10 text-center text-h2 font-(--font-weight-heading) text-ink lg:text-h1"
        >
          {title}
        </h2>
      )}
      {children}
    </Container>
  </section>
);
