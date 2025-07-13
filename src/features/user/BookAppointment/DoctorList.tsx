// features/user/BookAppointment/DoctorList.tsx
import { useEffect, useState } from 'react';
import { getDoctors } from '@/services/doctors';
import { useNavigate } from 'react-router-dom';
import type { SanitizedDoctor } from '@/types/doctor';

const DoctorList = () => {
    const [doctors, setDoctors] = useState<SanitizedDoctor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDoctors().then(setDoctors);
    }, []);

    const handleBook = (doctor: SanitizedDoctor) => {
        navigate('/user/book-appointment', { state: { doctor } });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doctors.map((doc) => (
                <div key={doc.doctor_id} className="border rounded p-4 shadow">
                    <img src={doc.image} alt={doc.name} className="h-32 w-full object-cover rounded mb-2" />
                    <h3 className="text-lg font-semibold">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.specialization}</p>
                    <p className="text-sm">KES {doc.payment_per_hour}</p>
                    <button
                        className="mt-3 bg-teal-600 text-white px-3 py-1 rounded"
                        onClick={() => handleBook(doc)}
                    >
                        Book Appointment
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DoctorList;
