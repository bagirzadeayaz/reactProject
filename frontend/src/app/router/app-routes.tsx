import { createRoutesFromElements, Route, type RouteObject } from 'react-router-dom';

import { HomePage } from '../../pages/home';
import { AppLayout } from './app-layout';
import { RootRoute } from './root-route';
import { RouterErrorPage } from './router-error-page';
import {
  AdminProductFormPage,
  AdminProductsPage,
  CatalogPage,
  DiscoverPage,
  FinderPage,
  WishlistPage,
  ComparePage,
  StudioPage,
  TrackingPage,
  CarePage,
  BasketPage,
  CheckoutPage,
  ConfirmationPage,
  ContactPage,
  NotFoundPage,
  ProductPage,
  RequireAdmin,
  UiKitPage,
} from './routes';

export const appRoutes: RouteObject[] = createRoutesFromElements(
  <Route element={<RootRoute />} errorElement={<RouterErrorPage />}>
    <Route element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="discover" element={<DiscoverPage />} />
      <Route path="finder" element={<FinderPage />} />
      <Route path="wishlist" element={<WishlistPage />} />
      <Route path="compare" element={<ComparePage />} />
      <Route path="studio" element={<StudioPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="catalog" element={<CatalogPage />} />
      <Route path="care" element={<CarePage />} />
      <Route path="cart" element={<BasketPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="checkout/confirmation" element={<ConfirmationPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="catalog/:slug" element={<ProductPage />} />
      <Route path="admin" element={<RequireAdmin />}>
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/new" element={<AdminProductFormPage />} />
        <Route path="products/:id" element={<AdminProductFormPage />} />
      </Route>

      {import.meta.env.DEV && <Route path="ui-kit" element={<UiKitPage />} />}
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>,
);
