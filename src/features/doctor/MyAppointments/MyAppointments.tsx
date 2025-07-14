// File: src/features/doctors/MyAppointments/MyAppointments.tsx
import AppointmentCard from './AppointmentCard';
import { useAppointments } from './useAppointments';

const MyAppointments = () => {
  const { appointments, loading } = useAppointments();

  if (loading) return <p className="text-center">Loading appointments...</p>;

  return (
    <div className="p-4 space-y-4">
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments available.</p>
      ) : (
        appointments.map((appointment) => (
          <AppointmentCard key={appointment.appointment_id} appointment={appointment} />
        ))
      )}
    </div>
  );
};

export default MyAppointments;
