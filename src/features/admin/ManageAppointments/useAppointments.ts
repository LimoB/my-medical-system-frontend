// src/features/ManageAppointments/useAppointments.ts
import { useEffect, useState } from 'react';
import { fetchAppointments } from '@/services/appointments';
import type { SanitizedAppointment } from '@/types/appointment';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<SanitizedAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAppointments = async () => {
    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return { appointments, loading, error, refresh: loadAppointments };
};
