// src/features/ManageDoctors/useDoctors.ts

import { useEffect, useState, useCallback } from 'react';
import { getDoctors } from '@/services/doctors';
import type { SanitizedDoctor } from '@/types/doctor';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<SanitizedDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    loading,
    error,
    refetch: fetchDoctors,
  };
};
