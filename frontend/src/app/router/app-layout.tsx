import { Suspense, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import { PlantCompanion } from '../../widgets/plant-companion';
import { MobileNavigation, PageTrail } from '../../widgets/site-navigation';
import { RouteAnchor } from './route-anchor';
import { Spinner, ToastProvider } from '../../shared/ui';
import { RouteAnnouncer } from './route-announcer';

const MAIN_ID = 'main-content';
const FOCUSED_PAGES = new Set(['/cart', '/tracking', '/compare', '/finder', '/studio']);

export const AppLayout = () => {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const showFooter = !(/^\/(admin|checkout)(\/|$)/.test(pathname) || FOCUSED_PAGES.has(pathname));

  const [initialPathname] = useState(pathname);

  return (
    <ToastProvider
      headless
      latestOnly
      regionLabel={t('a11y.notifications')}
      dismissLabel={t('a11y.dismissNotification')}
    >
      <div
        className={`storefront flex min-h-screen flex-col${pathname === '/' ? ' storefront--home' : ''}`}
      >
        <a
          href={`#${MAIN_ID}`}
          className="sr-only rounded-control bg-ink px-4 py-2 text-surface-footer focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          {t('a11y.skipToContent')}
        </a>

        <Header />

        <main id={MAIN_ID} ref={mainRef} className="min-w-0 flex-1">
          <PageTrail />
          <Suspense
            fallback={
              <div className="flex justify-center py-24">
                <Spinner label={t('a11y.loading')} className="text-h2 text-ink" />
              </div>
            }
          >
            <div key={pathname} className={pathname === initialPathname ? undefined : 'page-enter'}>
              <Outlet />
            </div>
          </Suspense>
        </main>

        {showFooter && <Footer />}
        <MobileNavigation />
        <PlantCompanion />
        <RouteAnchor />
        <RouteAnnouncer contentRef={mainRef} />
      </div>
    </ToastProvider>
  );
};
