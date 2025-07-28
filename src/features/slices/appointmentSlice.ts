import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Appointment, AppointmentCreatePayload, AppointmentStatusUpdatePayload } from '@/types/appointment';
import {
  fetchAppointments,
  fetchAppointmentsByUserId,
  fetchAppointmentsByDoctor,
  createAppointment as createAppointmentAPI,
  updateAppointmentStatus as updateAppointmentStatusAPI,
  deleteAppointment as deleteAppointmentAPI
} from '@/services/appointments';

type AppointmentsState = {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
};

const initialState: AppointmentsState = {
  appointments: [],
  loading: false,
  error: null
};

// ✅ 1. Get all appointments (Admin)
export const getAllAppointments = createAsyncThunk<Appointment[]>(
  'appointments/getAll',
  async (_, thunkAPI) => {
    try {
      return await fetchAppointments();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ 2. Get appointments by user ID
export const getAppointmentsByUserId = createAsyncThunk<Appointment[], number>(
  'appointments/getByUserId',
  async (userId, thunkAPI) => {
    try {
      return await fetchAppointmentsByUserId(userId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ 3. Get appointments for the logged-in doctor
export const getAppointmentsByDoctor = createAsyncThunk<Appointment[]>(
  'appointments/getByDoctor',
  async (_, thunkAPI) => {
    try {
      return await fetchAppointmentsByDoctor();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ 4. Create a new appointment
export const createAppointment = createAsyncThunk<Appointment, AppointmentCreatePayload>(
  'appointments/create',
  async (payload, thunkAPI) => {
    try {
      return await createAppointmentAPI(payload);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ 5. Update appointment status
export const updateAppointmentStatus = createAsyncThunk<
  void,
  { appointmentId: number; payload: AppointmentStatusUpdatePayload }
>(
  'appointments/updateStatus',
  async ({ appointmentId, payload }, thunkAPI) => {
    try {
      await updateAppointmentStatusAPI(appointmentId, payload);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ 6. Delete an appointment
export const deleteAppointment = createAsyncThunk<void, number>(
  'appointments/delete',
  async (appointmentId, thunkAPI) => {
    try {
      await deleteAppointmentAPI(appointmentId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Shared reducers
      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentsByDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Fulfilled
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loading = false;
      })
      .addCase(getAppointmentsByUserId.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loading = false;
      })
      .addCase(getAppointmentsByDoctor.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loading = false;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
        state.loading = false;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          (a) => a.appointment_id !== action.meta.arg
        );
      })

      // Rejected
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload || 'Something went wrong';
        }
      );
  }
});

export default appointmentSlice.reducer;
