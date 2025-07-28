import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Props = {
  onClose?: () => void;         // Optional: for closing modal
  isModal?: boolean;            // If true, use modal-specific styling and logic
  paymentMethod?: 'stripe' | 'cash' | 'mpesa' | ''; // Customize success message
};

const BookingConfirmation = ({
  onClose,
  isModal = false,
  paymentMethod = '',
}: Props) => {
  const navigate = useNavigate();

  // Determine message based on payment method
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

  // Modal button click handler
  const handleGoToAppointments = () => {
    if (onClose) onClose(); // Close modal first (optional)
    navigate('/user/my-appointments');
  };

  return (
    <div
      className={`${
        isModal
          ? 'p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg text-center'
          : 'p-10 max-w-xl mx-auto text-center'
      }`}
    >
      <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4 text-teal-700">Appointment Confirmed!</h2>
      <p className="text-gray-700 mb-6 text-lg">{getMessage()}</p>

      {isModal ? (
        <button
          onClick={handleGoToAppointments}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Go to My Appointments
        </button>
      ) : (
        <a
          href="/user/my-appointments"
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Go to My Appointments
        </a>
      )}
    </div>
  );
};

export default BookingConfirmation;
