import { type ComponentPropsWithRef } from 'react';
import { cn } from '../../lib/cn';
import { ICONS, type IconName } from './registry';

export type IconSize = 'md' | 'lg';

export interface IconProps extends Omit<ComponentPropsWithRef<'svg'>, 'children'> {
  name: IconName;
  size?: IconSize;

  label?: string;
}

const SIZES: Record<IconSize, string> = {
  md: 'size-(--size-icon)',
  lg: 'size-(--size-icon-lg)',
};

export const Icon = ({ name, size = 'md', label, className, ...props }: IconProps) => {
  const Glyph = ICONS[name];
  return (
    <Glyph
      className={cn('shrink-0', SIZES[size], className)}
      {...(label === undefined
        ? { 'aria-hidden': true, focusable: false }
        : { role: 'img', 'aria-label': label })}
      {...props}
    />
  );
};
