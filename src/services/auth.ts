// src/api/auth.ts

import api from './axios';
import { jwtDecode } from 'jwt-decode';
import { getDoctorByUserId } from './doctors';

import type {
  RegisterData,
  LoginData,
  VerifyEmailData,
  ResetPasswordData,
  DecodedToken,
} from '@/types/auth';

// 🔧 Helper to merge decoded token with user info
const buildUserPayload = (token: string, user: any): DecodedToken => {
  const decoded = jwtDecode<DecodedToken>(token);
  return {
    ...decoded,
    id: Number(decoded.id),
    user_id: Number(decoded.id),
    token,

    // Merge user fields (overriding decoded where necessary)
    email: user.email,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name,
    name: user.name,
    image_url: user.image_url,
    contact_phone: user.contact_phone,
    address: user.address,
    date_of_birth: user.date_of_birth,
    is_verified: user.is_verified,
    created_at: user.created_at,
    updated_at: user.updated_at,

    exp: decoded.exp,
    iat: decoded.iat,
  };
};

// 📝 Register user
export const registerUser = async (data: RegisterData) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

// 🔐 Login user and enrich with doctor info
export const loginUser = async (data: LoginData) => {
  const res = await api.post('/auth/login', data);
  const { token, user } = res.data;

  if (!token || !user) {
    throw new Error('Invalid login response');
  }

  const userPayload: DecodedToken = buildUserPayload(token, user);

  // Enrich with doctor data if applicable
  if (user.role === 'doctor') {
    const doctor = await getDoctorByUserId(userPayload.id);
    if (doctor) {
      userPayload.doctorId = doctor.doctor_id;
      userPayload.specialization = doctor.specialization;
    }
  }

  return { token, user: userPayload };
};

// ✅ Email verification
export const verifyEmail = async (data: VerifyEmailData) => {
  const res = await api.post('/auth/verify-email', data);
  return res.data;
};

// 🔁 Resend code
export const resendCode = async (email: string) => {
  const res = await api.post('/auth/resend-code', { email });
  return res.data;
};

// 🔑 Forgot password
export const forgotPassword = async (email: string) => {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
};

// 🔒 Reset password
export const resetPassword = async (data: ResetPasswordData) => {
  const res = await api.post('/auth/reset-password', data);
  return res.data;
};
