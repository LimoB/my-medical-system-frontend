// File: src/features/doctors/MyAppointments/AppointmentCard.tsx
import { useState } from 'react';
import type { Appointment } from '@/types/appointment';
import AppointmentDetails from './AppointmentDetails';

type Props = {
  appointment: Appointment;
};

const AppointmentCard = ({ appointment }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const patientName = appointment.user
    ? `${appointment.user.first_name} ${appointment.user.last_name}`
    : 'Unknown';

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow border space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{patientName}</h3>
          <span className="text-sm text-gray-500">{appointment.appointment_status}</span>
        </div>
        <p className="text-sm">
          Date: {new Date(appointment.appointment_date).toLocaleDateString()}
        </p>
        <p className="text-sm">Time: {appointment.time_slot}</p>
        {appointment.reason && (
          <p className="text-sm text-gray-600">{appointment.reason}</p>
        )}

        <button
          onClick={() => setShowDetails(true)}
          className="text-blue-600 text-sm mt-2 hover:underline"
        >
          View Details
        </button>
      </div>

      {showDetails && (
        <AppointmentDetails
          appointment={appointment}
          onClose={() => setShowDetails(false)}
          onRefresh={() => window.location.reload()} // Optional: replace with useAppointments().refetch if available
        />
      )}
    </>
  );
};

export default AppointmentCard;
