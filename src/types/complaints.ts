// src/types/complaints.ts

export type ComplaintStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Appointment {
  appointment_id: number;
  date: string;
  time: string;
}

export interface Complaint {
  complaint_id: number;
  user: User | null;
  appointment: Appointment | null;
  subject: string;
  description: string;
  status: ComplaintStatus;
  created_at: string;
  updated_at: string;
}
