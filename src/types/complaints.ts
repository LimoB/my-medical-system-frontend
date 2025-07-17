export type ComplaintStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Appointment {
  appointment_id: number;
  date: string;    // e.g. "2025-07-17"
  time: string;    // e.g. "14:00"
}

export interface Complaint {
  complaint_id: number;
  related_appointment_id: number;
  user: User | null;
  appointment: Appointment | null;
  subject: string;
  description: string;
  status: ComplaintStatus;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
