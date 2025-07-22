import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { SanitizedPayment, CreatePaymentPayload } from '@/types/payments';
import * as paymentService from '@/services/payments';

interface PaymentsState {
  payments: SanitizedPayment[];
  selectedPayment: SanitizedPayment | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentsState = {
  payments: [],
  selectedPayment: null,
  loading: false,
  error: null,
};

// 🔹 Thunks
export const fetchPayments = createAsyncThunk<SanitizedPayment[]>(
  'payments/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await paymentService.fetchPayments();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPaymentById = createAsyncThunk<SanitizedPayment, number>(
  'payments/fetchById',
  async (paymentId, thunkAPI) => {
    try {
      return await paymentService.fetchPaymentById(paymentId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePayment = createAsyncThunk<number, number>(
  'payments/delete',
  async (paymentId, thunkAPI) => {
    try {
      await paymentService.deletePayment(paymentId);
      return paymentId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePayment = createAsyncThunk<
  { id: number; data: Partial<CreatePaymentPayload> },
  { id: number; data: Partial<CreatePaymentPayload> }
>(
  'payments/update',
  async ({ id, data }, thunkAPI) => {
    try {
      await paymentService.updatePayment(id, data);
      return { id, data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔹 Slice
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearPayments(state) {
      state.payments = [];
      state.selectedPayment = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPayments
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<SanitizedPayment[]>) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchPaymentById
      .addCase(fetchPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPayment = null;
      })
      .addCase(fetchPaymentById.fulfilled, (state, action: PayloadAction<SanitizedPayment>) => {
        state.loading = false;
        state.selectedPayment = action.payload;
      })
      .addCase(fetchPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deletePayment
      .addCase(deletePayment.fulfilled, (state, action: PayloadAction<number>) => {
        state.payments = state.payments.filter((p) => p.payment_id !== action.payload);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // updatePayment
      .addCase(
        updatePayment.fulfilled,
        (state, action: PayloadAction<{ id: number; data: Partial<CreatePaymentPayload> }>) => {
          const { id, data } = action.payload;
          const index = state.payments.findIndex((p) => p.payment_id === id);
          if (index !== -1) {
            state.payments[index] = {
              ...state.payments[index],
              ...data,
            };
          }
        }
      )
      .addCase(updatePayment.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearPayments } = paymentsSlice.actions;
export default paymentsSlice.reducer;
