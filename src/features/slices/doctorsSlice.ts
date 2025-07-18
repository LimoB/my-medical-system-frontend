import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { SanitizedDoctor } from '@/types/doctor';
import * as doctorService from '@/services/doctors';

interface DoctorsState {
  doctors: SanitizedDoctor[];
  selectedDoctor: SanitizedDoctor | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorsState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null,
};

// 🔹 Async Thunks
export const fetchDoctors = createAsyncThunk<SanitizedDoctor[]>(
  'doctors/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await doctorService.getDoctors();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDoctorById = createAsyncThunk<SanitizedDoctor, number>(
  'doctors/fetchById',
  async (doctorId, thunkAPI) => {
    try {
      return await doctorService.getDoctorById(doctorId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDoctor = createAsyncThunk<number, number>(
  'doctors/delete',
  async (doctorId, thunkAPI) => {
    try {
      await doctorService.deleteDoctor(doctorId);
      return doctorId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDoctor = createAsyncThunk<
  { id: number; data: Partial<SanitizedDoctor> },
  { id: number; data: Partial<SanitizedDoctor> }
>(
  'doctors/update',
  async ({ id, data }, thunkAPI) => {
    try {
      await doctorService.updateDoctor(id, data);
      return { id, data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔹 Slice
const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    clearDoctors(state) {
      state.doctors = [];
      state.selectedDoctor = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchDoctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action: PayloadAction<SanitizedDoctor[]>) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchDoctorById
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedDoctor = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action: PayloadAction<SanitizedDoctor>) => {
        state.loading = false;
        state.selectedDoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteDoctor
      .addCase(deleteDoctor.fulfilled, (state, action: PayloadAction<number>) => {
        state.doctors = state.doctors.filter((doc) => doc.doctor_id !== action.payload);
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // updateDoctor
      .addCase(
        updateDoctor.fulfilled,
        (
          state,
          action: PayloadAction<{ id: number; data: Partial<SanitizedDoctor> }>
        ) => {
          const { id, data } = action.payload;
          const index = state.doctors.findIndex((d) => d.doctor_id === id);
          if (index !== -1) {
            state.doctors[index] = {
              ...state.doctors[index],
              ...data,
            };
          }
        }
      )
      .addCase(updateDoctor.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearDoctors } = doctorsSlice.actions;
export default doctorsSlice.reducer;
