import api from '@/services/axios';
import type {
  Consultation,
  ConsultationCreatePayload,
} from '@/types/consultation';

// 🔹 Get all consultations (Admin only)
export const fetchAllConsultations = async (): Promise<Consultation[]> => {
  const response = await api.get('/consultations');
  return response.data;
};

// 🔹 Get consultations for the currently logged-in doctor
export const fetchConsultationsByDoctor = async (): Promise<Consultation[]> => {
  const response = await api.get('/consultations/doctor');
  return response.data;
};

// 🔹 Get consultations for a specific patient
export const fetchConsultationsByPatientId = async (
  patientId: number
): Promise<Consultation[]> => {
  const response = await api.get(`/consultations/patient/${patientId}`);
  return response.data;
};

// 🔹 Get a single consultation by its ID
export const fetchConsultationById = async (
  consultationId: number
): Promise<Consultation | null> => {
  const response = await api.get(`/consultations/${consultationId}`);
  return response.data;
};

// 🔹 Get a consultation by appointment ID
export const fetchConsultationByAppointmentId = async (
  appointmentId: number
): Promise<Consultation | null> => {
  const response = await api.get(`/consultations/appointment/${appointmentId}`);
  return response.data;
};

// 🔹 Create a new consultation (Doctor only, after appointment is completed)
export const createConsultation = async (
  payload: ConsultationCreatePayload
): Promise<Consultation> => {
  const response = await api.post('/consultations', payload);
  return response.data;
};

// 🔹 Delete a consultation (Admin only)
export const deleteConsultation = async (consultationId: number): Promise<void> => {
  await api.delete(`/consultations/${consultationId}`);
};



// 🔹 Get doctor by associated user ID
export const fetchDoctorByUserId = async (userId: number) => {
  const response = await api.get(`/doctors/user/${userId}`);
  return response.data;
};
