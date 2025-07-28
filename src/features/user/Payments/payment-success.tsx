import BookingConfirmation from '@/features/user/BookAppointment/bookingComponents/BookingConfirmation';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-green-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-lg w-full p-8 text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-teal-600 animate-pulse drop-shadow-md" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your appointment has been booked and payment was processed via <strong>Stripe</strong>.
        </p>

        {/* Booking Confirmation Component */}
        <BookingConfirmation paymentMethod="stripe" />

        <div className="mt-6 text-sm text-gray-500">
          You will receive a confirmation email shortly.
        </div>
      </div>
    </div>
  );
}
