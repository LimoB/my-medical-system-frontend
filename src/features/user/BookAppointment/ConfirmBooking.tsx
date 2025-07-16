// File: src/features/user/BookAppointment/ConfirmBooking.tsx

import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import type { RootState } from '@/store/store';
import { createAppointment } from '@/services/appointments';
import type { SanitizedDoctor } from '@/types/doctor';
import ConfirmationModal from '@/components/ConfirmationModal';

const ConfirmBooking = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    const { doctor, selectedDate, selectedHour } = state || {};
    const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'stripe' | 'cash' | 'paypal' | ''>('');
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
        if (!paymentMethod) return;

        const userId = user.id ?? user.user_id;
        if (!userId) {
            alert('User info missing. Please login again.');
            return;
        }

        try {
            setLoading(true);

            const appointmentPayload = {
                user_id: userId,
                doctor_id: (doctor as SanitizedDoctor).doctor_id,
                appointment_date: new Date(selectedDate).toISOString(), // Valid ISO string
                time_slot: selectedHour.slice(0, 5), // Ensure "HH:MM"
                total_amount: Number(doctor.payment_per_hour),
                payment_per_hour: Number(doctor.payment_per_hour),
                payment_method: paymentMethod, // ✅ Include the selected payment method
            };

            console.log('📦 Payload:', appointmentPayload);

            await createAppointment(appointmentPayload);
            setShowModal(true);
        } catch (error: any) {
            const msg =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                'Booking failed';
            console.error('❌ Booking failed:', msg);
            alert(`Booking failed. ${msg}`);
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
            <ConfirmationModal isOpen={showModal} onClose={handleModalClose} />
        </div>
    );
};

export default ConfirmBooking;
