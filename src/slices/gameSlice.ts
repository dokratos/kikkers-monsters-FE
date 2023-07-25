import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";
import axios from 'axios';

interface IState {
  game: string
  theme: string,
  message: string,
  status: string
}

const initialState: IState = {
  game: '',
  theme: '',
  message: '',
  status: 'idle'
}
// "http://localhost:8080/chat"
export const getMessage = createAsyncThunk('message/fetchChat', async (params: { theme: string, game: string }) => {
  const response = await axios.get("https://kikkersandmonstersb.azurewebsites.net/chat", { params });
  return response.data;
})



export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    saveTheme: (state, action) => {
      state.theme = action.payload
    },
    saveMessage: (state, action) => {
      state.message = action.payload;
    },
    saveGame: (state, action) => {
      state.game = action.payload
    }
  },
  extraReducers(builder) {
    builder
    .addCase(getMessage.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getMessage.fulfilled, (state, action) => {
      state.status = 'won';
      state.message = action.payload;
    })
    .addCase(PURGE, () => {
      return initialState;
    })
    // .addCase(fetchImages.rejected, state => {
    //   state.status = 'rejected';
    //   state.cards = [];
    // })
  }
})

export const { saveTheme, saveMessage, saveGame } = gameSlice.actions
export default gameSlice.reducer