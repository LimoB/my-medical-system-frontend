// src/features/user/Prescriptions/UserPrescriptions.tsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '@/services/axios';
import type { RootState } from '@/store/store';
import type { DecodedToken } from '@/features/slices/authSlice';
import type { Prescription } from '@/types/prescription';
import { Loader2 } from 'lucide-react';

const UserPrescriptions = () => {
  const user = useSelector((state: RootState) => state.auth.user as DecodedToken | null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchPrescriptions = async () => {
      try {
        const { data } = await api.get(`/prescriptions/user/${user.id}`);
        setPrescriptions(data);
      } catch (err) {
        setError('Failed to load prescriptions.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [user?.id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">My Prescriptions</h2>

      {loading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="animate-spin w-5 h-5" />
          Loading prescriptions...
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && prescriptions.length === 0 && (
        <p className="text-gray-600">No prescriptions found.</p>
      )}

      {prescriptions.map((prescription) => (
        <div
          key={prescription.id}
          className="border border-gray-200 p-4 rounded-md shadow-sm mb-4 bg-white"
        >
          <p className="mb-1">
            <span className="font-semibold text-gray-700">Appointment:</span>{' '}
            {prescription.appointment_title || `#${prescription.appointment_id}`}
          </p>

          <p className="mb-1">
            <span className="font-semibold text-gray-700">Doctor:</span>{' '}
            {prescription.doctor_name || `Doctor #${prescription.doctor_id}`}
          </p>

          {prescription.notes && (
            <p className="mb-1">
              <span className="font-semibold text-gray-700">Notes:</span>{' '}
              {prescription.notes}
            </p>
          )}

          {prescription.image_url && (
            <div className="mt-2">
              <img
                src={prescription.image_url}
                alt="Prescription"
                className="max-w-xs rounded-md border"
              />
            </div>
          )}

          <p className="text-sm text-gray-500 mt-2">
            Issued on: {new Date(prescription.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserPrescriptions;
