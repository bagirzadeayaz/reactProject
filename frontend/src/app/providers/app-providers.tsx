import { useEffect, useState, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { initI18n } from '../../shared/i18n';
import { makeStore, type AppStore } from '../store';
import { connectStore } from '../store/store-lifecycle';

export interface AppProvidersProps {
  children: ReactNode;

  store?: AppStore;
}

export const AppProviders = ({ children, store }: AppProvidersProps) => {
  const [ownStore] = useState<AppStore>(() => store ?? makeStore());
  const [i18nInstance] = useState(() => initI18n());
  const activeStore = store ?? ownStore;
  useEffect(() => connectStore(activeStore), [activeStore]);

  return (
    <I18nextProvider i18n={i18nInstance}>
      <Provider store={activeStore}>{children}</Provider>
    </I18nextProvider>
  );
};
