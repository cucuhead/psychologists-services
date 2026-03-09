import { createSlice } from '@reduxjs/toolkit';

// Sayfa yenilendiğinde favorileri LocalStorage'dan geri yükle
const initialState = {
  items: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      // Zaten favorilerde değilse ekle
      const isExist = state.items.find(item => item.id === action.payload.id);
      if (!isExist) {
        state.items.push(action.payload);
        // Güncel listeyi LocalStorage'a kaydet
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFromFavorites: (state, action) => {
      // ID üzerinden listeden çıkar
      state.items = state.items.filter(item => item.id !== action.payload);
      // Güncel listeyi LocalStorage'a kaydet
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;