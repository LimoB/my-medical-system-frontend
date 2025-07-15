// File: src/services/doctors.ts
import api from './axios';
import type {
  SanitizedDoctor,
  DoctorCreatePayload,
  DoctorPatient,
} from '@/types/doctor';

const BASE_URL = '/doctors';

/**
 * 🔹 Fetch all doctors
 */
export const getDoctors = async (): Promise<SanitizedDoctor[]> => {
  const res = await api.get<SanitizedDoctor[]>(BASE_URL);

  return res.data.map((doctor) => ({
    doctor_id: doctor.doctor_id,
    user_id: doctor.user_id,
    name:
      doctor.user?.first_name && doctor.user?.last_name
        ? `${doctor.user.first_name} ${doctor.user.last_name}`
        : 'Unknown Doctor',
    specialty: doctor.specialization || 'General',
    image: doctor.user?.image_url || '/default-doctor.jpg',
    payment_per_hour: doctor.payment_per_hour || 0,
    available_hours: doctor.available_hours || [],
    available_days: doctor.available_days || 'Not available',
    description: doctor.description || 'No description available.',
    specialization: doctor.specialization || 'General',
    appointments: doctor.appointments || [],
    prescriptions: doctor.prescriptions || [],
    user: doctor.user || {
      user_id: 0,
      first_name: '',
      last_name: '',
      email: '',
      contact_phone: '',
      image_url: '/default-doctor.jpg',
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
 * 🔹 Fetch a doctor by user ID
 */
export const getDoctorByUserId = async (
  userId: number
): Promise<SanitizedDoctor> => {
  const res = await api.get<SanitizedDoctor[]>(`${BASE_URL}?user_id=${userId}`);
  if (!res.data.length) throw new Error('Doctor not found for given user ID');
  return res.data[0];
};

/**
 * 🔹 Get patients for the currently logged-in doctor
 */
export const getDoctorPatients = async (): Promise<DoctorPatient[]> => {
  try {
    const res = await api.get<DoctorPatient[]>('/doctor/patients');
    return res.data;
  } catch (error: any) {
    console.error('❌ Failed to fetch doctor patients:', error);
    throw new Error(
      error?.response?.data?.message || 'Unable to fetch doctor patients'
    );
  }
};

/**
 * 🔹 Get patients by doctor ID (for admin use only)
 */
export const getPatientsByDoctorId = async (
  doctorId: number
): Promise<DoctorPatient[]> => {
  try {
    const res = await api.get<DoctorPatient[]>(`${BASE_URL}/${doctorId}/patients`);
    return res.data;
  } catch (error: any) {
    console.error(`❌ Failed to fetch patients for doctor ${doctorId}:`, error);
    throw new Error('Unable to fetch patients for the specified doctor');
  }
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

/**
 * 🔹 Delete a doctor's patient (i.e. delete appointment history with a specific patient)
 */
export const deletePatientAppointment = async (
  patientUserId: number
): Promise<string> => {
  try {
    const res = await api.delete<{ message: string }>(
      `/doctors/patients/${patientUserId}`
    );
    return res.data.message || 'Patient appointment history deleted';
  } catch (error: any) {
    console.error('❌ Failed to delete patient appointment history:', error);
    throw new Error(
      error?.response?.data?.message || 'Failed to delete patient appointment history'
    );
  }
};
