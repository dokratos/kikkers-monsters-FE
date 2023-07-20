import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from "redux-persist";
import IPlayer from '../types/playersType';

interface IState {
  players: IPlayer[],
  status: string
}

const initialState: IState = {
  players: [],
  status: 'idle'
}
// "http://localhost:8080/users"
// "https://kikkersandmonstersb.azurewebsites.net/users"
export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const response = await axios.get("https://kikkersandmonstersb.azurewebsites.net/users");
  console.log(response.data);
  return response.data;
})

export const postPlayer = createAsyncThunk<IPlayer, {name: string, score: number}>('players/postPlayer', async ({name, score}) => {
  const response = await axios.post("https://kikkersandmonstersb.azurewebsites.net/users", { name, score });
  return (await response.data as IPlayer);
})

export const userSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postPlayer.fulfilled, (state, action) => {
        state.status = 'posted';
        state.players = state.players.concat(action.payload);
      })
      .addCase(postPlayer.pending, state => {
        state.status = 'posting';
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = 'finish';
        state.players = [action.payload].concat(state.players);
      })
      .addCase(PURGE, state => {
        state.status = 'idle';
      })
  }
})

export default userSlice.reducer