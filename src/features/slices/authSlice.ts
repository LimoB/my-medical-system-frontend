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
      action: PayloadAction<{ token: string; user: DecodedToken }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Persist login info in storage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    // 🔴 On logout
    logout(state) {
      state.token = null;
      state.user = null;

      // Remove all token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      // Optional: remove saved email if you're also storing it
      localStorage.removeItem('savedEmail');
    },

    // 🔁 When restoring persisted auth
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

// 🧩 Export actions and reducer
export const { loginSuccess, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
