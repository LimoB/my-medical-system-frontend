import type { Appointment } from './appointment';
import type { User } from './user';
import type { SanitizedDoctor as Doctor } from './doctor';

export interface Consultation {
  consultation_id: number;
  appointment_id: number;
  doctor_id: number;
  patient_id: number;
  symptoms?: string;
  diagnosis: string;
  treatment_plan?: string;
  additional_notes?: string;
  duration_minutes?: number;
  status: 'Ongoing' | 'Completed';
  created_at: string;
  updated_at: string;

  // Populated fields (optional)
  appointment?: Appointment;
  doctor?: Doctor;
  patient?: User;
}

// 🔹 Payload for creating a new consultation
export interface ConsultationCreatePayload {
  appointment_id: number;
  doctor_id: number;
  patient_id: number;
  symptoms?: string;
  diagnosis: string;
  treatment_plan?: string;
  additional_notes?: string;
  duration_minutes?: number;
  status?: 'Ongoing' | 'Completed';
}
