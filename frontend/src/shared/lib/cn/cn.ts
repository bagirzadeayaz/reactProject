import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ['control', 'icon', 'avatar', 'panel', 'card'],
      text: ['display', 'h1', 'h2', 'logo', 'lg', 'md', 'base', 'sm'],
      color: [
        'ink',
        'ink-muted',
        'surface-footer',
        'surface-glass',
        'border-glass',
        'border-control',
      ],
      shadow: ['media', 'float', 'heading'],
      blur: ['panel'],
      spacing: ['page-margin', 'gutter'],
    },
  },
});

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
