import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaMoneyBillWave, FaCreditCard, FaMobileAlt } from 'react-icons/fa';

import type { RootState } from '@/store/store';
import type { SanitizedDoctor } from '@/types/doctor';
import type { CreatePaymentPayload, PaymentMethod } from '@/types/payments';
import { createAppointment } from '@/services/appointments';
import { createStripeCheckoutSession } from '@/services/payments';
import ConfirmationModal from '@/features/user/BookAppointment/bookingComponents/ConfirmationModal';

type LocationState = {
  doctor: SanitizedDoctor;
  selectedDate: string;
  selectedHour: string;
};

const ConfirmBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const { doctor, selectedDate, selectedHour } = (state || {}) as LocationState;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!doctor || !selectedDate || !selectedHour || !user) {
    console.warn('⚠️ Missing booking data', { doctor, selectedDate, selectedHour, user });
    return (
      <div className="p-8 max-w-xl mx-auto text-center text-red-500 font-medium animate-fade-in">
        ⚠️ Invalid booking data. Please restart the process.
      </div>
    );
  }
const handleConfirm = async () => {
  if (!paymentMethod) {
    toast.warn('⚠️ Please select a payment method');
    return;
  }

  const userId = user.user_id || user.id;
  if (!userId) {
    toast.error('🚫 User info missing. Please login again.');
    console.error('❌ No user ID found in state:', user);
    return;
  }

  try {
    setLoading(true);
    const toastId = toast.loading('⏳ Booking appointment...');

    const appointmentPayload = {
      user_id: userId,
      doctor_id: doctor.doctor_id,
      appointment_date: new Date(selectedDate).toISOString(),
      time_slot: selectedHour.slice(0, 5),
      total_amount: Number(doctor.payment_per_hour),
      payment_per_hour: Number(doctor.payment_per_hour),
      payment_method: paymentMethod as PaymentMethod,
    };

    console.log('📤 [handleConfirm] Appointment Payload:', appointmentPayload);

    const appointment = await createAppointment(appointmentPayload);

    if (!appointment || !appointment.appointment_id) {
      throw new Error('Appointment creation failed: No appointment ID returned');
    }

    const appointmentId = Number(appointment.appointment_id);
    console.log('✅ [handleConfirm] Appointment created:', appointment);

    if (isNaN(appointmentId) || appointmentId <= 0) {
      throw new Error('Invalid appointment ID received');
    }

    if (paymentMethod === 'stripe') {
      const stripePayload: CreatePaymentPayload = {
        appointmentId,
        paymentMethod,
        amount: Number(doctor.payment_per_hour),
      };

      console.log('💳 [handleConfirm] Stripe Payload:', stripePayload);

      const { url } = await createStripeCheckoutSession(stripePayload);

      if (!url) {
        throw new Error('Stripe session creation failed: No URL returned');
      }

      console.log('🔗 [handleConfirm] Redirecting to Stripe URL:', url);

      toast.update(toastId, {
        render: '✅ Redirecting to Stripe...',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });

      setTimeout(() => {
        window.location.href = url;
      }, 1000);

      return;
    }

    // Handle cash or other payment methods
    console.log(`💵 [handleConfirm] Booking with payment method: ${paymentMethod}, skipping Stripe`);

    toast.update(toastId, {
      render: '✅ Appointment booked successfully!',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });

    setShowModal(true);
  } catch (error: any) {
    toast.dismiss();

    const msg = error?.response?.data?.error || error?.message || 'Unknown booking error';
    console.error('❌ [handleConfirm] Booking error:', msg);

    if (msg.toLowerCase().includes('already booked')) {
      toast.error('⚠️ This doctor is already booked at this time. Please choose another slot.');
    } else {
      toast.error(`🚫 Booking failed. ${msg}`);
    }
  } finally {
    setLoading(false);
  }
};

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/user/my-appointments');
  };

  return (
    <div className="p-4 sm:p-10 max-w-3xl mx-auto animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-teal-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-extrabold text-center text-teal-700 mb-8">
        Confirm Your Booking
      </h1>

      <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-xl p-6 space-y-6 border border-gray-100">
        {/* Appointment Info */}
        <div className="text-gray-800 space-y-2">
          <p><strong>Doctor:</strong> Dr. {doctor.name}</p>
          <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {selectedHour}</p>
          <p><strong>Amount:</strong> KSh {doctor.payment_per_hour}</p>
        </div>

        {/* Payment Method Selection */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Select Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {([
              { method: 'mpesa', icon: <FaMobileAlt className="text-green-600" /> },
              { method: 'stripe', icon: <FaCreditCard className="text-indigo-600" /> },
              { method: 'cash', icon: <FaMoneyBillWave className="text-yellow-600" /> },
              { method: 'paypal', icon: <FaCreditCard className="text-blue-600" /> },
            ] as const).map(({ method, icon }) => (
              <label
                key={method}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition shadow-sm hover:shadow-md text-center ${paymentMethod === method ? 'bg-teal-100 border-teal-600' : 'bg-white'
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="hidden"
                />
                <div className="text-2xl">{icon}</div>
                <span className="capitalize font-medium text-gray-700">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={loading || !paymentMethod}
          className={`w-full py-3 text-white rounded-full font-semibold text-lg transition ${paymentMethod ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          {loading ? 'Processing...' : 'Confirm & Pay'}
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={handleModalClose}
        paymentMethod={paymentMethod}
      />
    </div>
  );
};

export default ConfirmBooking;
