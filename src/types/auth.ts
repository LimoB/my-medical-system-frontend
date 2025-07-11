// src/types/auth.ts

// Register data interface, used for user registration
export interface RegisterData {
  first_name: string;  // First name of the user
  last_name: string;   // Last name of the user
  email: string;       // User email (must be unique)
  password: string;    // Password for user authentication
  contact_phone?: string;  // Optional phone number for the user
  address?: string;        // Optional address for the user
  role?: 'user' | 'admin' | 'doctor';  // Optional user role (default is 'user')
  image_url?: string;  // Optional user profile image URL (can be provided during registration)
}

// Login data interface, used when a user logs in
export interface LoginData {
  email: string;    // User email for authentication
  password: string; // Password for authentication
}

// Verify email interface, used for email verification
export interface VerifyEmailData {
  email: string;    // The email to verify
  code: string;     // Verification code sent to the user
}

// Reset password data interface, used when resetting the password
export interface ResetPasswordData {
  code: string;         // The code sent to the user for password reset
  newPassword: string;  // New password for the user
}

// Decoded Token Interface, includes image_url and name for profile
export interface DecodedToken {
  userId: string;      // User's unique identifier (ID)
  email: string;       // User email
  role: string;        // User's role (admin, doctor, or user)
  name?: string;       // User's full name (can be `first_name + last_name`)
  image_url?: string;  // User's profile image URL
  exp: number;         // JWT expiration timestamp
  iat: number;         // JWT issued at timestamp
}
