import BookingConfirmation from '@/features/user/BookAppointment/bookingComponents/BookingConfirmation';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod?: 'stripe' | 'cash' | 'mpesa' | '';
};

const ConfirmationModal = ({ isOpen, onClose, paymentMethod = '' }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <BookingConfirmation onClose={onClose} isModal paymentMethod={paymentMethod} />
    </div>
  );
};

export default ConfirmationModal;
