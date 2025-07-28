import AppointmentCard from '@/features/user/MyAppointments/AppointmentCard';
import type { Appointment } from '@/types/appointment'; // Replace `any` with the actual type

interface AppointmentCardListProps {
  appointments: Appointment[];
}

const AppointmentCardList = ({ appointments }: AppointmentCardListProps) => (
  <div className="space-y-4 animate-fade-in">
    {appointments.length === 0 ? (
      <div className="text-center py-6 text-gray-500 text-sm">
        📭 No appointments to display.
      </div>
    ) : (
      appointments.map((appt) => (
        <AppointmentCard key={appt.appointment_id} appointment={appt} />
      ))
    )}
  </div>
);

export default AppointmentCardList;
