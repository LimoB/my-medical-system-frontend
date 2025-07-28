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

  // ❌ If modal is not open or doctor is missing, do not render
  if (!isOpen || !doctor) return null;

  // 🚫 If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md bg-black/40">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 relative animate-fade-in-up border border-red-100">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-2xl font-bold text-center text-red-600 mb-4">
            Login Required
          </h3>
          <p className="text-gray-700 text-center mb-6">
            You need to log in to book an appointment with a doctor.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition font-medium"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ If logged in, show full booking modal
  const handleContinue = (selectedDate: Date, selectedHour: string) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md bg-black/40">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 relative animate-fade-in-up transition-all duration-500 border border-teal-100">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h3 className="text-3xl font-extrabold mb-6 text-center text-teal-600 tracking-tight">
          Book Appointment with <br />
          <span className="text-gray-800">
            Dr. {doctor.user?.first_name} {doctor.user?.last_name}
          </span>
        </h3>

        {/* Reason Input */}
        <div className="mb-6">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Appointment
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={onReasonChange}
            placeholder="Briefly describe the reason for your visit..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800 transition"
            rows={4}
          />
        </div>

        {/* Booking Calendar */}
        <BookingCalendar
          doctor={doctor}
          onConfirm={handleContinue}
          bookedSlots={[]}
        />
      </div>
    </div>
  );
};

export default BookingModal;
