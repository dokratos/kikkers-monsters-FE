import { createSlice } from '@reduxjs/toolkit';

interface IState {
  score: number,
  status: string
}

const initialState: IState = {
  score: 0,
  status: 'idle'
}

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setFinalScore: (state, action) => {
      state.score = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase
  }
})

export const { setFinalScore } = scoreSlice.actions
export default scoreSlice.reducer