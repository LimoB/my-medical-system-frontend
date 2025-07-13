// src/features/user/MyAppointments/AppointmentCard.tsx
// src/features/user/MyAppointments/AppointmentCard.tsx
import type { Appointment } from '@/types/appointment';
import AppointmentStatusBadge from '@/components/AppointmentStatusBadge';

type Props = {
  appointment: Appointment;
};

const AppointmentCard = ({ appointment }: Props) => {
  const {
    appointment_date,
    time_slot,
    appointment_status,
    created_at,
    doctor,
  } = appointment;

  const doctorName = doctor?.user
    ? `${doctor.user.first_name} ${doctor.user.last_name}`
    : 'N/A';
  const specialization = doctor?.specialization || 'General';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-teal-700">{doctorName}</h3>
          <p className="text-sm text-gray-500">{specialization}</p>
        </div>
        <AppointmentStatusBadge status={appointment_status} />
      </div>

      <div className="mt-3 text-sm text-gray-600">
        <p>
          <strong>Date:</strong> {appointment_date}
        </p>
        <p>
          <strong>Time:</strong> {time_slot}
        </p>
        <p>
          <strong>Booked:</strong>{' '}
          {new Date(created_at).toLocaleString('en-KE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default AppointmentCard;
