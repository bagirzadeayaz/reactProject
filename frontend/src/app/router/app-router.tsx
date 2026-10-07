import { DocumentMeta } from '../../shared/lib/document-meta';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StatusPage } from '../../shared/ui';
import { ErrorBoundary } from '../error-boundary';
import { appRoutes } from './app-routes';

export const AppRouter = () => {
  const { t } = useTranslation();

  const [router] = useState(() => createBrowserRouter(appRoutes));

  return (
    <ErrorBoundary
      fallback={() => (
        <>
          <DocumentMeta title={`${t('state.error')} · ${t('meta.siteName')}`} robots="noindex" />
          <StatusPage
            code="500"
            role="alert"
            title={t('state.error')}
            description={t('state.errorDetail')}
          />
        </>
      )}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
