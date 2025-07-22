import api from '@/services/axios';
import type {
  Appointment,
  AppointmentCreatePayload,
  AppointmentStatusUpdatePayload,
} from '@/types/appointment';

// ✅ Admin: Fetch all appointments
export const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get('/appointments');
  return response.data;
};

// ✅ Fetch appointments by user ID (Admin or user themself)
export const fetchAppointmentsByUserId = async (
  userId: number
): Promise<Appointment[]> => {
  const response = await api.get(`/appointments/user/${userId}`);
  return response.data;
};

// ✅ Fetch appointments for the currently logged-in doctor
export const fetchAppointmentsByDoctor = async (): Promise<Appointment[]> => {
  const response = await api.get('/appointments/doctor');
  console.log(response.data);  // Log the response to check the data structure
  return response.data;
};


// ✅ Create a new appointment
export const createAppointment = async (
  payload: AppointmentCreatePayload
): Promise<Appointment> => {
  const response = await api.post('/appointments', payload);
  return response.data.appointment; // ✅ Only return the nested appointment
};


// ✅ Update appointment status (e.g., from pending to confirmed)
export const updateAppointmentStatus = async (
  appointmentId: number,
  payload: AppointmentStatusUpdatePayload
): Promise<void> => {
  await api.put(`/appointments/${appointmentId}/status`, payload);
};

// ✅ Delete an appointment by ID
export const deleteAppointment = async (appointmentId: number): Promise<void> => {
  await api.delete(`/appointments/${appointmentId}`);
};
