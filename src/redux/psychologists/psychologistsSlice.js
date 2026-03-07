import { createSlice } from '@reduxjs/toolkit';
import { fetchPsychologists } from './operations';

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    hasMore: true,
    nextIndex: 0
  },
  reducers: {
    clearPsychologists: (state) => {
      state.items = [];
      state.nextIndex = 0;
      state.hasMore = true;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;

        // startIndex (action.meta.arg) 0 ise (ilk yükleme) listeyi yenile
        if (action.meta.arg === 0) {
          state.items = action.payload.psychologists;
        } else {
          // Değilse, gelen her şeyi direkt sonuna ekle (En basit yöntem)
          state.items = [...state.items, ...action.payload.psychologists];
        }

        state.nextIndex = action.payload.nextIndex;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPsychologists } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;