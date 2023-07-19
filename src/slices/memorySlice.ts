import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';

interface IState {
  cards: string[],
  status: string
}

const initialState: IState = {
  cards: [],
  status: 'idle'
}
// "https://kikkersandmonstersb.azurewebsites.net/images"
// http://localhost:8080/images
export const fetchImages = createAsyncThunk('memory/fetchImages', async (params: {query: string, amount: number}) => {
  const response: string[] = (await axios.get("http://localhost:8080/images", { params })).data;
  return response;
})

export const memorySlice = createSlice({
  name: 'memoryGame',
  initialState,
  reducers: {
    clearPair: (state, action) => {
      state.cards = state.cards.filter(card => card !== action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'playing';
        state.cards = action.payload
      })
  }
})

export const { clearPair } = memorySlice.actions
export const selectImages = (state: RootState) => state.memory.cards;
export default memorySlice.reducer