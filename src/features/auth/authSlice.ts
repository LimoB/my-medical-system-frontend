// File: src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the decoded JWT token payload
export interface DecodedToken {
  id: number;
  email: string;
  role: 'admin' | 'doctor' | 'user';
  first_name: string;
  last_name: string;
  avatarUrl?: string;
  contact_phone?: string;
  address?: string;
  exp: number; // expiration timestamp
}

// Define the auth slice state
interface AuthState {
  token: string | null;
  user: DecodedToken | null;
}

// Initial empty state — redux-persist will rehydrate automatically
const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: DecodedToken }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { loginSuccess, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
