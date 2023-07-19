import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
import axios from 'axios';
import IPlayer from '../types/playersType';

interface IState {
  players: IPlayer[],
  status: string
}

const initialState: IState = {
  players: [],
  status: 'idle'
}

// "https://kikkersandmonstersb.azurewebsites.net/users"
export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const response = await axios.get("http://localhost:8080/users");
  console.log(response.data);
  return response.data;
})

export const postPlayer = createAsyncThunk<IPlayer, {name: string, score: number}>('players/postPlayer', async ({name, score}) => {
  const response = await axios.post("http://localhost:8080/users", { name, score });
  return (await response.data as IPlayer);
})

export const userSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase
  }
})

export default userSlice.reducer