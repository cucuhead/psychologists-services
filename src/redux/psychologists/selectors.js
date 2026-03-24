import { createSelector } from '@reduxjs/toolkit';

const selectItems = (state) => state.psychologists.items;

export const selectAllPsychologists = createSelector(
  [selectItems],
  (items) => items.map((p) => ({
    ...p,
    rating: Number(p.rating).toFixed(2),
  }))
);

export const selectIsLoading = (state) => state.psychologists.isLoading;
export const selectError    = (state) => state.psychologists.error;
export const selectHasMore  = (state) => state.psychologists.hasMore;
export const selectCursor   = (state) => state.psychologists.cursor;
export const selectFilter   = (state) => state.psychologists.filter;