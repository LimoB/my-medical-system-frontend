import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '@/services/doctors';
import type { SanitizedDoctor } from '@/types/doctor';
import BookingModal from '@/components/BookingModal';
import LoginPromptModal from '@/components/LoginPromptModal';
import DoctorCard from '@/components/DoctorCard';

type DoctorsListSectionProps = {
  heading?: string;
  subheading?: string;
  showModals?: boolean;
  onBookDoctor?: (doctor: SanitizedDoctor) => void;
  renderDoctorCard?: (
    doctor: SanitizedDoctor,
    onBook: (doctor: SanitizedDoctor) => void
  ) => React.ReactNode;
};

const DoctorsListSection = ({
  heading = 'Meet Our Expert Doctors',
  subheading = 'Our doctors are highly qualified and specialize in different fields of medicine.',
  showModals = true,
  onBookDoctor,
  renderDoctorCard,
}: DoctorsListSectionProps) => {
  const [doctors, setDoctors] = useState<SanitizedDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<SanitizedDoctor | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsData = await getDoctors();
        setDoctors(doctorsData);
      } catch (err) {
        console.error(err);
        setError('⚠️ Failed to fetch doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookClick = (doctor: SanitizedDoctor) => {
    if (onBookDoctor) {
      onBookDoctor(doctor);
      return;
    }

    if (!showModals) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Headings */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-teal-700">
            {heading}
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mt-2">
            {subheading}
          </p>
        </div>

        {/* Loading / Error / Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-20 text-lg animate-pulse">
            Loading doctors...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-20 text-lg">{error}</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((doc) =>
              renderDoctorCard
                ? renderDoctorCard(doc, handleBookClick)
                : <DoctorCard key={doc.doctor_id} doctor={doc} onBook={handleBookClick} />
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showModals && (
        <>
          {selectedDoctor && (
            <BookingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              doctor={selectedDoctor}
            />
          )}
          <LoginPromptModal
            isOpen={showLoginPrompt}
            onClose={() => setShowLoginPrompt(false)}
            onConfirm={() => navigate('/login')}
          />
        </>
      )}
    </section>
  );
};

export default DoctorsListSection;
