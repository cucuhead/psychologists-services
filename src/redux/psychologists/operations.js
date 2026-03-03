import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from "firebase/database";
import { db } from '../../firebase/config';

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchAll',
  async (_, thunkAPI) => {
    try {
      const dbRef = ref(db, '/'); // Verilerin root'ta olduğunu gördüm
      const snapshot = await get(dbRef);
      
      if (snapshot.exists()) {
        return snapshot.val(); // Bu sana 0, 1, 2 indisli diziyi döner
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);