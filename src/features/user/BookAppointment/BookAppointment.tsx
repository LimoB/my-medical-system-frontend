// src/features/user/BookAppointment/BookAppointment.tsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

import { getDoctors } from '@/services/doctors';
import { fetchMyAppointments } from '@/services/appointments';

import type { SanitizedDoctor } from '@/types/doctor';
import type { Appointment } from '@/types/appointment';

import BookingModal from '@/components/BookingModal';
import AppointmentCard from '@/features/user/MyAppointments/MyAppointments';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState<SanitizedDoctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<SanitizedDoctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const load = async () => {
      try {
        const doctorData = await getDoctors();
        setDoctors(doctorData);

        const myAppointments = await fetchMyAppointments();
        setAppointments(myAppointments);
      } catch (err) {
        console.error('❌ Error loading booking data:', err);
      }
    };

    load();
  }, []);

  const handleBook = (doctor: SanitizedDoctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const upcomingAppointments = appointments.filter(
    (appt) => appt.appointment_status !== 'Cancelled'
  );
  const pastAppointments = appointments.filter(
    (appt) => appt.appointment_status === 'Cancelled'
  );

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-teal-700 mb-1">Book Appointment</h1>
        <p className="text-gray-600">Choose a doctor and book your visit in seconds.</p>
      </div>

      {/* Section: Available Doctors */}
      <section>
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Available Doctors</h2>
        {doctors.length === 0 ? (
          <p className="text-gray-500">No doctors available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.doctor_id}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
              >
                <img
                  src={doctor.image || '/doc.jpeg'}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <h3 className="font-semibold text-lg text-teal-700">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                <p className="text-sm text-gray-600 mb-2">KES {doctor.payment_per_hour}</p>
                <button
                  onClick={() => handleBook(doctor)}
                  className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section: Upcoming Appointments */}
      <section>
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Your Upcoming Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500">You have no upcoming appointments.</p>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appt) => (
              <AppointmentCard key={appt.appointment_id} appointment={appt} />
            ))}
          </div>
        )}
      </section>

      {/* Section: Appointment History */}
      <section>
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Appointment History</h2>
        {pastAppointments.length === 0 ? (
          <p className="text-gray-500">No past or cancelled appointments.</p>
        ) : (
          <div className="space-y-4">
            {pastAppointments.map((appt) => (
              <AppointmentCard key={appt.appointment_id} appointment={appt} />
            ))}
          </div>
        )}
      </section>

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
