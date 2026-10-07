export const BUTTON_VARIANTS = {
  primary:
    'border-(length:--border-width-control) border-border-control text-ink-muted hover:text-ink hover:border-ink',

  'primary-with-icon':
    'border-(length:--border-width-control) border-border-control text-ink-muted hover:text-ink hover:border-ink gap-gutter',

  ghost: 'border-0 text-ink-muted hover:text-ink underline-offset-4 hover:underline',
} as const;

export const BUTTON_SIZES = {
  md: 'h-(--size-control-h) px-6 text-lg sm:min-w-(--size-control-w)',

  sm: 'h-11 px-4 text-sm',
} as const;

export const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-control font-sans transition-colors ' +
  'motion-safe:transition-[color,border-color,background-color,transform,box-shadow] motion-safe:duration-200 ' +
  'motion-safe:enabled:hover:-translate-y-0.5 motion-safe:enabled:active:scale-[0.97] ' +
  'motion-safe:[&[href]:hover]:-translate-y-0.5 motion-safe:[&[href]:active]:scale-[0.97] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-surface-footer ' +
  'disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZES;
