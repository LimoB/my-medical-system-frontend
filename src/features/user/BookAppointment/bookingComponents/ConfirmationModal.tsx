import { FaRegCheckCircle } from 'react-icons/fa';
import BookingConfirmation from '@/features/user/BookAppointment/bookingComponents/BookingConfirmation';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod?: 'stripe' | 'cash' | 'mpesa' | '';
};

const ConfirmationModal = ({ isOpen, onClose, paymentMethod = '' }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/30 via-black/50 to-black/80 backdrop-blur-md px-4">
      <div className="relative w-full max-w-4xl bg-gradient-to-tr from-white via-teal-50 to-white rounded-3xl shadow-2xl p-10 animate-fade-in-up transition-all duration-500 ease-out">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-teal-700 transition-all text-xl font-bold"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header with Icon */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <FaRegCheckCircle className="text-teal-600 text-5xl mb-2 animate-bounce-slow" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-teal-800">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mt-1 text-sm md:text-base">
            Your appointment has been successfully booked.
          </p>
        </div>

        {/* Booking Confirmation Component */}
        <div className="mt-6">
          <BookingConfirmation onClose={onClose} isModal paymentMethod={paymentMethod} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
