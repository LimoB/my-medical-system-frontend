// src/types/user.ts

// 🔹 Define possible roles a user can have
export type UserRole = 'admin' | 'doctor' | 'user';

// 🔹 Payload for creating a new user (used in registration or admin create)
export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_phone?: string;
  address?: string;
  role?: UserRole; // Optional — defaults to 'user' on backend
}

// 🔹 Payload for updating an existing user (partial fields)
export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  contact_phone?: string;
  address?: string;
  role?: UserRole;
}

// 🔹 Full user object returned from backend (includes sensitive & audit data)
export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_phone?: string;
  address?: string;
  role: UserRole;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  // password and token fields should NOT be exposed to frontend
}

// 🔹 Sanitized version of user (safe for frontend use in relational fields)
export interface SanitizedUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_phone?: string | null;
  address?: string | null;
  image_url?: string | null; // Optional avatar
}
