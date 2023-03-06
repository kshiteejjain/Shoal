import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {LOGIN_AUTH_URL} from '../../utils/Constants'
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};



export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await axios.get(`${LOGIN_AUTH_URL}${email}`, { email, password, 
  headers: {
    'X-RapidAPI-Key': 'ddbb4b30c2msh31fbe73ded6956dp1a161fjsn0b708b9dc9aa',
    'X-RapidAPI-Host': 'uers-api.p.rapidapi.com'
  }
 });
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
        state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions
export default authSlice.reducer;
