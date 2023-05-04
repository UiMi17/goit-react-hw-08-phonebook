import { createSlice } from '@reduxjs/toolkit';
import {
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from './authOperations';

const initialState = {
  token: null,
  user: {
    name: '',
    email: '',
    password: '',
  },
  error: null,
  isLoading: false,
  online: false,
};

const authSlice = createSlice({
  name: '@@auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.online = true;
      })
      .addCase(registerUserThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.online = true;
      })
      .addCase(loginUserThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.online = true;
      })
      .addCase(refreshUserThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, state => {
        state.token = '';
        state.user = '';
        state.online = false;
      })
      .addCase(logoutUserThunk.pending, state => {
        state.isLoading = true;
      })
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
