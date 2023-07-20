import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';
import { PURGE } from "redux-persist";
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
    const response = await axios.get("https://kikkersandmonstersb.azurewebsites.net/images", { params });
    return response.data;
})

export const memorySlice = createSlice({
  name: 'memoryGame',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'playing';
        state.cards = action.payload
      })
      .addCase(fetchImages.rejected, state => {
        state.status = 'rejected';
        state.cards = [];
      })
      .addCase(PURGE, () => {
        return initialState;
      })
  }
})

export const selectImages = (state: RootState) => state.memory.cards;
export default memorySlice.reducer
