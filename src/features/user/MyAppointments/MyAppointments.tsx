// src/features/user/MyAppointments/MyAppointments.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { getAppointmentsByUserId } from '@/features/slices/appointmentSlice';
import AppointmentCard from './AppointmentCard';

const MyAppointments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { appointments, loading, error } = useSelector((state: RootState) => state.appointments);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getAppointmentsByUserId(userId));
    }
  }, [dispatch, userId]);

  return (
    <section className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-teal-700">My Appointments</h2>

      {loading && (
        <p className="text-center text-gray-500" aria-live="polite">
          Loading appointments...
        </p>
      )}

      {error && (
        <p className="text-center text-red-600 font-medium" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && appointments.length === 0 && (
        <p className="text-gray-600 text-center">No appointments found.</p>
      )}

      {!loading && appointments.length > 0 && (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.appointment_id}
              appointment={appointment}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyAppointments;
