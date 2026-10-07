import { type ComponentPropsWithRef, type ElementType } from 'react';
import { cn } from '../../lib/cn';

export type CardTone = 'glass' | 'plain';

export interface CardProps extends ComponentPropsWithRef<'div'> {
  as?: ElementType;

  tone?: CardTone;
}

const TONES: Record<CardTone, string> = {
  glass:
    'bg-surface-glass border-(length:--border-width-panel) border-border-glass backdrop-blur-panel',
  plain: 'bg-transparent',
};

export const Card = ({ as: Component = 'div', tone = 'glass', className, ...props }: CardProps) => (
  <Component className={cn('overflow-hidden rounded-panel', TONES[tone], className)} {...props} />
);
