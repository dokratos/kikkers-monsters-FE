import { configureStore } from '@reduxjs/toolkit';
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
import userReducer from './slices/userSlice';
import memoryReducer from './slices/memorySlice';

const persistConfig = {
  key: 'root',
  storage
}

const persistedMemory = persistReducer(persistConfig, memoryReducer);

export const store = configureStore({
  reducer: {
    players: userReducer,
    memory: persistedMemory
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch