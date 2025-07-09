import api from './axios';
import type { SanitizedDoctor, DoctorCreatePayload } from '@/types/doctor';

const BASE_URL = '/doctors';

/**
 * 🔹 Fetch all doctors (sorted by recently updated/added)
 */
export const getDoctors = async (): Promise<SanitizedDoctor[]> => {
  const res = await api.get<SanitizedDoctor[]>(BASE_URL);
  return res.data;
};

/**
 * 🔹 Fetch a single doctor by ID
 */
export const getDoctorById = async (id: number): Promise<SanitizedDoctor> => {
  const res = await api.get<SanitizedDoctor>(`${BASE_URL}/${id}`);
  return res.data;
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
