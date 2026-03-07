// Tüm psikolog listesini döner
export const selectAllPsychologists = (state) => state.psychologists.items;

// Yükleme durumunu döner (Spinner göstermek için)
export const selectIsLoading = (state) => state.psychologists.isLoading;

// Hata mesajını döner
export const selectError = (state) => state.psychologists.error;

// "Load More" butonunun görünüp görünmeyeceğini belirler
export const selectHasMore = (state) => state.psychologists.hasMore;

// Bir sonraki veri çekme işlemi için gerekli olan indisi döner
export const selectNextIndex = (state) => state.psychologists.nextIndex;