import api from '@/services/axios';
import type {
  Appointment,
  AppointmentCreatePayload,
  AppointmentStatusUpdatePayload,
  AppointmentReschedulePayload,
} from '@/types/appointment';

// ✅ Admin: Fetch all appointments
export const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get('/appointments');
  return response.data;
};

// ✅ Fetch appointments by user ID (Admin or the user themself)
export const fetchAppointmentsByUserId = async (
  userId: number
): Promise<Appointment[]> => {
  const response = await api.get(`/appointments/user/${userId}`);
  return response.data;
};

// ✅ Fetch appointments for the currently logged-in doctor
export const fetchAppointmentsByDoctor = async (): Promise<Appointment[]> => {
  const response = await api.get('/appointments/doctor');
  return response.data;
};

// ✅ Get a single appointment by ID
export const getAppointmentById = async (
  appointmentId: number
): Promise<Appointment> => {
  const response = await api.get(`/appointments/${appointmentId}`);
  return response.data;
};

// ✅ Create a new appointment
export const createAppointment = async (
  payload: AppointmentCreatePayload
): Promise<Appointment> => {
  const response = await api.post('/appointments', payload);
  return response.data.appointment;
};

// ✅ Update appointment status
export const updateAppointmentStatus = async (
  appointmentId: number,
  payload: AppointmentStatusUpdatePayload
): Promise<void> => {
  await api.put(`/appointments/${appointmentId}/status`, payload);
};

// ✅ Delete an appointment
export const deleteAppointment = async (appointmentId: number): Promise<void> => {
  await api.delete(`/appointments/${appointmentId}`);
};

// ✅ Reschedule an appointment
export const rescheduleAppointment = async (
  payload: AppointmentReschedulePayload
): Promise<string> => {
  const response = await api.put(
    `/appointments/${payload.appointmentId}/reschedule`,
    {
      newDate: payload.newDate,
      newTimeSlot: payload.newTimeSlot,
      userId: payload.userId,
    }
  );
  return response.data.message; // "Appointment successfully rescheduled"
};

// ✅ Get available slots for a doctor on a given date
export const getAvailableSlots = async (
  doctorId: number,
  date: string
): Promise<string[]> => {
  const response = await api.get(`/available-slots/${doctorId}/${date}`);
  return response.data.slots || response.data.availableSlots;
};

// ✅ Get bulk availability status of all doctors for a given date
export const getBulkAvailabilityStatus = async (
  date: string
): Promise<{
  notAvailableToday: boolean; doctorId: number; fullyBooked: boolean 
}[]> => {
  const response = await api.get('/availability-status', {
    params: { date },
  });
  return response.data;
};
