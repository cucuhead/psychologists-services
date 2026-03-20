import { createSlice } from '@reduxjs/toolkit';
import { fetchPsychologists } from './operations';

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: {
    items: [],
    filter: 'Show all',
    isLoading: false,
    error: null,
  },
  reducers: {
    clearPsychologists: (state) => {
      state.items = [];
      state.error = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
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
        state.items = action.payload;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPsychologists, setFilter } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;