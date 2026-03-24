import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ref, get, query,
  orderByChild, orderByKey,
  limitToFirst, limitToLast,
  startAt, startAfter,
  endAt, endBefore,
} from 'firebase/database';
import { db } from '../../firebase/config';

const PAGE_SIZE = 3;

const ORDER_FIELD = {
  'A to Z':          'name',
  'Z to A':          'name',
  'Less than 170$':  'price_per_hour',
  'Greater than 170$': 'price_per_hour',
  'Popular':         'rating',
  'Not popular':     'rating',
  'Show all':        null,
};


const DESCENDING = new Set(['Z to A', 'Popular']);

function buildQuery(filterName, cursor) {
  const dbRef = ref(db, '/');
  const FETCH = PAGE_SIZE + 1; 

  switch (filterName) {
    case 'A to Z':
      return cursor
        ? query(dbRef, orderByChild('name'), startAfter(cursor.value, cursor.key), limitToFirst(FETCH))
        : query(dbRef, orderByChild('name'), limitToFirst(FETCH));

    case 'Z to A':
      return cursor
        ? query(dbRef, orderByChild('name'), endBefore(cursor.value, cursor.key), limitToLast(FETCH))
        : query(dbRef, orderByChild('name'), limitToLast(FETCH));

    case 'Less than 170$':
      return cursor
        ? query(dbRef, orderByChild('price_per_hour'), startAfter(cursor.value, cursor.key), endAt(170), limitToFirst(FETCH))
        : query(dbRef, orderByChild('price_per_hour'), endAt(170), limitToFirst(FETCH));

    case 'Greater than 170$':
      return cursor
        ? query(dbRef, orderByChild('price_per_hour'), startAfter(cursor.value, cursor.key), limitToFirst(FETCH))
        : query(dbRef, orderByChild('price_per_hour'), startAfter(170), limitToFirst(FETCH));

    case 'Popular':
      return cursor
        ? query(dbRef, orderByChild('rating'), startAt(4.7), endBefore(cursor.value, cursor.key), limitToLast(FETCH))
        : query(dbRef, orderByChild('rating'), startAt(4.7), limitToLast(FETCH));

    case 'Not popular':
      return cursor
        ? query(dbRef, orderByChild('rating'), startAfter(cursor.value, cursor.key), endBefore(4.7), limitToFirst(FETCH))
        : query(dbRef, orderByChild('rating'), endBefore(4.7), limitToFirst(FETCH));

    default:
      return cursor
        ? query(dbRef, orderByKey(), startAfter(cursor.key), limitToFirst(FETCH))
        : query(dbRef, orderByKey(), limitToFirst(FETCH));
  }
}

async function fetchPage(filterName, cursor = null) {
  const q = buildQuery(filterName, cursor);
  const snapshot = await get(q);

  if (!snapshot.exists()) {
    return { items: [], hasMore: false, cursor: null };
  }

  const raw = [];
  snapshot.forEach((child) => {
    raw.push({ _firebaseKey: child.key, ...child.val() });
  });

  if (DESCENDING.has(filterName)) raw.reverse();

  const hasMore = raw.length > PAGE_SIZE;
  const items = raw.slice(0, PAGE_SIZE);

  const lastItem = items[items.length - 1];
  const orderField = ORDER_FIELD[filterName];
  const newCursor = lastItem
    ? { key: lastItem._firebaseKey, value: orderField ? lastItem[orderField] : lastItem._firebaseKey }
    : null;

  return { items, hasMore, cursor: newCursor };
}

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchAll',
  async ({ filterName = 'Show all' } = {}, thunkAPI) => {
    try {
      return await fetchPage(filterName, null);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadMorePsychologists = createAsyncThunk(
  'psychologists/loadMore',
  async ({ filterName = 'Show all', cursor }, thunkAPI) => {
    try {
      return await fetchPage(filterName, cursor);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);