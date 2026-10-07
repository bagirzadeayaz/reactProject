import { DocumentMeta } from '../../shared/lib/document-meta';
import { useTranslation } from 'react-i18next';
import { StatusPage } from '../../shared/ui';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <DocumentMeta title={`${t('notFound.title')} · ${t('meta.siteName')}`} robots="noindex" />
      <StatusPage code="404" title={t('notFound.title')} description={t('notFound.body')} />
    </>
  );
};
