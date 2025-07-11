import { Button } from '@/components/ui/button';
import type { SanitizedDoctor } from '@/types/doctor';

interface Props {
  doctors: SanitizedDoctor[];
  onView: (doctor: SanitizedDoctor) => void;
  onEdit: (doctor: SanitizedDoctor) => void;
  onDelete: (id: number) => void;
}

const DoctorTable = ({ doctors, onView, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-green-100 to-blue-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Specialization
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Available Days
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Available Hours
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Payment per Hour
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {doctors.map((doc) => (
            <tr
              key={doc.doctor_id && doc.doctor_id !== 0 ? doc.doctor_id : `user-${doc.user_id}`}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {doc.user?.first_name ?? '—'} {doc.user?.last_name ?? ''}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {doc.specialization || '—'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {doc.available_days || '—'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {/* Format Available Hours as a comma-separated string */}
                {doc.available_hours && doc.available_hours.length > 0
                  ? doc.available_hours.join(', ')
                  : '—'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {/* Show the payment per hour */}
                {doc.payment_per_hour ? `$${doc.payment_per_hour}` : '—'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => onView(doc)}
                    className="text-blue-600 border border-blue-500 hover:bg-black hover:text-white hover:border-black px-3 py-1 text-sm rounded-md"
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onEdit(doc)}
                    className="text-green-600 border border-green-500 hover:bg-black hover:text-white hover:border-black px-3 py-1 text-sm rounded-md"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onDelete(doc.doctor_id)}
                    className="text-red-600 border border-red-500 hover:bg-black hover:text-white hover:border-black px-3 py-1 text-sm rounded-md"
                    disabled={!doc.doctor_id || doc.doctor_id === 0}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
