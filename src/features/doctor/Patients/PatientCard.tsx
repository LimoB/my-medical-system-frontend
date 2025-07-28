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
    <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all border border-gray-200 p-6 w-full max-w-md overflow-hidden group">
      {/* Gradient Background Ring */}
      <div className="absolute -inset-[2px] bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 opacity-10 group-hover:opacity-20 rounded-3xl blur-md z-0" />

      {/* Delete Button */}
      <button
        onClick={() => onDelete(user.user_id)}
        disabled={deleting}
        className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition z-10"
        title="Delete patient"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {/* Avatar & Basic Info */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <img
          src={user.image_url || '/default-avatar.jpg'}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-16 h-16 rounded-full border border-cyan-300 object-cover shadow"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.contact_phone}</p>
        </div>
      </div>

      {/* Appointment Info */}
      <div className="mb-4 relative z-10">
        <h4 className="text-sm font-semibold text-sky-700 mb-2">Appointment Details</h4>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <p><span className="font-semibold">Date:</span> {patient.appointmentDate ? new Date(patient.appointmentDate).toLocaleDateString() : 'N/A'}</p>
          <p><span className="font-semibold">Time:</span> {patient.timeSlot || 'N/A'}</p>
          <p className="col-span-2">
            <span className="font-semibold">Status:</span>{' '}
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium shadow-sm transition ${patient.status === 'Confirmed'
                  ? 'bg-green-100 text-green-700'
                  : patient.status === 'Cancelled'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
            >
              {patient.status ?? 'Unknown'}
            </span>


          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-sm space-y-2 text-gray-700 relative z-10">
        <p><span className="font-semibold">Address:</span> {user.address || 'N/A'}</p>
        <p>
          <span className="font-semibold">Verified:</span>{' '}
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${user.is_verified
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
            }`}>
            {user.is_verified ? 'Yes' : 'No'}
          </span>
        </p>
        <p><span className="font-semibold">Last Login:</span> {user.last_login ? new Date(user.last_login).toLocaleString() : 'N/A'}</p>
        <p><span className="font-semibold">Joined:</span> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default PatientCard;
