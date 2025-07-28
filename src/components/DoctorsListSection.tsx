import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDoctors } from '@/features/slices/doctorsSlice';
import { getBulkAvailabilityStatus } from '@/services/appointments';

import type { RootState } from '@/store/store';
import type { SanitizedDoctor } from '@/types/doctor';

import BookingModal from '@/features/user/BookAppointment/bookingComponents/BookingModal';
import LoginPromptModal from '@/components/LoginPromptModal';
import DoctorCard from '@/components/DoctorCard';

const today = new Date().toISOString().split('T')[0];

type DoctorWithAvailability = SanitizedDoctor & {
  isFullyBookedToday?: boolean;
  notAvailableToday?: boolean;
};

type DoctorsListSectionProps = {
  onBookDoctor?: (doctor: SanitizedDoctor) => void;
  fullyBookedDoctorIds?: number[];
};

const DoctorsListSection = ({
  onBookDoctor,
  fullyBookedDoctorIds = [],
}: DoctorsListSectionProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doctors, loading } = useSelector((state: RootState) => state.doctors);
  const user = useSelector((state: RootState) => state.auth.user);

  const [doctorsWithAvailability, setDoctorsWithAvailability] = useState<DoctorWithAvailability[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<SanitizedDoctor | null>(null);
  const [reason, setReason] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Fetch doctors on mount
  useEffect(() => {
    console.log('[DoctorsListSection] Dispatching fetchDoctors...');
    dispatch(fetchDoctors() as any);
  }, [dispatch]);

  // Fetch availability once doctors are loaded
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        console.log('[DoctorsListSection] Fetching availability...');
        const availabilityData = await getBulkAvailabilityStatus(today);
        console.log('[DoctorsListSection] Availability data:', availabilityData);

        const availabilityMap = new Map<number, { fullyBooked: boolean; notAvailableToday: boolean }>();

        availabilityData.forEach(({ doctorId, fullyBooked, notAvailableToday }) => {
          availabilityMap.set(doctorId, { fullyBooked, notAvailableToday });
        });

        const updated = doctors.map((doc) => {
          const status = availabilityMap.get(doc.doctor_id);
          return {
            ...doc,
            isFullyBookedToday: status?.fullyBooked ?? fullyBookedDoctorIds.includes(doc.doctor_id),
            notAvailableToday: status?.notAvailableToday ?? false,
          };
        });

        console.log('[DoctorsListSection] Doctors with availability:', updated);
        setDoctorsWithAvailability(updated);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    if (doctors.length > 0) {
      fetchAvailability();
    }
  }, [doctors, fullyBookedDoctorIds]);

  const handleBookClick = (doctor: DoctorWithAvailability) => {
    console.log('[handleBookClick] Doctor clicked:', doctor);
    console.log('[handleBookClick] User:', user);

    // Skip if fully booked or not available
    if (doctor.isFullyBookedToday || doctor.notAvailableToday) {
      console.log('[handleBookClick] Doctor is fully booked or not available');
      return;
    }

    setSelectedDoctor(doctor);

    // Not logged in? Show login prompt
    if (!user) {
      console.log('[handleBookClick] User not logged in — showing login prompt');
      setShowLoginPrompt(true);
      return;
    }

    // Logged in? Show booking modal
    if (onBookDoctor) {
      console.log('[handleBookClick] onBookDoctor prop used');
      onBookDoctor(doctor);
    } else {
      console.log('[handleBookClick] Opening booking modal');
      setIsModalOpen(true);
    }
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleCloseModals = () => {
    console.log('[handleCloseModals] Closing all modals');
    setIsModalOpen(false);
    setShowLoginPrompt(false);
    setSelectedDoctor(null);
    setReason('');
  };

  return (
    <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-6">
          Meet Our Expert Doctors
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-base md:text-lg">
          Our doctors are highly qualified and specialize in different fields of medicine.
        </p>

        {loading ? (
          <div className="text-gray-500 py-20 text-lg animate-pulse">
            Loading doctors...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctorsWithAvailability.map((doc) => (
              <DoctorCard
                key={doc.doctor_id}
                doctor={doc}
                isFullyBookedToday={doc.isFullyBookedToday}
                notAvailableToday={doc.notAvailableToday}
                onBook={() => handleBookClick(doc)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && user && !onBookDoctor && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModals}
          doctor={selectedDoctor}
          reason={reason}
          onReasonChange={handleReasonChange}
        />
      )}

      {/* Login Prompt Modal */}
      {selectedDoctor && !user && (
        <LoginPromptModal
          isOpen={showLoginPrompt}
          onClose={handleCloseModals}
          onConfirm={() => {
            console.log('[LoginPromptModal] Redirecting to login...');
            navigate('/login');
            handleCloseModals();
          }}
          title="Login Required"
          message={`You need to log in to book an appointment with Dr. ${selectedDoctor.name}.`}
          confirmText="Login"
          cancelText="Cancel"
        />
      )}
    </section>
  );
};

export default DoctorsListSection;
