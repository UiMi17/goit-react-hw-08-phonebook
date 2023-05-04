import { createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from './operations';

// TODO: Переписати слайсер на роботу зі Swagger для авторизації.

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: '@@contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(fetchContactsThunk.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(addContactThunk.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(contact => {
          return contact.id !== action.payload;
        });
      })
      .addCase(deleteContactThunk.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.contacts.error = action.payload;
          state.contacts.isLoading = false;
        }
      )
      // .addMatcher(
      //   action => action.type.endsWith('/pending'),
      //   state => {
      //     state.contacts.isLoading = true;
      //     state.contacts.error = null;
      //   }
      // )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.contacts.isLoading = false;
        }
      );
  },
});

export const { addContact, setFilter, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
