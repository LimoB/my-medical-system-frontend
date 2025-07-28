import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

type Props = {
  onClose?: () => void;
  isModal?: boolean;
  paymentMethod?: 'stripe' | 'cash' | 'mpesa' | '';
  redirectTo?: string; // allow dynamic redirect
};

const BookingConfirmation = ({
  onClose,
  isModal = false,
  paymentMethod = '',
  redirectTo = '/user/my-appointments',
}: Props) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000); // stop confetti after 3s
    return () => clearTimeout(timer);
  }, []);

  const getMessage = () => {
    switch (paymentMethod) {
      case 'stripe':
        return 'Thank you! Your payment was successful and your appointment is confirmed.';
      case 'cash':
      case 'mpesa':
        return 'Your appointment is booked. Please pay at the clinic on the appointment day.';
      default:
        return 'Thank you! Your appointment has been successfully booked.';
    }
  };

  const handleRedirect = () => {
    if (onClose) onClose();
    navigate(redirectTo);
  };

  return (
    <>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`${
          isModal
            ? 'p-6 sm:p-8 max-w-md bg-white rounded-2xl shadow-2xl text-center mx-auto'
            : 'p-10 sm:p-12 max-w-2xl bg-gradient-to-br from-teal-50 via-white to-emerald-100 rounded-2xl shadow-2xl text-center mx-auto'
        }`}
      >
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-6 drop-shadow-md" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-emerald-700">
          Appointment Confirmed!
        </h2>
        <p className="text-gray-700 mb-3 text-base sm:text-lg">{getMessage()}</p>
        <p className="text-gray-500 text-sm mb-6">We'll send you a reminder before your visit.</p>

        {isModal ? (
          <button
            onClick={handleRedirect}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Go to My Appointments
          </button>
        ) : (
          <a
            href={redirectTo}
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Go to My Appointments
          </a>
        )}
      </motion.div>
    </>
  );
};

export default BookingConfirmation;
