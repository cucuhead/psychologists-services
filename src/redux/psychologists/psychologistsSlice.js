import { createSlice } from '@reduxjs/toolkit';
import { fetchPsychologists, loadMorePsychologists } from './operations';
import { logOut } from '../auth/operations';

const initialState = {
  items: [],
  filter: 'Show all',
  isLoading: false,
  error: null,
  hasMore: false,
  cursor: null,
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.items = [];
      state.hasMore = false;
      state.cursor = null;
      state.error = null;
    },
    clearPsychologists: (state) => {
      state.items = [];
      state.hasMore = false;
      state.cursor = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.hasMore = action.payload.hasMore;
        state.cursor = action.payload.cursor;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadMorePsychologists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadMorePsychologists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, ...action.payload.items];
        state.hasMore = action.payload.hasMore;
        state.cursor = action.payload.cursor;
      })
      .addCase(loadMorePsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.filter = 'Show all';
        state.items = [];
        state.hasMore = false;
        state.cursor = null;
      });
  },
});

export const { setFilter, clearPsychologists } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;