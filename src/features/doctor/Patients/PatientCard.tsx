//PatientCard.tsx
import { Trash2 } from 'lucide-react';
import type { DoctorPatient } from '@/types/doctor';

type Props = {
  patient: DoctorPatient;
  onDelete: (userId: number) => void;
  deleting: boolean;
};

const PatientCard = ({ patient, onDelete, deleting }: Props) => {
  const { user } = patient;

  return (
    <div className="relative border rounded-xl p-5 bg-white shadow hover:shadow-md transition">
      <button
        onClick={() => onDelete(user.user_id)}
        disabled={deleting}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
        title="Delete patient"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.image_url || '/default-avatar.jpg'}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.contact_phone}</p>
        </div>
      </div>

      <div className="text-sm space-y-1 text-gray-700 mb-3">
        <p><strong>Date:</strong> {patient.appointmentDate ? new Date(patient.appointmentDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Time:</strong> {patient.timeSlot || 'N/A'}</p>
        <p><strong>Status:</strong> {patient.status || 'Unknown'}</p>
      </div>

      <div className="text-sm space-y-1 text-gray-600">
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
        <p><strong>Verified:</strong> {user.is_verified ? 'Yes' : 'No'}</p>
        <p><strong>Last Login:</strong> {user.last_login ? new Date(user.last_login).toLocaleString() : 'N/A'}</p>
        <p><strong>Joined:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default PatientCard;
