// src/types/auth.ts

// 🔐 User registration payload
export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_phone?: string;
  address?: string;
  date_of_birth?: string;
  role?: 'user' | 'admin' | 'doctor';
  image_url?: string;
}

// 🔐 User login payload
export interface LoginData {
  email: string;
  password: string;
}

// 📧 Email verification
export interface VerifyEmailData {
  email: string;
  code: string;
}

// 🔑 Reset password
export interface ResetPasswordData {
  code: string;
  newPassword: string;
}

// 🧾 JWT Decoded Token structure used in frontend state
export interface DecodedToken {
  token?: any;                   // Optional token (for local state)
  id: number;                    // Numeric ID
  user_id?: number;              // Alias for id
  doctorId?: number | null;      // If doctor, include doctor ID
  specialization?: string;       // If doctor, include specialization

  email: string;
  role: 'admin' | 'doctor' | 'user';
  first_name: string;
  last_name: string;
  name: string;

  image_url?: string;
  contact_phone?: string;
  address?: string;
  date_of_birth?: string;
  is_verified?: boolean;

  created_at: string;
  updated_at: string;

  exp: number;
  iat?: number;
}
