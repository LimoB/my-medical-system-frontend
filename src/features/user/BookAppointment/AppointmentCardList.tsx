import AppointmentCard from '@/features/user/MyAppointments/AppointmentCard';

interface AppointmentCardListProps {
  appointments: any[];  // Replace with the actual type of Appointment
}

const AppointmentCardList = ({ appointments }: AppointmentCardListProps) => (
  <div className="space-y-4">
    {appointments.length === 0 ? (
      <p className="text-gray-500">No appointments to display.</p>
    ) : (
      appointments.map((appt) => (
        <AppointmentCard key={appt.appointment_id} appointment={appt} />
      ))
    )}
  </div>
);

export default AppointmentCardList;
