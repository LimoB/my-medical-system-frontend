import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import api from '@/services/axios';
import type { RootState } from '@/store/store';
import type { DecodedToken } from '@/types/auth';
import type { Prescription } from '@/types/prescription';

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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-500 bg-clip-text text-transparent">
        My Prescriptions
      </h2>

      {loading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Loader2 className="animate-spin w-5 h-5" />
          Loading prescriptions...
        </div>
      )}

      {error && (
        <p className="text-red-600 font-medium border border-red-200 bg-red-50 p-3 rounded">
          {error}
        </p>
      )}

      {!loading && prescriptions.length === 0 && (
        <p className="text-gray-600 text-sm italic">No prescriptions found.</p>
      )}

      <div className="grid gap-4">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="border border-gray-200 p-5 rounded-2xl shadow-sm bg-white space-y-2 transition hover:shadow-md"
          >
            <p className="text-sm">
              <span className="font-semibold text-gray-700">Appointment:</span>{' '}
              {prescription.appointment_title || `#${prescription.appointment_id}`}
            </p>

            <p className="text-sm">
              <span className="font-semibold text-gray-700">Doctor:</span>{' '}
              {prescription.doctor_name || `Doctor #${prescription.doctor_id}`}
            </p>

            {prescription.notes && (
              <p className="text-sm text-wrap text-balance">
                <span className="font-semibold text-gray-700">Notes:</span>{' '}
                {prescription.notes}
              </p>
            )}

            {prescription.image_url && (
              <div className="mt-2">
                <img
                  src={prescription.image_url}
                  alt="Prescription"
                  className="w-full max-w-xs rounded-lg border"
                />
              </div>
            )}

            <p className="text-xs text-gray-500 pt-2">
              Issued on: {new Date(prescription.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPrescriptions;
