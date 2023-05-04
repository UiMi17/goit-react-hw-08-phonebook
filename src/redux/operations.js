import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// TODO: Переписати Thunks на Swagger для реєстрації та логінізації користувача

export const fetchContactsThunk = createAsyncThunk(
  '@@contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  '@@contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', {
        ...contact,
      });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  '@@contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const store = thunkAPI.getState();
      const loading = store.contacts.contacts.isLoading;
      if (loading) {
        return false;
      }
    },
  }
);
