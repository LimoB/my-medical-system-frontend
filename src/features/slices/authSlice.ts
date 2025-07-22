// File: src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Extend JWT-decoded payload with optional doctorId
export interface DecodedToken {
  token: any;
  specialization: string;
  id: number; // From JWT payload
  user_id?: number; // optional alias for id
  doctorId?: number | null; // 👈 added doctorId (for doctors only)
  updated_at: string;
  created_at: string;
  email: string;
  role: 'admin' | 'doctor' | 'user';
  first_name: string;
  last_name: string;
  name: string;
  image_url?: string;
  contact_phone?: string;
  address?: string;
  exp: number;
  iat?: number;
}

// Auth slice state
interface AuthState {
  token: string | null;
  user: DecodedToken | null;
}

// Initial state (can be hydrated by redux-persist)
const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Called after login success
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; user: DecodedToken }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    // Called on logout
    logout(state) {
      state.token = null;
      state.user = null;
    },

    // Optionally set state manually (e.g., restoring session)
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { loginSuccess, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
