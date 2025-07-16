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
  reason: string;
  onReasonChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const BookingModal = ({ isOpen, onClose, doctor, reason, onReasonChange }: BookingModalProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // Early return if modal is closed or doctor is not available
  if (!isOpen || !doctor) return null;

  const handleContinue = (selectedDate: Date, selectedHour: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Redirect to the confirmation page with booking details, including reason
    navigate('/user/book-appointment/confirm', {
      state: {
        doctor,
        selectedDate,
        selectedHour,
        reason,
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
          Book an Appointment with Dr. {doctor.user?.first_name} {doctor.user?.last_name}
        </h3>

        {/* Reason Input */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Reason for Appointment
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={onReasonChange}
            placeholder="Enter the reason for your appointment"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows={4}
          />
        </div>

        {/* Booking Calendar Component */}
        <BookingCalendar doctor={doctor} onConfirm={handleContinue} />
      </div>
    </div>
  );
};

export default BookingModal;
