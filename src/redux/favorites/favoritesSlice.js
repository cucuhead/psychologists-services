import { createSlice } from '@reduxjs/toolkit';
import { logIn, register, logOut, refreshUser } from '../auth/operations';

const getSavedFavorites = (uid) => {
  try {
    const saved = localStorage.getItem(`favorites_${uid}`);
    if (!saved) return [];
    const items = JSON.parse(saved);
    return items.map(item => ({
      ...item,
      _firebaseKey: item._firebaseKey ?? item.id ?? item.name,
      id: item._firebaseKey ?? item.id ?? item.name,
    }));
  } catch {
    return [];
  }
};

const saveFavorites = (uid, items) => {
  localStorage.setItem(`favorites_${uid}`, JSON.stringify(items));
};

const resolveId = (p) => String(p._firebaseKey || p.id || p.name);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    uid: null,
    filter: 'Show all',
  },
  reducers: {
    addToFavorites: (state, action) => {
      const { uid, ...psychologist } = action.payload;
      const newId = resolveId(psychologist);
      const exists = state.items.some(item => resolveId(item) === newId);
      if (!exists) {
        state.items.push({ ...psychologist, id: newId });
        saveFavorites(uid, state.items);
      }
    },
    removeFromFavorites: (state, action) => {
      const { id, uid, name } = action.payload;
      state.items = state.items.filter(item => {
        const itemId = resolveId(item);
        const itemName = String(item.name ?? '');
        return itemId !== String(id) && itemName !== String(name ?? '');
      });
      saveFavorites(uid, state.items);
    },
    setFavoritesFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.items = getSavedFavorites(action.payload.uid);
        state.filter = 'Show all';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.items = getSavedFavorites(action.payload.uid);
        state.filter = 'Show all';
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.uid = action.payload.uid;
        state.items = getSavedFavorites(action.payload.uid);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.uid = null;
        state.filter = 'Show all';
      });
  },
});

export const { addToFavorites, removeFromFavorites, setFavoritesFilter } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;