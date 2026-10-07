import { useEffect, type RefObject } from 'react';
import { getFocusable } from './focusable';

export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
): void => {
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = getFocusable(container);
    (focusable[0] ?? container).focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') return;

      const current = getFocusable(container);
      const first = current[0];
      const last = current[current.length - 1];
      if (!first || !last) {
        event.preventDefault();
        container.focus();
        return;
      }

      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      previouslyFocused?.focus();
    };
  }, [containerRef, isActive]);
};
