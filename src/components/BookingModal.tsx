import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/store/store';
import type { SanitizedDoctor } from '@/types/doctor';
import BookingCalendar from './BookingCalendar';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  doctor?: SanitizedDoctor | null;
};

const BookingModal = ({ isOpen, onClose, doctor }: BookingModalProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  if (!isOpen || !doctor) return null;

  const handleContinue = (selectedDate: Date, selectedHour: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    // ✅ Redirect to confirmation page with booking details
    navigate('/user/book-appointment/confirm', {
      state: {
        doctor,
        selectedDate,
        selectedHour,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 relative animate-fade-in transition-all duration-300">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h3 className="text-3xl font-bold mb-8 text-center text-teal-700">
          Book an Appointment with Dr. {doctor.name}
        </h3>

        {/* Booking Calendar Component */}
        <BookingCalendar doctor={doctor} onConfirm={handleContinue} />
      </div>
    </div>
  );
};

export default BookingModal;
