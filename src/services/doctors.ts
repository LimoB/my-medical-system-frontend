// File: services/doctors.ts
import api from './axios';
import type { SanitizedDoctor, DoctorCreatePayload } from '@/types/doctor';

const BASE_URL = '/doctors';

/**
 * 🔹 Fetch all doctors
 */
export const getDoctors = async (): Promise<SanitizedDoctor[]> => {
  const res = await api.get<SanitizedDoctor[]>(BASE_URL);

  return res.data.map((doctor) => ({
    doctor_id: doctor.doctor_id,
    user_id: doctor.user_id,
    name: `${doctor.user.first_name} ${doctor.user.last_name}`,
    specialty: doctor.specialization,
    image: doctor.user.image_url || '/default-doctor.jpg',
    payment_per_hour: doctor.payment_per_hour,
    available_hours: doctor.available_hours || [],
    available_days: doctor.available_days || '',
    specialization: doctor.specialization,
    description: doctor.description || '',
    appointments: doctor.appointments || [],
    prescriptions: doctor.prescriptions || [],
    user: {
      user_id: doctor.user.user_id,
      first_name: doctor.user.first_name,
      last_name: doctor.user.last_name,
      email: doctor.user.email,
      contact_phone: doctor.user.contact_phone,
      image_url: doctor.user.image_url || '/default-doctor.jpg',
    },
  }));
};

/**
 * 🔹 Fetch a single doctor by ID
 */
export const getDoctorById = async (id: number): Promise<SanitizedDoctor> => {
  const res = await api.get<SanitizedDoctor>(`${BASE_URL}/${id}`);

  const doctor = res.data;

  return {
    doctor_id: doctor.doctor_id,
    user_id: doctor.user_id,
    name: `${doctor.user.first_name} ${doctor.user.last_name}`,
    specialty: doctor.specialization,
    image: doctor.user.image_url || '/default-doctor.jpg',
    payment_per_hour: doctor.payment_per_hour,
    available_hours: doctor.available_hours || [],
    available_days: doctor.available_days || '',
    specialization: doctor.specialization,
    description: doctor.description || '',
    appointments: doctor.appointments || [],
    prescriptions: doctor.prescriptions || [],
    user: {
      user_id: doctor.user.user_id,
      first_name: doctor.user.first_name,
      last_name: doctor.user.last_name,
      email: doctor.user.email,
      contact_phone: doctor.user.contact_phone,
      image_url: doctor.user.image_url || '/default-doctor.jpg',
    },
  };
};

/**
 * 🔹 Create a new doctor
 */
export const createDoctor = async (
  data: DoctorCreatePayload
): Promise<string> => {
  const res = await api.post<{ message: string }>(BASE_URL, data);
  return res.data.message || 'Doctor created';
};

/**
 * 🔹 Update an existing doctor
 */
export const updateDoctor = async (
  id: number,
  data: Partial<DoctorCreatePayload>
): Promise<string> => {
  const res = await api.put<{ message: string }>(`${BASE_URL}/${id}`, data);
  return res.data.message || 'Doctor updated';
};

/**
 * 🔹 Delete a doctor by ID
 */
export const deleteDoctor = async (id: number): Promise<string> => {
  const res = await api.delete<{ message: string }>(`${BASE_URL}/${id}`);
  return res.data.message || 'Doctor deleted';
};
