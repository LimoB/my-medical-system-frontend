// -- Prescription type returned from API --
export interface Prescription {
  appointment_title: string;
  doctor_name: string;
  id: Key | null | undefined;
  prescription_id: number;      // Matches DB primary key
  appointment_id: number;
  doctor_id: number;
  patient_id: number;
  notes?: string;
  image_url?: string;
  created_at: string;           // ISO timestamp string
  updated_at: string;           // ISO timestamp string
}

// -- Payload for creating a new prescription --
export interface PrescriptionCreatePayload {
  appointment_id: number;
  doctor_id: number;
  patient_id: number;
  notes?: string;
  image_url?: string;
}

// -- Payload for updating an existing prescription --
export interface PrescriptionUpdatePayload {
  notes?: string;
  image_url?: string;
}
