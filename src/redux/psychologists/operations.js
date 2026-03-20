import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from "firebase/database";
import { db } from '../../firebase/config';

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchAll',
  async (_, thunkAPI) => {
    try {
      const dbRef = ref(db, '/');
      const snapshot = await get(dbRef);

      if (!snapshot.exists()) {
        return [];
      }

      const data = snapshot.val();
      const psychologists = Array.isArray(data)
        ? data.filter(item => item !== null)
        : Object.values(data);

      return psychologists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);