import type { SanitizedPayment } from '@/types/payments';

interface Props {
    payment: SanitizedPayment;
    onClose: () => void;
    onDelete: (id: number) => void;
    deletingId: number | null;
}

const badgeColors: Record<string, string> = {
    Paid: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Failed: 'bg-red-100 text-red-800',
};

const methodColors: Record<string, string> = {
    mpesa: 'bg-green-100 text-green-800',
    stripe: 'bg-purple-100 text-purple-800',
    paypal: 'bg-blue-100 text-blue-800',
    cash: 'bg-gray-100 text-gray-800',
};

const PaymentDetailsModal = ({
    payment,
    onClose,
    onDelete,
    deletingId,
}: Props) => {
    const formattedDate = payment.appointment?.date
        ? new Date(payment.appointment.date).toLocaleDateString()
        : 'N/A';

    const patient = payment.appointment?.user;
    const doctor = payment.appointment?.doctor_user ?? payment.appointment?.doctor;

    const amount = Number(payment.amount || 0);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-green-400 rounded-t-xl -mt-6 -mx-6 px-6 py-3">
                    <h2 className="text-white text-lg font-semibold">Payment Details</h2>
                </div>

                {/* Content */}
                <div className="mt-4 space-y-3 text-sm text-gray-700">
                    <p>
                        <strong className="text-gray-600">Payment ID:</strong>{' '}
                        {payment.payment_id}
                    </p>
                    <p>
                        <strong className="text-gray-600">Patient:</strong>{' '}
                        {patient
                            ? `${patient.first_name} ${patient.last_name} (${patient.email})`
                            : 'N/A'}
                    </p>
                    <p>
                        <strong className="text-gray-600">Doctor:</strong>{' '}
                        {doctor
                            ? `${doctor.first_name} ${doctor.last_name} (${doctor.email})`
                            : 'N/A'}
                    </p>
                    <p>
                        <strong className="text-gray-600">Amount:</strong>{' '}
                        <span className="font-medium">${amount.toFixed(2)}</span>
                    </p>
                    <p>
                        <strong className="text-gray-600">Method:</strong>{' '}
                        <span
                            className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${methodColors[payment.payment_method] ?? 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            {payment.payment_method}
                        </span>
                    </p>
                    <p>
                        <strong className="text-gray-600">Status:</strong>{' '}
                        <span
                            className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${badgeColors[payment.payment_status] ?? 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            {payment.payment_status ?? 'N/A'}
                        </span>
                    </p>
                    <p>
                        <strong className="text-gray-600">Appointment:</strong>{' '}
                        {payment.appointment
                            ? `#${payment.appointment.appointment_id} on ${formattedDate}`
                            : 'N/A'}
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                        onClick={() => onDelete(payment.payment_id)}
                        disabled={deletingId === payment.payment_id}
                    >
                        {deletingId === payment.payment_id ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsModal;
