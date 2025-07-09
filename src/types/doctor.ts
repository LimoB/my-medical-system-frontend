// -- Reusable sanitized user structure --
export interface SanitizedUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_phone?: string | null;
  address?: string | null;
  image_url?: string | null;
}

// -- Payload for creating/updating doctor (frontend form) --
export interface DoctorCreatePayload {
  user_id: number;
  specialization: string;
  available_days?: string;
}

// -- Appointment summary for doctor table or detail view --
export interface AppointmentSummary {
  appointment_id: number;
  appointment_date: string; // ISO format
  time_slot: string;        // HH:MM
  appointment_status: 'Pending' | 'Confirmed' | 'Cancelled';
  user?: SanitizedUser;     // patient
}

// -- Prescription summary for doctor table or detail view --
export interface PrescriptionSummary {
  prescription_id: number;
  patient?: SanitizedUser;
}

// -- Fully populated doctor for frontend display --
export interface SanitizedDoctor {
  user_id: any;
  doctor_id: number;
  specialization: string;
  available_days?: string;
  user?: SanitizedUser;
  appointments?: AppointmentSummary[];
  prescriptions?: PrescriptionSummary[];
}
