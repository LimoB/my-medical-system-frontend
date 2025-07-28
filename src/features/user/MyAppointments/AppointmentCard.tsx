// src/features/user/MyAppointments/AppointmentCard.tsx
import { useSelector } from 'react-redux';
import type { Appointment } from '@/types/appointment';
import AppointmentStatusBadge from '@/components/AppointmentStatusBadge';
import type { RootState } from '@/store/store';
import { CalendarDays, Clock, User2, Stethoscope, History } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const isPatient = user?.role === 'user';

  const doctorName = doctor?.user
    ? `${doctor.user.first_name ?? ''} ${doctor.user.last_name ?? ''}`.trim() || 'N/A'
    : 'N/A';

  const specialization = doctor?.specialization || 'General';

  const handleRescheduleClick = () => {
    if (onReschedule) onReschedule(appointment);
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg transition hover:shadow-2xl max-w-xl w-full mx-auto"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-center mb-3">
        <div>
          <div className="flex items-center gap-2 text-teal-700 font-semibold text-lg">
            <User2 className="w-5 h-5" />
            {doctorName}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            {specialization}
          </div>
        </div>
        <AppointmentStatusBadge status={appointment_status} />
      </div>

      <div className="text-sm text-gray-700 space-y-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <strong>Date:</strong>
          {new Date(appointment_date).toLocaleDateString('en-KE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <strong>Time:</strong> {time_slot ?? 'N/A'}
        </div>
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-gray-500" />
          <strong>Booked:</strong>
          {new Date(created_at).toLocaleString('en-KE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </div>
      </div>

      {isPatient && (
        <div className="pt-4 text-right">
          <button
            onClick={handleRescheduleClick}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:from-teal-600 hover:to-cyan-600 transition-colors duration-200"
          >
            Reschedule
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentCard;
