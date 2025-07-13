import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '@/services/doctors';
import type { SanitizedDoctor } from '@/types/doctor';
import BookingModal from '@/components/BookingModal';
import LoginPromptModal from '@/components/LoginPromptModal'; // ⬅️ create this below

const DoctorsSection = () => {
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
        setError('Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookClick = (doctor: SanitizedDoctor) => {
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
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal-700">
          Meet Our Expert Doctors
        </h2>
        <p className="text-gray-600 mb-10 text-lg md:text-xl">
          Our doctors are highly qualified and specialize in different fields of medicine.
        </p>

        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading doctors...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-20">{error}</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doc) => (
              <DoctorCard key={doc.doctor_id} doctor={doc} onBook={handleBookClick} />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          doctor={selectedDoctor}
        />
      )}

      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        onConfirm={() => navigate('/login')}
      />
    </section>
  );
};

type DoctorCardProps = {
  doctor: SanitizedDoctor;
  onBook: (doctor: SanitizedDoctor) => void;
};

const DoctorCard = ({ doctor, onBook }: DoctorCardProps) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col items-center">
    <img
      src={doctor.image || '/doc3.jpeg'}
      alt={doctor.name}
      loading="lazy"
      className="w-32 h-32 object-cover rounded-full mb-4"
    />
    <h3 className="text-teal-600 text-lg font-semibold">{doctor.name}</h3>
    <p className="text-black font-bold text-sm mb-2">{doctor.specialty}</p>
    <p className="text-gray-600 text-sm text-center mb-6">{doctor.description}</p>

    <div className="text-left w-full space-y-3 text-sm text-gray-700">
      <div>
        <h4 className="font-semibold text-teal-600">Available Days:</h4>
        <p>{doctor.available_days}</p>
      </div>

      <div>
        <h4 className="font-semibold text-teal-600">Available Hours:</h4>
        {doctor.available_hours.length > 0 ? (
          <ul className="list-disc ml-5">
            {doctor.available_hours.map((hour) => (
              <li key={`${doctor.doctor_id}-${hour}`}>{hour}</li>
            ))}
          </ul>
        ) : (
          <p>No hours listed</p>
        )}
      </div>

      <div>
        <h4 className="font-semibold text-teal-600">Payment per Hour:</h4>
        <p>KSh {doctor.payment_per_hour}</p>
      </div>
    </div>

    <button
      className="mt-6 bg-teal-600 text-white py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300"
      onClick={() => onBook(doctor)}
      aria-label={`Book appointment with Dr. ${doctor.name}`}
    >
      Book Now
    </button>
  </div>
);

export default DoctorsSection;
