// src/features/user/MyAppointments/AppointmentCard.tsx
import { useSelector } from 'react-redux';
import type { Appointment } from '@/types/appointment';
import AppointmentStatusBadge from '@/components/AppointmentStatusBadge';
import type { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';

type Props = {
  appointment: Appointment;
  onReschedule?: (appointment: Appointment) => void;
};

const AppointmentCard = ({ appointment, onReschedule }: Props) => {
  const {
    appointment_date,
    time_slot,
    appointment_status,
    created_at,
    doctor,
  } = appointment;

  const { user } = useSelector((state: RootState) => state.auth);
  const isPatient = user?.role === 'user'; // 'user' means patient in your system

  const doctorName = doctor?.user
    ? `${doctor.user.first_name ?? ''} ${doctor.user.last_name ?? ''}`.trim() || 'N/A'
    : 'N/A';

  const specialization = doctor?.specialization || 'General';

  const handleRescheduleClick = () => {
    if (onReschedule) onReschedule(appointment);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-teal-700">{doctorName}</h3>
          <p className="text-sm text-gray-500">{specialization}</p>
        </div>
        <AppointmentStatusBadge status={appointment_status} />
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong>Date:</strong>{' '}
          {new Date(appointment_date).toLocaleDateString('en-KE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <p>
          <strong>Time:</strong> {time_slot ?? 'N/A'}
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

      {isPatient && (
        <div className="pt-2 text-right">
          <Button variant="outline" size="sm" onClick={handleRescheduleClick}>
            Reschedule
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
