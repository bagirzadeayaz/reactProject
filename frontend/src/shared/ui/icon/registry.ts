import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Play,
  Search,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react';
import type { ComponentPropsWithRef, ComponentType } from 'react';
import { FacebookIcon, TwitterIcon, LinkedinIcon } from './social-icons';

export const ICONS = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  search: Search,
  bag: ShoppingBag,
  chevron: ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  star: Star,
  play: Play,
  hamburger: Menu,
  close: X,
} as const satisfies Record<string, ComponentType<ComponentPropsWithRef<'svg'>>>;

export type IconName = keyof typeof ICONS;
