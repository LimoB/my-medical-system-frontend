import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAppointmentsByUserId } from '@/services/appointments';
import type { Appointment } from '@/types/appointment';
import type { SanitizedDoctor } from '@/types/doctor';
import type { RootState } from '@/store/store';

import DoctorsListSection from '@/components/DoctorsListSection';
import AppointmentCard from '@/features/user/MyAppointments/AppointmentCard';
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

  const handleBook = (doctor: SanitizedDoctor) => {
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
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-teal-700 mb-1">Book Appointment</h1>
        <p className="text-gray-600">Choose a doctor and book your visit in seconds.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-6 border-b">
        {['book', 'upcoming', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setView(tab as any);
              setPage(1);
            }}
            className={`relative pb-2 px-4 font-medium transition-colors ${view === tab
                ? 'text-teal-600'
                : 'text-gray-500 hover:text-teal-500'
              }`}
          >
            {tab === 'book' ? 'Make Appointment' : tab === 'upcoming' ? 'Upcoming' : 'History'}
            {view === tab && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-teal-600 rounded-full transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Filter (only in book view) */}
      {view === 'book' && (
        <div className="mb-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Filter by specialization..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      )}

      {/* Book View */}
      {view === 'book' && (
        <DoctorsListSection
          heading="Available Doctors"
          subheading="Browse available doctors and book an appointment"
          showModals
          onBookDoctor={handleBook}
        />
      )}

      {/* Upcoming Appointments */}
      {view === 'upcoming' && (
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Your Upcoming Appointments</h2>
          {filteredUpcoming.length === 0 ? (
            <p className="text-gray-500">You have no upcoming appointments.</p>
          ) : (
            <div className="space-y-4">
              {filteredUpcoming.map((appt) => (
                <AppointmentCard key={appt.appointment_id} appointment={appt} />
              ))}
            </div>
          )}
          {totalPages('upcoming') > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: totalPages('upcoming') }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${page === i + 1
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Appointment History */}
      {view === 'history' && (
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Appointment History</h2>
          {filteredHistory.length === 0 ? (
            <p className="text-gray-500">No past or cancelled appointments.</p>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((appt) => (
                <AppointmentCard key={appt.appointment_id} appointment={appt} />
              ))}
            </div>
          )}
          {totalPages('history') > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: totalPages('history') }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${page === i + 1
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
};

export default BookAppointment;
