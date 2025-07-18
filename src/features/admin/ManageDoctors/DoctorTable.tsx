import { Button } from '@/components/ui/button';
import type { SanitizedDoctor } from '@/types/doctor';

interface Props {
  doctors: SanitizedDoctor[];
  onView: (doctor: SanitizedDoctor) => void;
  onEdit: (doctor: SanitizedDoctor) => void;
  onDelete: (id: number) => void;
}

const DoctorTable = ({ doctors, onView, onEdit, onDelete }: Props) => {
  const renderDoctorRow = (doc: SanitizedDoctor) => {
    const id = doc.doctor_id && doc.doctor_id !== 0 ? doc.doctor_id : `user-${doc.user_id}`;
    const name = `${doc.user?.first_name ?? '—'} ${doc.user?.last_name ?? ''}`;
    const avatar = doc.user?.image_url || `/fallback-avatar-${Math.floor(Math.random() * 3) + 1}.jpeg`;

    return (
      <tr key={id} className="hover:bg-gray-50 transition">
        <td className="px-6 py-4">
          <img
            src={avatar}
            alt={`${name} avatar`}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{name}</td>
        <td className="px-6 py-4 text-sm text-gray-700">{doc.specialization || '—'}</td>
        <td className="px-6 py-4 text-sm text-gray-700">{doc.available_days || '—'}</td>
        <td className="px-6 py-4 text-sm text-gray-700">
          {doc.available_hours?.length ? doc.available_hours.join(', ') : '—'}
        </td>
        <td className="px-6 py-4 text-sm text-gray-700">
          {doc.payment_per_hour ? `KSh ${doc.payment_per_hour.toLocaleString()}` : '—'}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => onView(doc)}
              className="text-blue-600 border border-blue-500 hover:bg-blue-500 hover:text-white transition"
            >
              View
            </Button>
            <Button
              size="sm"
              onClick={() => onEdit(doc)}
              className="text-green-600 border border-green-500 hover:bg-green-500 hover:text-white transition"
            >
              Edit
            </Button>
            <Button
              size="sm"
              onClick={() => onDelete(doc.doctor_id)}
              className="text-red-600 border border-red-500 hover:bg-red-500 hover:text-white transition"
              disabled={!doc.doctor_id || doc.doctor_id === 0}
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
      {doctors.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No doctors found.</div>
      ) : (
        <table
          className="min-w-full divide-y divide-gray-200"
          aria-label="List of doctors"
        >
          <thead className="bg-gradient-to-r from-teal-100 to-blue-100">
            <tr>
              {[
                'Profile',
                'Name',
                'Specialization',
                'Available Days',
                'Available Hours',
                'Payment per Hour',
                'Actions',
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {doctors.map(renderDoctorRow)}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorTable;
