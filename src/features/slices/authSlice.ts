// src/features/auth/authSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DecodedToken } from '@/types/auth';

// 🔐 State for auth slice
interface AuthState {
  token: string | null;
  user: DecodedToken | null;
}

// 🌱 Initial state
const initialState: AuthState = {
  token: null,
  user: null,
};

// 🔧 Auth slice definition
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 🟢 On successful login
    loginSuccess(
      state,
      action: PayloadAction<{
        token: string;
        user: DecodedToken;
        rememberMe?: boolean;
      }>
    ) {
      const { token, user, rememberMe = true } = action.payload;

      state.token = token;
      state.user = user;

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);
      storage.setItem('user', JSON.stringify(user));
    },

    // 🔴 On logout
    logout(state) {
      state.token = null;
      state.user = null;

      // Clear auth from both storages
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      localStorage.removeItem('savedEmail'); // Optional
    },

    // 🔁 Restore persisted auth (e.g., on app reload)
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

// 🧩 Export actions and reducer
export const { loginSuccess, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
