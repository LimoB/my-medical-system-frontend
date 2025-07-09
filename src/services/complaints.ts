// src/services/complaints.ts
import api from '@/services/axios';
import { store } from '@/store/store';
import type { Complaint, ComplaintStatus } from '@/types/complaints';

// Helper: get auth headers with token from Redux store
const getAuthHeaders = () => {
  const token = store.getState().auth.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all complaints (admin only)
export const fetchComplaints = async (): Promise<Complaint[]> => {
  const response = await api.get('/complaints', getAuthHeaders());
  return response.data as Complaint[];
};

// Fetch a single complaint by ID (admin only)
export const fetchComplaintById = async (id: number | string): Promise<Complaint> => {
  const response = await api.get(`/complaints/${id}`, getAuthHeaders());
  return response.data;
};

// Update complaint status (admin only)
export const updateComplaintStatus = async (
  id: number | string,
  status: ComplaintStatus
): Promise<void> => {
  await api.put(
    `/complaints/${id}`,
    { status },
    getAuthHeaders()
  );
};

// Delete a complaint by ID (admin only)
export const deleteComplaint = async (id: number | string): Promise<void> => {
  await api.delete(`/complaints/${id}`, getAuthHeaders());
};
