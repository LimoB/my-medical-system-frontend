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
  available_hours?: string[];
  payment_per_hour: number;
  description?: string; // New field for doctor description
}

// -- Appointment summary for doctor table or detail view --
export interface AppointmentSummary {
  date(date: any): unknown;
  appointment_id: number;
  appointment_date: string; // ISO format
  time_slot: string;        // HH:MM
  appointment_status: 'Pending' | 'Confirmed' | 'Cancelled';
  user?: SanitizedUser;     // Patient data associated with the appointment
}

// -- Prescription summary for doctor table or detail view --
export interface PrescriptionSummary {
  prescription_id: number;
  patient?: SanitizedUser; // Patient associated with the prescription
}

// -- Fully populated doctor for frontend display --
export interface SanitizedDoctor {
  doctor_id: number;
  user_id: number;
  name: string; // Concatenated first_name and last_name
  specialty: string;
  image: string; // URL of the image
  payment_per_hour: number;
  available_hours: string[]; // Available hours
  available_days: string; // Available days
  specialization: string; // Same as specialty
  description?: string; // New field for doctor description
  appointments: AppointmentSummary[];
  prescriptions: PrescriptionSummary[];
  user: SanitizedUser; // User object
}


export type DoctorPatient = {
  user: {
    address: string;
    created_at: any;
    last_login: any;
    is_verified: any;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_phone: string;
    image_url: string;
  };
  appointmentDate: string;
  timeSlot: string;
  status: string;
};


// -- Consultation summary (for doctor's consultation list) --
export interface ConsultationSummary {
  consultation_id: number;
  appointment_id: number;
  diagnosis: string;
  status: 'Ongoing' | 'Completed';
  created_at: string;
  duration_minutes?: number;
  patient?: SanitizedUser;
}

// -- Add this to doctor profile type if needed --
export interface SanitizedDoctorWithConsultations extends SanitizedDoctor {
  consultations: ConsultationSummary[];
}
