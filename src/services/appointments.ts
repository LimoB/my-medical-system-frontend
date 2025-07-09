import api from '@/services/axios';
import { store } from '@/store/store';
import type {
  Appointment,
  AppointmentCreatePayload,
  AppointmentStatusUpdatePayload,
} from '@/types/appointment';

// Get token
const getAuthHeaders = () => {
  const token = store.getState().auth.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Admin: Fetch all appointments
export const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get('/appointments', getAuthHeaders());
  return response.data;
};

// Fetch only my appointments (user)
export const fetchMyAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get('/appointments/me', getAuthHeaders());
  return response.data;
};

// Create appointment
export const createAppointment = async (
  payload: AppointmentCreatePayload
): Promise<Appointment> => {
  const response = await api.post('/appointments', payload, getAuthHeaders());
  return response.data;
};

// Update appointment status
export const updateAppointmentStatus = async (
  appointmentId: number,
  payload: AppointmentStatusUpdatePayload
): Promise<void> => {
  await api.put(`/appointments/${appointmentId}/status`, payload, getAuthHeaders());
};

// Delete appointment
export const deleteAppointment = async (appointmentId: number): Promise<void> => {
  await api.delete(`/appointments/${appointmentId}`, getAuthHeaders());
};
