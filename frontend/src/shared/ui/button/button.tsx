import { type ComponentPropsWithoutRef, type ReactNode, type Ref } from 'react';
import { cn } from '../../lib/cn';
import { Spinner } from '../spinner';
import {
  BUTTON_BASE,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  type ButtonSize,
  type ButtonVariant,
} from './variants';

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;

  isLoading?: boolean;

  loadingLabel?: string;

  icon?: ReactNode;
  children: ReactNode;
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonOwnProps | 'ref'> & {
    as?: 'button';
    ref?: Ref<HTMLButtonElement>;
  };

type ButtonAsAnchor = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof ButtonOwnProps | 'ref'> & {
    as: 'a';
    ref?: Ref<HTMLAnchorElement>;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingLabel,
  icon,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const classes = cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className);
  const content = isLoading ? (
    <Spinner {...(loadingLabel === undefined ? {} : { label: loadingLabel })} />
  ) : (
    children
  );

  if (rest.as === 'a') {
    const { as: _as, href, ref, ...anchorProps } = rest;
    return (
      <a
        {...anchorProps}
        ref={ref}
        {...(isLoading || href === undefined ? {} : { href })}
        aria-disabled={isLoading || undefined}
        aria-busy={isLoading || undefined}
        className={classes}
      >
        {content}
        {icon}
      </a>
    );
  }

  const { as: _as, ref, disabled, type, ...buttonProps } = rest;
  return (
    <button
      {...buttonProps}
      ref={ref}
      type={type ?? 'button'}
      disabled={disabled === true || isLoading}
      aria-busy={isLoading || undefined}
      className={classes}
    >
      {content}
      {icon}
    </button>
  );
};
