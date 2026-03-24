import { createSelector } from '@reduxjs/toolkit';

const selectFavoriteItems = (state) => state.favorites.items;

export const selectAllFavorites = createSelector(
  [selectFavoriteItems],
  (items) => items.map(p => ({
    ...p,
    rating: Number(p.rating).toFixed(2),
  }))
);

export const selectFavoritesFilter = (state) => state.favorites.filter;