import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchConsultationsByDoctor, fetchDoctorByUserId } from '@/services/consultations';
import type { RootState } from '@/store/store';
import type { Consultation } from '@/types/consultation';

const DoctorConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const loadConsultations = async () => {
      if (!user || user.role !== 'doctor') {
        console.warn('User not authorized or not logged in');
        return;
      }

      if (typeof user.user_id !== 'number') {
        console.warn('Invalid user_id for doctor');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Optional doctor fetch (you can remove if unused)
        const doctor = await fetchDoctorByUserId(user.user_id);
        console.log('Logged-in doctor profile:', doctor);

        const data = await fetchConsultationsByDoctor();
        console.log('Fetched consultations:', data);
        setConsultations(data);
      } catch (err: any) {
        console.error('Error loading doctor consultations:', err);
        setError(err?.response?.data?.error || 'Failed to load consultations.');
      } finally {
        setLoading(false);
      }
    };

    loadConsultations();
  }, [user]);

  if (loading) return <p>Loading consultations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">My Consultations</h2>
      {consultations.length === 0 ? (
        <p>No consultations found.</p>
      ) : (
        <ul className="space-y-4">
          {consultations.map((consultation) => (
            <li key={consultation.id} className="border p-4 rounded-lg">
              <p><strong>Patient:</strong> {consultation.patient?.full_name || 'N/A'}</p>
              <p><strong>Status:</strong> {consultation.status}</p>
              <p><strong>Date:</strong> {new Date(consultation.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorConsultations;
