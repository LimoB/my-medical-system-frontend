// Define the possible roles a user can have
export type UserRole = 'admin' | 'doctor' | 'user';

// Payload for creating a new user
export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_phone?: string;
  address?: string;
  role?: UserRole; // Defaults to 'user' if not provided
}

// Payload for updating an existing user
export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  contact_phone?: string;
  address?: string;
  role?: UserRole;
}

// Full user object returned from the backend
export interface User {
  user_id: number; // Primary key
  first_name: string;
  last_name: string;
  email: string;
  contact_phone?: string;
  address?: string;
  role: UserRole;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}
