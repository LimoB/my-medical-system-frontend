import { Button } from '@/components/ui/button';
import type { Appointment } from '@/types/appointment';

interface Props {
  appointments: Appointment[];
  onView: (appointment: Appointment) => void;
}

const AppointmentTable = ({ appointments, onView }: Props) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-green-100 to-blue-100">
          <tr>
            {['Patient', 'Doctor', 'Date', 'Time', 'Status', 'Actions'].map((heading) => (
              <th
                key={heading}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {appointments.map((appt) => (
            <tr key={appt.appointment_id} className="hover:bg-gray-50 transition-colors">
              {/* Patient Name */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {appt.user
                  ? `${appt.user.first_name} ${appt.user.last_name}`
                  : '—'}
              </td>

              {/* Doctor Name */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {appt.doctor?.user
                  ? `${appt.doctor.user.first_name} ${appt.doctor.user.last_name}`
                  : '—'}
              </td>

              {/* Date */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {appt.appointment_date || '—'}
              </td>

              {/* Time */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {appt.time_slot || '—'}
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    appt.appointment_status === 'Confirmed'
                      ? 'bg-green-100 text-green-700'
                      : appt.appointment_status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {appt.appointment_status}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <Button
                  size="sm"
                  className="text-green-600 border border-green-500 hover:bg-black hover:text-white hover:border-black transition-colors px-4 py-1 text-sm rounded-md"
                  onClick={() => onView(appt)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
