import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { CartBadge } from '../../../entities/cart';
import { CartDrawer } from '../../../features/cart-drawer';
import { cn } from '../../../shared/lib/cn';
import { Container, Icon } from '../../../shared/ui';
import { HeaderSearch } from './header-search';
import { NavLinkList } from './nav-link-list';
import { NavigationPanel } from './navigation-panel';

export const Header = () => {
  const { t } = useTranslation(['common', 'catalog']);
  const { pathname, hash } = useLocation();
  const locationKey = pathname + hash;

  const [menu, setMenu] = useState({ isOpen: false, locationKey });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMenuOpen = menu.isOpen && menu.locationKey === locationKey;

  const setIsMenuOpen = (isOpen: boolean): void => {
    setMenu({ isOpen, locationKey });
  };

  return (
    <header className={cn('site-header relative z-40', isSearchOpen && 'site-header--search')}>
      <Container
        as="div"
        className={cn(
          'relative flex min-h-(--size-header) items-center justify-between gap-6 py-6',
          'motion-safe:transition-[padding] motion-safe:duration-300 motion-safe:ease-out',
          isSearchOpen && 'pb-28 sm:pb-6',
        )}
      >
        <Link
          to="/"
          className={cn(
            'brand rounded-icon text-logo font-(--font-weight-wordmark) text-ink-muted transition-colors hover:text-ink',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
          )}
        >
          <img src="/images/planto-logo.png" alt="" width={60} height={60} />
          {t('brand')}
        </Link>

        <nav
          aria-label={t('a11y.mainNavigation')}
          className={isSearchOpen ? 'hidden' : 'desktop-navigation'}
        >
          <NavLinkList />
        </nav>

        <div className="header-actions">
          <HeaderSearch
            isSearchOpen={isSearchOpen}
            onOpenChange={(open) => {
              setIsMenuOpen(false);
              setIsSearchOpen(open);
            }}
          />
          <CartBadge
            className="header-cart"
            label={t('checkout.basket')}
            onClick={() => {
              setIsCartOpen(true);
            }}
          />

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={isMenuOpen ? 'header-menu' : undefined}
            aria-haspopup="dialog"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsSearchOpen(false);
            }}
            className="header-menu-toggle rounded-icon p-2 text-ink-muted hover:text-ink"
          >
            <Icon name="hamburger" label={t('a11y.openMenu')} />
            <span aria-hidden="true">{t('a11y.menuNavigation')}</span>
          </button>
        </div>
      </Container>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}
      />

      <NavigationPanel
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
        }}
      />
    </header>
  );
};
