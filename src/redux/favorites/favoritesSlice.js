import { createSlice } from '@reduxjs/toolkit';
import { logIn, register } from '../auth/operations';

const getSavedFavorites = () => {
  try {
    const savedData = localStorage.getItem('favorites');
    return savedData ? JSON.parse(savedData) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: getSavedFavorites(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      // Gelen objeden ID veya Name'i string olarak alıyoruz
      const newId = String(action.payload.id || action.payload.name);

      const isExist = state.items.find(
        item => String(item.id || item.name) === newId
      );

      if (!isExist) {
        // Objenin içine tutarlı bir id ekleyerek kaydediyoruz
        state.items.push({ ...action.payload, id: newId });
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },

    removeFromFavorites: (state, action) => {
      // payload direkt ID (string) olarak geliyor
      const removeId = String(action.payload);

      state.items = state.items.filter(
        item => String(item.id || item.name) !== removeId
      );

      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state) => {
        state.items = getSavedFavorites();
      })
      .addCase(register.fulfilled, (state) => {
        state.items = getSavedFavorites();
      });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
export const selectAllFavorites = (state) => state.favorites.items;