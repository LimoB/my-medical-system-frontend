import BookingConfirmation from '@/components/BookingConfirmation';

export default function PaymentSuccess() {
  return (
    <div className="p-8 min-h-screen flex items-center justify-center bg-gray-50">
      {/* Explicitly pass paymentMethod='stripe' to show Stripe success message */}
      <BookingConfirmation paymentMethod="stripe" />
    </div>
  );
}
