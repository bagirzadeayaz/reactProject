import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface RevealProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const Reveal = ({ children, className, ...props }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    element.dataset.reveal = 'out';
    const show = (): void => {
      element.dataset.reveal = 'in';
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };

    const onScroll = (): void => {
      if (element.getBoundingClientRect().bottom < 0) show();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.bottom < 0))
          show();
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(element);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={cn('reveal', className)} {...props}>
      {children}
    </div>
  );
};
