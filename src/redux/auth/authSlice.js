import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut } from "./operations"; // Eksik olan buydu!

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
      // --- REGISTER (Kayıt Olma) ---
      .addCase(register.fulfilled, (state, action) => {
        state.user = { 
          name: action.payload.displayName, 
          email: action.payload.email 
        };
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })

      // --- LOGIN (Giriş Yapma) ---
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = { 
          name: action.payload.displayName, 
          email: action.payload.email 
        };
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })

      // --- LOGOUT (Çıkış Yapma) ---
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;