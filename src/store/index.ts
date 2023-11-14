import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import popupReducer from './slices/popupSlice';
import confirmDialogReducer from './slices/confirmDialogSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { userApi } from './apis/userApi';
import { orderApi } from './apis/orderApi';
import { productApi } from './apis/productApi';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'order'],
};

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  popup: popupReducer,
  confirmDialog: confirmDialogReducer,
  [userApi.reducerPath]: userApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(orderApi.middleware)
      .concat(productApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
