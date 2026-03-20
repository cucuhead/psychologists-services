import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { psychologistsReducer } from './psychologists/psychologistsSlice';
import { favoritesReducer } from './favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    psychologists: psychologistsReducer,
    favorites: favoritesReducer,
  },
});