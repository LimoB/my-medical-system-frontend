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



// ✅ Updated function with detailed logs
// ✅ Updated function with detailed logs and proper error handling
// ✅ Updated function with detailed logs and proper structure
export const createStripeCheckoutSession = async (
  payload: CreatePaymentPayload
): Promise<{ url: string }> => {
  try {
    console.log('📦 [createStripeCheckoutSession] → Payload:', JSON.stringify(payload, null, 2));

    const res = await api.post('/checkout', payload, getAuthHeaders());

    console.log('✅ [createStripeCheckoutSession] → Response Data:', res.data);
    console.log('ℹ️ [createStripeCheckoutSession] → Status:', res.status);

    return res.data;
  } catch (error: any) {
    console.error('❌ [createStripeCheckoutSession] → Error:', error?.response?.data || error.message);
    throw error;
  }
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

// ✅ Fetch payments by user ID (for self or admin)
export const fetchPaymentsByUserId = async (userId: number): Promise<SanitizedPayment[]> => {
  const res = await api.get(`/payments/user/${userId}`, getAuthHeaders());

  if (!Array.isArray(res.data.payments)) {
    console.warn('⚠️ Unexpected payments shape:', res.data);
    return [];
  }

  return res.data.payments;
};
