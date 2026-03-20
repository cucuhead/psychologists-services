import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, query, orderByKey, limitToFirst, startAfter, get } from "firebase/database";
import { db } from '../../firebase/config';

const PAGE_SIZE = 3;

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchAll',
  async (lastKey = null, thunkAPI) => {
    try {
      const dbRef = ref(db, '/');

      const dbQuery = lastKey
        ? query(dbRef, orderByKey(), startAfter(lastKey), limitToFirst(PAGE_SIZE))
        : query(dbRef, orderByKey(), limitToFirst(PAGE_SIZE));

      const snapshot = await get(dbQuery);

      if (!snapshot.exists()) {
        return { psychologists: [], lastKey: null, hasMore: false };
      }

      const data = snapshot.val();
      const entries = Object.entries(data);
      const psychologists = entries.map(([, value]) => value);
      const newLastKey = entries[entries.length - 1][0];

      const totalRef = ref(db, '/');
      const totalSnapshot = await get(totalRef);
      const totalCount = totalSnapshot.exists() ? Object.keys(totalSnapshot.val()).length : 0;

      return {
        psychologists,
        lastKey: newLastKey,
        hasMore: psychologists.length === PAGE_SIZE && 
                 (thunkAPI.getState().psychologists.items.length + psychologists.length) < totalCount,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);