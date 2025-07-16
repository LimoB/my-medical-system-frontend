// src/types/meeting.ts

export interface Meeting {
  meeting_id: number;
  title: string;
  description: string;
  meeting_date: string; // ISO string e.g. "2025-07-25"
  meeting_time: string; // e.g. "09:00:00"
  is_global: boolean;
  created_at: string;
  updated_at: string;
  attendees?: MeetingAttendee[];
}

export interface MeetingAttendee {
  attendance_id: number;
  meeting_id: number;
  doctor_id: number;
  status: 'pending' | 'attended' | 'missed';
  attended: boolean;
}

export interface CreateMeetingPayload {
  title: string;
  description?: string;
  meeting_date: string;
  meeting_time: string;
  is_global?: boolean;
}

export interface UpdateAttendancePayload {
  status?: 'pending' | 'attended' | 'missed';
  attended?: boolean;
}
