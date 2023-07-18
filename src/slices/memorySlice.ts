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
// http://localhost:8080
export const fetchImages = createAsyncThunk('memory/fetchImages', async (params: {query: string, amount: number}) => {
  const response: string[] = (await axios.get("https://kikkersandmonstersb.azurewebsites.net/images", { params })).data;
  return response;
})

export const memorySlice = createSlice({
  name: 'memoryGame',
  initialState,
  reducers: {
    // removePair: (state, action) => {

    // }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'playing';
        state.cards = state.cards.concat(action.payload)
      })
  }
})


export const selectImages = (state: RootState) => state.memory.cards;
export default memorySlice.reducer