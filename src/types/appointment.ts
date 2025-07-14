import type { Key } from "react";

// === Appointment object returned from backend ===
export interface Appointment {
  id: Key | null | undefined;              // For React list keys, optional
  appointment_id: number;
  user_id: number;
  doctor_id: number;
  appointment_date: string;                // ISO date string, e.g. "2025-07-13"
  time_slot: string;                       // e.g. "10:00" or "10:00:00"
  total_amount?: string;                   // stored as decimal string from DB
  appointment_status: 'Pending' | 'Confirmed' | 'Cancelled';
  created_at: string;                      // ISO timestamp string
  updated_at: string;

  // Optional populated relational data (joined tables)
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

    // Nested user details of the doctor
    user?: {
      user_id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

// === Payload for creating a new appointment (POST) ===
export type AppointmentCreatePayload = {
  user_id: number;                          // required by backend
  doctor_id: number;
  appointment_date: string;                 // 'YYYY-MM-DD' string format
  time_slot: string;                        // 'HH:MM' string format
  total_amount: number;                     // required
  payment_per_hour: number;                 // required
  payment_method?: 'mpesa' | 'stripe' | 'cash'; // optional, include only if backend supports it
  // appointment_status?: 'Pending' | 'Confirmed' | 'Cancelled'; // usually backend default 'Pending'
};

// === Payload for updating appointment status (PUT) ===
export interface AppointmentStatusUpdatePayload {
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

// === Alias type for frontend sanitized views ===
export type SanitizedAppointment = Appointment;
