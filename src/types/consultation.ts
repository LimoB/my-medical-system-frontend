// File: types/consultation.ts

import type { Appointment } from './appointment';
import type { User } from './user';
import type { SanitizedDoctor as Doctor } from './doctor';
import type { Key } from 'react';

// Enums for consultation type and status
export type ConsultationStatus = 'Ongoing' | 'Completed';
export type ConsultationType = 'initial' | 'follow-up' | 'review';

// Main Consultation interface
export interface Consultation {
  id: Key | null | undefined;
  consultation_id: number;
  appointment_id: number;
  doctor_id: number;
  patient_id: number;

  diagnosis: string;
  prescription: string;
  observation: string;

  symptoms?: string;
  treatment_plan?: string;
  additional_notes?: string;
  duration_minutes?: number;
  reference_code?: string;
  consultation_date?: string;

  consultation_type: ConsultationType;
  status: ConsultationStatus;

  created_at: string;
  updated_at: string;

  // Populated/related fields
  appointment?: Appointment;
  doctor?: Doctor;
  patient?: User;
}

// Payload interface for creating a new consultation
export interface ConsultationCreatePayload {
  appointment_id: number;
  doctor_id: number;
  patient_id: number;

  diagnosis: string;
  observation?: string; // ✅ Add this line
  prescription?: string; // ✅ Add this line

  symptoms?: string;
  treatment_plan?: string;
  additional_notes?: string;
  duration_minutes?: number;
  reference_code?: string;
  consultation_date?: string;

  consultation_type?: ConsultationType; // default to 'initial'
  status?: ConsultationStatus;          // default to 'Completed'
}
