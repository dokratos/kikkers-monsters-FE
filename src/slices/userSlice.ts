import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
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

export const fetchPlayers = createAsyncThunk('player/fetchPlayers', async () => {
  const response = await axios.get("http://localhost:8080/users");
  return response.data;
})

export const userSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase
  }
})

export default userSlice.reducer