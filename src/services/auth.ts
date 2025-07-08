import api from './axios';
import type {
  RegisterData,
  LoginData,
  VerifyEmailData,
  ResetPasswordData,
} from '../types/auth';

// ========== Auth APIs ==========

export const registerUser = async (data: RegisterData) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: LoginData) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const verifyEmail = async (data: VerifyEmailData) => {
  const res = await api.post('/auth/verify-email', data);
  return res.data;
};

export const resendCode = async (email: string) => {
  const res = await api.post('/auth/resend-code', { email });
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
};

export const resetPassword = async (data: ResetPasswordData) => {
  const res = await api.post('/auth/reset-password', data);
  return res.data;
};
