// src/features/user/MyAppointments/useAppointments.ts
import { useState } from 'react';
import { fetchMyAppointments } from '@/services/appointments';
import type { Appointment } from '@/types/appointment';

const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await fetchMyAppointments();
      setAppointments(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch appointments.');
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
  };
};

export default useAppointments;
