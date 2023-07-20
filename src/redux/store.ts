import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import userReducer from '../slices/userSlice';
import memoryReducer from '../slices/memorySlice';
import scoreReducer from '../slices/scoreSlice';
import gameReducer from '../slices/gameSlice';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  game: gameReducer,
  score: scoreReducer,
  players: userReducer,
  memory: memoryReducer
})

const persistedMemory = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedMemory,
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