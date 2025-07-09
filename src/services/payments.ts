// src/services/payments.ts
import api from '@/services/axios';
import { store } from '@/store/store';
import type { SanitizedPayment, CreatePaymentPayload } from '@/types/payments';

const getAuthHeaders = () => {
  const token = store.getState().auth.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchPayments = async (): Promise<SanitizedPayment[]> => {
  const res = await api.get('/payments', getAuthHeaders());
  return res.data;
};

export const deletePayment = async (id: number) => {
  await api.delete(`/payments/${id}`, getAuthHeaders());
};

export const updatePayment = async (id: number, data: Partial<CreatePaymentPayload>) => {
  await api.put(`/payments/${id}`, data, getAuthHeaders());
};

export const fetchPaymentById = async (id: number): Promise<SanitizedPayment> => {
  const res = await api.get(`/payments/${id}`, getAuthHeaders());
  return res.data;
};