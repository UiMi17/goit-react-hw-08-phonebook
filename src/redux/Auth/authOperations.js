import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearToken = () => {
  axios.defaults.headers.common.Authorization = ``;
};

export const registerUserThunk = createAsyncThunk(
  '@@auth/registerUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  '@@auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('users/login', credentials);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  '@@auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await axios.post('users/logout');
      clearToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  '@@auth/refreshUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const store = thunkAPI.getState();
      const token = store.auth.token;
      setToken(token);
    },
  }
);
