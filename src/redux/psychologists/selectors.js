
export const selectAllPsychologists = (state) => state.psychologists.items;


export const selectIsLoading = (state) => state.psychologists.isLoading;


export const selectError = (state) => state.psychologists.error;


export const selectHasMore = (state) => state.psychologists.hasMore;


export const selectNextIndex = (state) => state.psychologists.nextIndex;