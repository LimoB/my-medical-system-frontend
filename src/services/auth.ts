import api from './axios';
import { jwtDecode } from 'jwt-decode';
import { getDoctorByUserId } from './doctors';

import type {
  RegisterData,
  LoginData,
  VerifyEmailData,
  ResetPasswordData,
} from '../types/auth';

import type { DecodedToken } from '@/features/auth/authSlice';

// Register user
export const registerUser = async (data: RegisterData) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

// Login user and enrich with doctorId if role is doctor
export const loginUser = async (data: LoginData) => {
  const res = await api.post('/auth/login', data);
  const { token, user } = res.data;

  if (!token || !user) {
    throw new Error('Invalid login response');
  }

  const decoded = jwtDecode<DecodedToken>(token);

  const userPayload: DecodedToken = {
    ...decoded,
    id: Number(decoded.id), // ensure number
    user_id: Number(decoded.id),
    role: user.role,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    name: user.name,
    image_url: user.image_url,
    contact_phone: user.contact_phone,
    address: user.address,
    created_at: user.created_at,
    updated_at: user.updated_at,
    exp: decoded.exp,
    iat: decoded.iat,
  };

  // 👉 If the user is a doctor, enrich with doctorId
  if (user.role === 'doctor') {
    const doctor = await getDoctorByUserId(userPayload.id);
    if (doctor) {
      userPayload.doctorId = doctor.doctor_id;
      userPayload.specialization = doctor.specialization;
    }
  }

  return { token, user: userPayload };
};

// Email verification
export const verifyEmail = async (data: VerifyEmailData) => {
  const res = await api.post('/auth/verify-email', data);
  return res.data;
};

// Resend verification code
export const resendCode = async (email: string) => {
  const res = await api.post('/auth/resend-code', { email });
  return res.data;
};

// Forgot password
export const forgotPassword = async (email: string) => {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
};

// Reset password
export const resetPassword = async (data: ResetPasswordData) => {
  const res = await api.post('/auth/reset-password', data);
  return res.data;
};
