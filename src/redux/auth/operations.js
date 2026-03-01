import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { auth } from "../../firebase/config";

// Kayıt Olma (Register)
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      // 1. Firebase'de kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Kullanıcı ismini güncelle
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // 3. Redux'a dönecek veriyi hazırla
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);