import { gardenSlice, loadGarden } from '../../entities/garden';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { cartActions, cartSlice, loadCart } from '../../entities/cart';
import { companionActions, companionSlice, loadCompanion } from '../../entities/companion';
import { baseApi } from '../../shared/api';

export const makeStore = () => {
  const persistedCart = loadCart();
  const reactions = createListenerMiddleware();
  reactions.startListening({
    actionCreator: cartActions.added,
    effect: (_action, api) => {
      api.dispatch(companionActions.reacted('cart'));
    },
  });
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [cartSlice.reducerPath]: cartSlice.reducer,
      garden: gardenSlice.reducer,
      companion: companionSlice.reducer,
    },
    preloadedState: {
      garden: loadGarden(),
      companion: loadCompanion(),
      cart: persistedCart ?? { lines: [] },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(reactions.middleware).concat(baseApi.middleware),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
