import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  // Formların içinden doğrudan çağırmak için burayı ekliyoruz
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = { name: action.payload.displayName, email: action.payload.email };
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = { name: action.payload.displayName, email: action.payload.email };
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
      });
  },
});

export const { setCredentials } = authSlice.actions; // Bunu dışarı açtık
export const authReducer = authSlice.reducer;