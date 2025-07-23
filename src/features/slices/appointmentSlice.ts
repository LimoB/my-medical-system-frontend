import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchAppointments,
    fetchAppointmentsByUserId,
    fetchAppointmentsByDoctor,
    createAppointment,
    updateAppointmentStatus,
    deleteAppointment,
} from '@/services/appointments';
import type { Appointment, AppointmentCreatePayload, AppointmentStatusUpdatePayload } from '@/types/appointment';

interface AppointmentState {
    appointments: Appointment[];
    loading: boolean;
    error: string | null;
}

const initialState: AppointmentState = {
    appointments: [],
    loading: false,
    error: null,
};

// ✅ Thunks
export const getAllAppointments = createAsyncThunk(
    'appointments/getAll',
    async (_, thunkAPI) => {
        try {
            return await fetchAppointments();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getAppointmentsByUserId = createAsyncThunk(
    'appointments/getByUserId',
    async (userId: number, thunkAPI) => {
        try {
            return await fetchAppointmentsByUserId(userId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getAppointmentsByDoctor = createAsyncThunk(
    'appointments/getByDoctor',
    async (_, thunkAPI) => {
        try {
            return await fetchAppointmentsByDoctor();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addAppointment = createAsyncThunk(
    'appointments/create',
    async (payload: AppointmentCreatePayload, thunkAPI) => {
        try {
            return await createAppointment(payload);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const changeAppointmentStatus = createAsyncThunk(
    'appointments/updateStatus',
    async (
        {
            appointmentId,
            payload,
        }: { appointmentId: number; payload: AppointmentStatusUpdatePayload },
        thunkAPI
    ) => {
        try {
            await updateAppointmentStatus(appointmentId, payload);
            return { appointmentId, status: payload.status };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const removeAppointment = createAsyncThunk(
    'appointments/delete',
    async (appointmentId: number, thunkAPI) => {
        try {
            await deleteAppointment(appointmentId);
            return appointmentId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ✅ Slice
const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all
            .addCase(getAllAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(getAllAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch by user
            .addCase(getAppointmentsByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })

            // Fetch by doctor
            .addCase(getAppointmentsByDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })

            // Create
            .addCase(addAppointment.fulfilled, (state, action) => {
                state.appointments.push(action.payload);
            })

            // Update status
            .addCase(changeAppointmentStatus.fulfilled, (state, action) => {
                const { appointmentId, status } = action.payload;
                const appointment = state.appointments.find((a) => a.id === appointmentId);
                if (appointment) {
                    appointment.appointment_status = status;
                }
            })


            // Delete
            .addCase(removeAppointment.fulfilled, (state, action) => {
                state.appointments = state.appointments.filter((a) => a.id !== action.payload);
            });
    },
});

export default appointmentSlice.reducer;
