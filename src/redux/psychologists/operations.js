import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get, query, limitToFirst, orderByKey, startAt } from "firebase/database";
import { db } from '../../firebase/config';

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchAll',
  async (startIndex = 0, thunkAPI) => {
    try {
      const dbRef = ref(db, '/'); 

      const psychologistsQuery = query(
        dbRef,
        orderByKey(),
        startAt(String(startIndex)),
        // 5 tane çekiyoruz: 1 tanesi sendeki son kart, 3 tanesi yeni gelecekler, 1 tane de hasMore kontrolü
        limitToFirst(5) 
      );

      const snapshot = await get(psychologistsQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        let psychologists = Array.isArray(data) ? data : Object.values(data);

        // startIndex 0 değilse, listenin ilk elemanı sendeki mevcut son elemandır.
        // Onu filtreleyerek atıyoruz ki "temiz" 3 yeni kart kalsın.
        const filtered = startIndex === 0 
          ? psychologists 
          : psychologists.filter((_, idx) => idx !== 0);

        // Şimdi elimizde 3'ten fazla kaldıysa daha veri var demektir.
        const hasMore = filtered.length > 3;
        const itemsToReturn = filtered.slice(0, 3);

        return {
          psychologists: itemsToReturn,
          hasMore,
          // Bir sonraki çekim için tam olarak son kartın indisine gidiyoruz
          nextIndex: startIndex + itemsToReturn.length
        };
      }

      return { psychologists: [], hasMore: false, nextIndex: startIndex };

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);