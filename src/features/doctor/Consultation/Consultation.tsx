import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import type { Consultation as ConsultationType } from '@/types/consultation';
import type { RootState } from '@/store/store';
import {
  fetchAllConsultations,
  fetchConsultationsByDoctor,
  fetchConsultationsByPatientId,
} from '@/services/consultations';

const Consultation = () => {
  const [consultations, setConsultations] = useState<ConsultationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const loadConsultations = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        let data: ConsultationType[] = [];

        if (user.role === 'admin') {
          data = await fetchAllConsultations();
        } else if (user.role === 'doctor') {
          data = await fetchConsultationsByDoctor();
        } else {
          data = await fetchConsultationsByPatientId(user.user_id!);
        }

        setConsultations(data);
      } catch (err: any) {
        console.error('Error fetching consultations:', err);
        setError(err?.response?.data?.error || 'Failed to load consultations.');
      } finally {
        setLoading(false);
      }
    };

    loadConsultations();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Consultations
      </h1>

      {loading && (
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 className="animate-spin w-5 h-5" />
          <span>Loading consultations...</span>
        </div>
      )}

      {error && (
        <div className="text-red-600 font-medium mt-4">{error}</div>
      )}

      {!loading && !error && consultations.length === 0 && (
        <p className="text-gray-500">No consultations found.</p>
      )}

      {!loading && !error && consultations.length > 0 && (
        <div className="overflow-x-auto border rounded-md mt-4">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-medium">Patient</th>
                <th className="px-4 py-2 font-medium">Doctor</th>
                <th className="px-4 py-2 font-medium">Diagnosis</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((c) => (
                <tr key={c.consultation_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {c.patient
                      ? `${c.patient.first_name} ${c.patient.last_name}`
                      : 'Unknown Patient'}
                  </td>
                  <td className="px-4 py-2">{c.doctor?.name ?? 'Unknown Doctor'}</td>
                  <td className="px-4 py-2">{c.diagnosis}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${c.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Consultation;
