import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAppointmentsByUserId, createAppointment } from '@/services/appointments';
import type { Appointment } from '@/types/appointment';
import type { SanitizedDoctor } from '@/types/doctor';
import type { RootState } from '@/store/store';

import DoctorsListSection from '@/components/DoctorsListSection';
import AppointmentTabs from './AppointmentTabs';
import AppointmentFilter from './AppointmentFilter';
import AppointmentCardList from './AppointmentCardList';
import AppointmentPagination from './AppointmentPagination';
import ReasonInput from './ReasonInput';
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
  const [reason, setReason] = useState('');

  // Load appointments when userId changes or view changes (optional: add filter or page)
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

  // Open booking modal when a doctor is selected via DoctorsListSection
  const handleBookDoctor = (doctor: SanitizedDoctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  // Handle submit appointment - update with actual selected date/time as needed
  const handleSubmitAppointment = async () => {
    if (!selectedDoctor) {
      alert('Please select a doctor first.');
      return;
    }
    if (!reason.trim()) {
      alert('Please provide a reason for the appointment.');
      return;
    }
    if (!userId) {
      alert('User info missing. Please login again.');
      return;
    }

    // TODO: Replace hardcoded date/time with user selected ones or dynamic values
    const appointmentData = {
      user_id: userId,
      doctor_id: selectedDoctor.doctor_id,
      appointment_date: new Date().toISOString().slice(0, 10), // Today as YYYY-MM-DD
      time_slot: '10:00', // Placeholder time slot, customize as needed
      total_amount: Number(selectedDoctor.payment_per_hour),
      payment_per_hour: Number(selectedDoctor.payment_per_hour),
      reason: reason.trim(),
      payment_method: 'cash' as 'cash' | 'mpesa' | 'stripe' | 'paypal',
    };

    try {
      const response = await createAppointment(appointmentData);
      console.log('Appointment created:', response);
      // Close modal and reset reason
      setIsModalOpen(false);
      setReason('');
      // Refresh appointments list after new creation
      if (userId) {
        const updatedAppointments = await fetchAppointmentsByUserId(userId);
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment. Please try again.');
    }
  };

  // Filter appointments for upcoming & history with pagination
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

      {view === 'book' && (
        <ReasonInput reason={reason} setReason={setReason} />
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
          doctor={selectedDoctor}
          reason={reason}
          onReasonChange={(e) => setReason(e.target.value)}
        />
      )}

      {/* Submit Appointment button shown only when booking */}
      {view === 'book' && (
        <div className="text-center">
          <button
            onClick={handleSubmitAppointment}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Submit Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
