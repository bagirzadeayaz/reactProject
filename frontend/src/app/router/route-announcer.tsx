import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export interface RouteAnnouncerProps {
  contentRef: React.RefObject<HTMLElement | null>;
}

const HEADING_TIMEOUT_MS = 2000;

export const RouteAnnouncer = ({ contentRef }: RouteAnnouncerProps) => {
  const { t } = useTranslation();
  const { pathname, hash } = useLocation();
  const [message, setMessage] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (hash) return;

    const content = contentRef.current;
    globalThis.scrollTo({ top: 0, behavior: 'instant' });

    let isCancelled = false;
    let observer: MutationObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const stopWatching = (): void => {
      observer?.disconnect();
      if (timer !== null) clearTimeout(timer);
    };

    const announce = (heading: HTMLHeadingElement | null): void => {
      if (isCancelled) return;
      stopWatching();

      const target = heading ?? content;
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener(
          'blur',
          () => {
            target.removeAttribute('tabindex');
          },
          { once: true },
        );
      }

      setMessage(t('a11y.navigatedTo', { page: heading?.textContent.trim() ?? pathname }));
    };

    const existing = content?.querySelector('h1');
    if (existing) {
      announce(existing);
    } else if (content) {
      observer = new MutationObserver(() => {
        const heading = content.querySelector('h1');
        if (heading) announce(heading);
      });
      observer.observe(content, { childList: true, subtree: true });
      timer = setTimeout(() => {
        announce(null);
      }, HEADING_TIMEOUT_MS);
    } else {
      announce(null);
    }

    return () => {
      isCancelled = true;
      stopWatching();
    };
  }, [pathname, hash, contentRef, t]);

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
};
