// src/components/ConfirmationModal.tsx
import { CheckCircle } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ConfirmationModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center relative">
        <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Appointment Confirmed!</h2>
        <p className="text-gray-600 mb-4">
          Your appointment has been successfully booked.
        </p>
        <button
          onClick={onClose}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full"
        >
          Go to My Appointments
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
