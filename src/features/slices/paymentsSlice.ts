// src/features/slices/paymentsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPaymentsByUserId as fetchPaymentsApi } from '@/services/payments';
import type { SanitizedPayment } from '@/types/payments';

interface PaymentsState {
  payments: SanitizedPayment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentsState = {
  payments: [],
  loading: false,
  error: null,
};

export const fetchPaymentsByUserId = createAsyncThunk(
  'payments/fetchByUserId',
  async (userId: number, thunkAPI) => {
    try {
      return await fetchPaymentsApi(userId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch payments');
    }
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPaymentsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentsSlice.reducer;
