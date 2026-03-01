import { createSlice } from "@reduxjs/toolkit";
import { register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        // action.payload içindeki displayName ve email operations.js'den geliyor
        state.user = { 
          name: action.payload.displayName, 
          email: action.payload.email 
        };
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;