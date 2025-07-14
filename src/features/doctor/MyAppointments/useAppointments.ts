// File: src/features/doctors/MyAppointments/useAppointments.ts
import { useEffect, useState } from 'react';
import type { Appointment } from '@/types/appointment';
import { fetchAppointmentsByDoctor } from '@/services/appointments'; // ✅ Correct service

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointmentsByDoctor(); // ✅ Fetch for logged-in doctor only
        setAppointments(data);
      } catch (err) {
        console.error('Failed to fetch doctor appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  return { appointments, loading };
};
