import api from './axios';
import type { SanitizedDoctor, DoctorCreatePayload } from '@/types/doctor';

const BASE_URL = '/doctors';

/**
 * 🔹 Fetch all doctors (sorted by recently updated/added)
 */
export const getDoctors = async (): Promise<SanitizedDoctor[]> => {
  const res = await api.get<SanitizedDoctor[]>(BASE_URL);
  
  return res.data.map((doctor) => ({
    doctor_id: doctor.doctor_id,
    user_id: doctor.user_id,
    name: `${doctor.user.first_name} ${doctor.user.last_name}`, // Concatenate first and last name from user
    specialty: doctor.specialization,
    image: doctor.user.image_url || '/default-doctor.jpg', // Default image if missing
    payment_per_hour: doctor.payment_per_hour,
    available_hours: doctor.available_hours || [],
    available_days: doctor.available_days,
    specialization: doctor.specialization,
    description: doctor.description || '', // Added description field
    appointments: doctor.appointments || [],
    prescriptions: doctor.prescriptions || [],
    user: {
      user_id: doctor.user.user_id,
      first_name: doctor.user.first_name,
      last_name: doctor.user.last_name,
      email: doctor.user.email,
      contact_phone: doctor.user.contact_phone,
      image_url: doctor.user.image_url || '/default-doctor.jpg', // Default image if missing
    },
  }));
};

/**
 * 🔹 Fetch a single doctor by ID
 */
export const getDoctorById = async (id: number): Promise<SanitizedDoctor> => {
  const res = await api.get<SanitizedDoctor>(`${BASE_URL}/${id}`);
  
  return {
    doctor_id: res.data.doctor_id,
    user_id: res.data.user_id,
    name: `${res.data.user.first_name} ${res.data.user.last_name}`, // Concatenate first and last name from user
    specialty: res.data.specialization,
    image: res.data.user.image_url || '/default-doctor.jpg', // Default image if missing
    payment_per_hour: res.data.payment_per_hour,
    available_hours: res.data.available_hours || [],
    available_days: res.data.available_days,
    specialization: res.data.specialization,
    description: res.data.description || '', // Added description field
    appointments: res.data.appointments || [],
    prescriptions: res.data.prescriptions || [],
    user: {
      user_id: res.data.user.user_id,
      first_name: res.data.user.first_name,
      last_name: res.data.user.last_name,
      email: res.data.user.email,
      contact_phone: res.data.user.contact_phone,
      image_url: res.data.user.image_url || '/default-doctor.jpg', // Default image if missing
    },
  };
};

/**
 * 🔹 Create a new doctor (admin only)
 */
export const createDoctor = async (
  data: DoctorCreatePayload
): Promise<string> => {
  const res = await api.post<{ message: string }>(BASE_URL, data);
  return res.data.message || 'Doctor created';
};

/**
 * 🔹 Update an existing doctor (admin only)
 */
export const updateDoctor = async (
  id: number,
  data: Partial<DoctorCreatePayload>
): Promise<string> => {
  const res = await api.put<{ message: string }>(`${BASE_URL}/${id}`, data);
  return res.data.message || 'Doctor updated';
};

/**
 * 🔹 Delete a doctor by ID (admin only)
 */
export const deleteDoctor = async (id: number): Promise<string> => {
  const res = await api.delete<{ message: string }>(`${BASE_URL}/${id}`);
  return res.data.message || 'Doctor deleted';
};
