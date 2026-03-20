import { createSlice } from '@reduxjs/toolkit';
import { logIn, register, logOut } from '../auth/operations';

const getSavedFavorites = (uid) => {
  try {
    const savedData = localStorage.getItem(`favorites_${uid}`);
    return savedData ? JSON.parse(savedData) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (uid, items) => {
  localStorage.setItem(`favorites_${uid}`, JSON.stringify(items));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    uid: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      const { uid, ...psychologist } = action.payload;
      const newId = String(psychologist.id || psychologist.name);
      const isExist = state.items.find(
        item => String(item.id || item.name) === newId
      );
      if (!isExist) {
        state.items.push({ ...psychologist, id: newId });
        saveFavorites(uid, state.items);
      }
    },
    removeFromFavorites: (state, action) => {
      const { id, uid } = action.payload;
      state.items = state.items.filter(
        item => String(item.id || item.name) !== String(id)
      );
      saveFavorites(uid, state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.items = getSavedFavorites(action.payload.uid);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.items = getSavedFavorites(action.payload.uid);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.uid = null;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;