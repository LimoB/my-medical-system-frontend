// src/features/user/MyAppointments/MyAppointments.tsx
import { useEffect } from 'react';
import useAppointments from './useAppointments';
import AppointmentCard from './AppointmentCard';

const MyAppointments = () => {
  const { appointments, loading, error, fetchAppointments } = useAppointments();

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading appointments...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-teal-700">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
