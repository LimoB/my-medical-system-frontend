import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader2, FileText } from 'lucide-react';
import api from '@/services/axios';
import type { RootState } from '@/store/store';
import type { DecodedToken } from '@/types/auth';
import type { Prescription } from '@/types/prescription';

const UserPrescriptions = () => {
  const user = useSelector((state: RootState) => state.auth.user as DecodedToken | null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

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
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-sky-600 flex items-center gap-2">
        <FileText className="w-6 h-6 text-sky-600" />
        My Prescriptions
      </h2>

      {loading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Loader2 className="animate-spin w-5 h-5" />
          Loading prescriptions...
        </div>
      )}

      {!loading && prescriptions.length === 0 && (
        <p className="text-gray-500 italic border border-blue-100 bg-blue-50 p-4 rounded-lg text-center">
          No prescriptions yet. Please wait for your doctor to issue one.
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="relative p-[2px] rounded-2xl bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-500"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-xl space-y-4 transition-transform hover:scale-[1.015] duration-300">
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">
                  Appointment:{' '}
                  <span className="text-sky-600">
                    {prescription.appointment_title || `#${prescription.appointment_id}`}
                  </span>
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(prescription.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Doctor */}
              <p className="text-sm">
                <span className="font-semibold text-gray-700">Doctor:</span>{' '}
                <span className="text-blue-700 font-medium">
                  {prescription.doctor_name || `Doctor #${prescription.doctor_id}`}
                </span>
              </p>

              {/* Notes */}
              {prescription.notes && (
                <p className="text-sm text-gray-700 text-wrap text-balance">
                  <span className="font-semibold">Notes:</span> {prescription.notes}
                </p>
              )}

              {/* Image */}
              {prescription.image_url && (
                <div className="mt-2">
                  <img
                    src={prescription.image_url}
                    alt="Prescription"
                    className="w-full max-w-xs rounded-lg border border-cyan-200 shadow"
                  />
                </div>
              )}

              {/* Footer */}
              <p className="text-xs text-gray-500 pt-2">
                Issued on:{' '}
                <span className="text-gray-700 font-medium">
                  {new Date(prescription.created_at).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPrescriptions;
