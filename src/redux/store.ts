import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './characters.reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger];

const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = (): any => useDispatch<TAppDispatch>();

export default store;
