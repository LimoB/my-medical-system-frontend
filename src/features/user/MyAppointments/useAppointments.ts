// File: src/features/user/MyAppointments/useAppointments.ts
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { fetchAppointmentsByUserId } from '@/services/appointments';
import type { Appointment } from '@/types/appointment';

interface UseAppointmentsResult {
  appointments: Appointment[];
  loading: boolean;
  error: string;
  fetchAppointments: () => Promise<void>;
}

const useAppointments = (): UseAppointmentsResult => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userId = useSelector((state: RootState) => state.auth.user?.id); // 👈 from Redux

  const fetchAppointments = useCallback(async () => {
    if (!userId) {
      console.warn('⚠️ User ID not available. Cannot fetch appointments.');
      setError('User ID not available. Please log in again.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchAppointmentsByUserId(userId);
      setAppointments(data);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        // @ts-ignore
        setError(err.response?.data?.message || 'Failed to fetch appointments.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch appointments.');
      }
    } finally {
      setLoading(false);
    }
  }, [userId]); // 👈 dependency

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
  };
};

export default useAppointments;
