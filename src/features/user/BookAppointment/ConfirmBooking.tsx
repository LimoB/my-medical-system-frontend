import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import type { RootState } from '@/store/store';
import { createAppointment } from '@/services/appointments';
import { createStripeCheckoutSession } from '@/services/payments';
import type { SanitizedDoctor } from '@/types/doctor';
import ConfirmationModal from '@/features/user/BookAppointment/ConfirmationModal';

const ConfirmBooking = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    const { doctor, selectedDate, selectedHour } = state || {};
    const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'stripe' | 'cash' | ''>('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    if (!doctor || !selectedDate || !selectedHour || !user) {
        return (
            <div className="p-8 max-w-xl mx-auto text-center text-red-500 font-medium">
                Invalid booking data. Please restart the process.
            </div>
        );
    }

    const handleConfirm = async () => {
        if (!paymentMethod) {
            toast.warn('Please select a payment method');
            return;
        }

        const userId = user.id ?? user.user_id;
        if (!userId) {
            toast.error('User info missing. Please login again.');
            return;
        }

        try {
            setLoading(true);
            const toastId = toast.loading('Booking appointment...');

            const appointmentPayload = {
                user_id: userId,
                doctor_id: (doctor as SanitizedDoctor).doctor_id,
                appointment_date: new Date(selectedDate).toISOString(),
                time_slot: selectedHour.slice(0, 5),
                total_amount: Number(doctor.payment_per_hour),
                payment_per_hour: Number(doctor.payment_per_hour),
                payment_method: paymentMethod,
            };

            const appointment = await createAppointment(appointmentPayload);
            console.log('🧪 Appointment response:', appointment);

            const appointmentId = Number(appointment?.appointment_id);

            if (!appointmentId || isNaN(appointmentId)) {
                throw new Error('Failed to create appointment or missing ID.');
            }

            if (paymentMethod === 'stripe') {
                const { url } = await createStripeCheckoutSession({ appointmentId });
                toast.update(toastId, {
                    render: 'Redirecting to Stripe...',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000,
                });
                // redirect to Stripe checkout
                window.location.href = url;
            } else {
                toast.update(toastId, {
                    render: 'Appointment booked successfully!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });
                setShowModal(true);
            }
        } catch (error: any) {
            const msg =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                'Booking failed';
            toast.dismiss();
            toast.error(`Booking failed. ${msg}`);
            console.error('❌ Booking failed:', msg);
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/user/my-appointments');
    };

    return (
        <div className="p-6 sm:p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
                Confirm Your Booking
            </h1>

            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
                {/* Appointment Info */}
                <div className="space-y-2 text-gray-700">
                    <p>
                        <span className="font-medium">Doctor:</span> Dr. {(doctor as SanitizedDoctor).name}
                    </p>
                    <p>
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(selectedDate).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-medium">Time:</span> {selectedHour}
                    </p>
                    <p>
                        <span className="font-medium">Amount:</span> KSh {doctor.payment_per_hour}
                    </p>
                </div>

                {/* Payment Method */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Select Payment Method</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {(['mpesa', 'stripe', 'cash'] as const).map((method) => (
                            <label
                                key={method}
                                className={`flex items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer transition hover:shadow ${paymentMethod === method ? 'bg-teal-50 border-teal-600' : 'bg-white'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method}
                                    className="hidden"
                                    checked={paymentMethod === method}
                                    onChange={() => setPaymentMethod(method)}
                                />
                                <span className="text-gray-700 capitalize font-medium">{method}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Confirm Button */}
                <button
                    onClick={handleConfirm}
                    disabled={loading || !paymentMethod}
                    className={`w-full py-3 text-white rounded-full font-medium transition ${paymentMethod ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-400 cursor-not-allowed'
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
