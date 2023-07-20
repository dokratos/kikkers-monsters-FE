import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";

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
      state.status = 'complete'
    }
  },
  extraReducers(builder) {
    builder
    .addCase(PURGE, () => {
      return initialState;
    })
  }
})

export const { setFinalScore } = scoreSlice.actions
export default scoreSlice.reducer