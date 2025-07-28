import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { getAppointmentsByUserId } from '@/features/slices/appointmentSlice';
import AppointmentCard from './AppointmentCard';
import { motion } from 'framer-motion';

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
    <motion.section
      className="p-6 sm:p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-extrabold text-center mb-4 text-teal-700">My Appointments</h2>
      <p className="text-center text-gray-500 mb-6">All your upcoming and past bookings in one place</p>

      {loading && (
        <p className="text-center text-gray-500 animate-pulse" aria-live="polite">
          Fetching your appointments...
        </p>
      )}

      {error && (
        <motion.p
          className="text-center text-red-600 font-medium"
          role="alert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      {!loading && !error && appointments.length === 0 && (
        <motion.p
          className="text-gray-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          You haven't booked any appointments yet.
        </motion.p>
      )}

      {!loading && appointments.length > 0 && (
        <motion.div
          className="grid gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.appointment_id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AppointmentCard appointment={appointment} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default MyAppointments;
