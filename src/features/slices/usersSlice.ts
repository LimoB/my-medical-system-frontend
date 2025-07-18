// src/features/users/usersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '@/services/users';
import type { User } from '@/types/user';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await userService.fetchUsers();
});

interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch users';
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
