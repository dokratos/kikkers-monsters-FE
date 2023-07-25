import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';
import { PURGE } from "redux-persist";
import ITrivia from '../types/triviaTypes';
import axios from 'axios';

interface IState {
  questions: ITrivia[],
  status: string
}

const initialState: IState = {
  questions: [],
  status: 'idle'
}
// "https://kikkersandmonstersb.azurewebsites.net/trivia"
// http://localhost:8080/trivia
export const fetchQuestions = createAsyncThunk('trivia/fetchQuestions', async (params: {amount: string, category: string, difficulty: string}) => {
    const response = await axios.get("https://kikkersandmonstersb.azurewebsites.net/trivia", { params });
    console.log(response.data.result);
    return response.data.result;
})

export const triviaSlice = createSlice({
  name: 'memoryGame',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'playing';
        state.questions = action.payload
      })
      .addCase(fetchQuestions.rejected, state => {
        state.status = 'rejected';
        state.questions = [];
      })
      .addCase(PURGE, () => {
        return initialState;
      })
  }
})

export const selectQuestions = (state: RootState) => state.trivia.questions;
export default triviaSlice.reducer