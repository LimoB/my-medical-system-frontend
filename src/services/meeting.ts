// src/services/meeting.ts
import api from './axios';
import type {
  Meeting,
  CreateMeetingPayload,
  UpdateAttendancePayload,
} from '@/types/meeting';

const BASE_URL = '/doctor-meetings';

/**
 * 🔹 Fetch all meetings (public + admin)
 */
export const getMeetings = async (): Promise<Meeting[]> => {
  const res = await api.get<Meeting[]>(BASE_URL);
  return res.data;
};

/**
 * 🔹 Fetch a meeting by ID
 */
export const getMeetingById = async (id: number): Promise<Meeting> => {
  const res = await api.get<Meeting>(`${BASE_URL}/${id}`);
  return res.data;
};

/**
 * 🔹 Create a new meeting (admin only)
 */
export const createMeeting = async (
  payload: CreateMeetingPayload
): Promise<Meeting> => {
  const res = await api.post<{ message: string; meeting: Meeting }>(
    BASE_URL,
    payload
  );
  return res.data.meeting;
};

/**
 * 🔹 Delete a meeting (admin only)
 */
export const deleteMeeting = async (id: number): Promise<string> => {
  const res = await api.delete<{ message: string }>(`${BASE_URL}/${id}`);
  return res.data.message;
};

/**
 * 🔹 Update meeting attendance (admin only)
 */
export const updateMeetingAttendance = async (
  attendanceId: number,
  payload: UpdateAttendancePayload
): Promise<string> => {
  const res = await api.put<{ message: string }>(
    `${BASE_URL}/attendance/${attendanceId}`,
    payload
  );
  return res.data.message;
};

/**
 * 🔹 Delete meeting attendance (admin only)
 */
export const deleteMeetingAttendance = async (
  attendanceId: number
): Promise<string> => {
  const res = await api.delete<{ message: string }>(
    `${BASE_URL}/attendance/${attendanceId}`
  );
  return res.data.message;
};
