// src/types/appointment.ts

import type { Key } from "react";

export interface Appointment {
  id: Key | null | undefined;
  appointment_id: number;
  user_id: number;
  doctor_id: number;
  appointment_date: string; // ISO date string
  time_slot: string; // HH:MM:SS or HH:MM
  total_amount?: string;
  appointment_status: 'Pending' | 'Confirmed' | 'Cancelled';
  created_at: string;
  updated_at: string;

  // Optional populated relational data
  user?: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
  };

  doctor?: {
    doctor_id: number;
    specialization?: string;
    available_days?: string | null;

    // ✅ Nested user details of the doctor (e.g., for full name)
    user?: {
      user_id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

// For use when creating a new appointment (POST)
export interface AppointmentCreatePayload {
  user_id: number;
  doctor_id: number;
  appointment_date: string;
  time_slot: string;
  total_amount?: string;
}

// For updating status (PUT)
export interface AppointmentStatusUpdatePayload {
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

// Alias for frontend views
export type SanitizedAppointment = Appointment;
