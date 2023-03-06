import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AuthReducers from '../features/Login/LoginSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['Auth']
}

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['isLoggedIn']
}

const rootReducer = combineReducers({
  Auth: persistReducer(authPersistConfig, AuthReducers)
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {persistedReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
