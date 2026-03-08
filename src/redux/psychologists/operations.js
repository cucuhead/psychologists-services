import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from "firebase/database";
import { db } from '../../firebase/config';

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchAll',
  async (_, thunkAPI) => {
    try {
      const dbRef = ref(db, '/'); 
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        // Firebase bazen null indexler döndürebilir, onları temizleyip dizi yapıyoruz
        let psychologists = Array.isArray(data) 
          ? data.filter(item => item !== null) 
          : Object.values(data);

        return {
          psychologists,
          hasMore: false // Artık hasMore kontrolünü sayfa içinde yapacağız
        };
      }

      return { psychologists: [], hasMore: false };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);