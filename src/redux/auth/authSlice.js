import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null, uid: null },
    isLoggedIn: false,
    isRefreshing: false,
    error: null, // Kızdığı yer burasıydı, şimdi yönetiyoruz
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    // Hata mesajını manuel temizlemek istersen
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register İşlemleri
      .addCase(register.fulfilled, (state, action) => {
        state.user = { 
          name: action.payload.displayName, 
          email: action.payload.email,
          uid: action.payload.uid 
        };
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload; // Hata gelirse buraya yazar
      })
      
      // Login İşlemleri
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = { 
          name: action.payload.displayName, 
          email: action.payload.email,
          uid: action.payload.uid 
        };
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload; // Login hatasını yakalar
      })
      
      // Logout İşlemleri
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null, uid: null };
        state.isLoggedIn = false;
        state.error = null;
      });
  },
});

export const { setCredentials, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;