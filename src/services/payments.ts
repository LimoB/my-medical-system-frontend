import api from '@/services/axios';
import { store } from '@/store/store';
import type { CreatePaymentPayload, SanitizedPayment } from '@/types/payments';

const getAuthHeaders = () => {
  const token = store.getState().auth.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Correct endpoint: POST /checkout — create a Stripe checkout session
export const createStripeCheckoutSession = async (
  payload: { appointmentId: number }
): Promise<{ url: string }> => {
  const res = await api.post('/checkout', payload, getAuthHeaders());
  return res.data; // expects: { url: string }
};

// ✅ Fetch all payments (admin)
export const fetchPayments = async (): Promise<SanitizedPayment[]> => {
  const res = await api.get('/payments', getAuthHeaders());
  return res.data;
};

// ✅ Fetch one payment by ID
export const fetchPaymentById = async (id: number): Promise<SanitizedPayment> => {
  const res = await api.get(`/payments/${id}`, getAuthHeaders());
  return res.data;
};

// 🔒 Admin-only: Delete payment
export const deletePayment = async (id: number) => {
  await api.delete(`/payments/${id}`, getAuthHeaders());
};

// 🔒 Admin-only: Update payment
export const updatePayment = async (
  id: number,
  data: Partial<CreatePaymentPayload>
) => {
  await api.put(`/payments/${id}`, data, getAuthHeaders());
};
