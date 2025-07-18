import api from '@/services/axios';
import type {
  Prescription,
  PrescriptionCreatePayload,
  PrescriptionUpdatePayload,
} from '@/types/prescription';

// 🔹 Get all prescriptions (doctor or admin only)
export const fetchPrescriptions = async (): Promise<Prescription[]> => {
  try {
    const response = await api.get('/prescriptions');
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch prescriptions:', error);
    throw error;
  }
};

// 🔹 Get a prescription by ID (any logged-in user)
export const fetchPrescriptionById = async (
  id: string | number
): Promise<Prescription> => {
  try {
    const response = await api.get(`/prescriptions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to fetch prescription ${id}:`, error);
    throw error;
  }
};

export const fetchPrescriptionsByUserId = async (userId: number) => {
  const response = await api.get(`/prescriptions/user/${userId}`);
  return response.data;
};

// 🔹 Create a new prescription (doctor only)
export const createPrescription = async (
  payload: PrescriptionCreatePayload
): Promise<Prescription> => {
  try {
    console.log('📨 Creating prescription with payload:', payload);
    const response = await api.post('/prescriptions', payload);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to create prescription:', error);
    throw error;
  }
};

// 🔹 Update a prescription by ID (doctor only)
export const updatePrescription = async (
  id: string | number,
  payload: PrescriptionUpdatePayload
): Promise<Prescription> => {
  try {
    console.log(`📦 Updating prescription ${id} with payload:`, payload);
    const response = await api.put(`/prescriptions/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to update prescription ${id}:`, error);
    throw error;
  }
};

// 🔹 Delete a prescription by ID (admin only)
export const deletePrescription = async (id: string | number): Promise<void> => {
  try {
    console.log(`🗑️ Deleting prescription ${id}`);
    await api.delete(`/prescriptions/${id}`);
  } catch (error) {
    console.error(`❌ Failed to delete prescription ${id}:`, error);
    throw error;
  }
};
