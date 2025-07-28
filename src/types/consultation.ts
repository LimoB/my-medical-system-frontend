import type { Appointment } from './appointment';
import type { User } from './user';
import type { SanitizedDoctor as Doctor } from './doctor';

export type ConsultationStatus = 'Ongoing' | 'Completed';
export type ConsultationType = 'initial' | 'follow-up' | 'review';

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
  reference_code?: string;
  consultation_date?: string;

  consultation_type: ConsultationType;
  status: ConsultationStatus;

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
  reference_code?: string;
  consultation_date?: string;

  consultation_type?: ConsultationType; // defaults to 'initial'
  status?: ConsultationStatus;          // defaults to 'Completed'
}
