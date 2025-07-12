// File: src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the decoded JWT token payload
export interface DecodedToken {
  updated_at: string;
  created_at: string;
  id: number;              // User ID
  email: string;           // User's email address
  role: 'admin' | 'doctor' | 'user';  // User role
  first_name: string;      // User's first name
  last_name: string;       // User's last name
  name: string;            // Full name (first + last name)
  image_url?: string;      // Optional profile picture URL (image_url)
  contact_phone?: string;  // Optional phone number
  address?: string;        // Optional address
  exp: number;             // Expiration timestamp of the JWT token
}

// Define the auth slice state
interface AuthState {
  token: string | null;      // JWT token stored in state
  user: DecodedToken | null; // User object based on DecodedToken
}

// Initial empty state — redux-persist will rehydrate automatically
const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth", // Slice name
  initialState,
  reducers: {
    // Action to handle login success
    loginSuccess(state, action: PayloadAction<{ token: string; user: DecodedToken }>) {
      state.token = action.payload.token;  // Save the token in state
      state.user = action.payload.user;    // Save the user data in state
    },

    // Action to handle logout
    logout(state) {
      state.token = null;  // Clear the token
      state.user = null;    // Clear the user data
    },

    // Action to set auth state (for initial state or session restoration)
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { loginSuccess, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
