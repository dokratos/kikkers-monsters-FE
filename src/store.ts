import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import memoryReducer from './slices/memorySlice';


export const store = configureStore({
  reducer: {
    players: userReducer,
    memory: memoryReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch