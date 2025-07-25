import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAppointmentsByUserId } from '@/services/appointments';
import type { Appointment } from '@/types/appointment';
import type { SanitizedDoctor } from '@/types/doctor';
import type { RootState } from '@/store/store';

import DoctorsListSection from '@/components/DoctorsListSection';
import AppointmentTabs from './AppointmentTabs';
import AppointmentFilter from './AppointmentFilter';
import AppointmentCardList from './AppointmentCardList';
import AppointmentPagination from './AppointmentPagination';
import BookingModal from '@/components/BookingModal';

const ITEMS_PER_PAGE = 5;

const BookAppointment = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.user_id);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<SanitizedDoctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<'book' | 'upcoming' | 'history'>('book');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!userId) return;
      try {
        const appts = await fetchAppointmentsByUserId(userId);
        setAppointments(appts);
      } catch (err) {
        console.error('❌ Error loading appointments:', err);
      }
    };

    loadAppointments();
  }, [userId]);

  const handleBookDoctor = (doctor: SanitizedDoctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const filteredUpcoming = appointments
    .filter((appt) => appt.appointment_status !== 'Cancelled')
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const filteredHistory = appointments
    .filter((appt) => appt.appointment_status === 'Cancelled')
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const totalPages = (type: 'upcoming' | 'history') => {
    const total =
      type === 'upcoming'
        ? appointments.filter((a) => a.appointment_status !== 'Cancelled').length
        : appointments.filter((a) => a.appointment_status === 'Cancelled').length;
    return Math.ceil(total / ITEMS_PER_PAGE);
  };

  return (
    <div className="p-6 space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-teal-700 mb-1">Book Appointment</h1>
        <p className="text-gray-600">Choose a doctor and book your visit in seconds.</p>
      </div>

      <AppointmentTabs view={view} setView={setView} setPage={setPage} />

      {view === 'book' && (
        <>
          <AppointmentFilter filter={filter} setFilter={setFilter} />
          <DoctorsListSection onBookDoctor={handleBookDoctor} />
        </>
      )}

      {view === 'upcoming' && (
        <AppointmentCardList appointments={filteredUpcoming} />
      )}

      {view === 'history' && (
        <AppointmentCardList appointments={filteredHistory} />
      )}

      {(view === 'upcoming' || view === 'history') && (
        <AppointmentPagination totalPages={totalPages(view)} page={page} setPage={setPage} />
      )}

      {/* Booking Modal controlled by selectedDoctor and modal state */}
      {selectedDoctor && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          doctor={selectedDoctor} reason={''} onReasonChange={function (_e: React.ChangeEvent<HTMLTextAreaElement>): void {
            throw new Error('Function not implemented.');
          } }        />
      )}
    </div>
  );
};

export default BookAppointment;
