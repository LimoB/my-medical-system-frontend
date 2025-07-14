import type { SanitizedDoctor } from '@/types/doctor';
import { CalendarDays, Clock, Wallet } from 'lucide-react';

type DoctorCardProps = {
  doctor: SanitizedDoctor;
  onBook: (doctor: SanitizedDoctor) => void;
};

const DoctorCard = ({ doctor, onBook }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200 hover:ring-2 hover:ring-teal-500 transition-all p-6 flex flex-col items-center text-center">
      <img
        src={doctor.image || '/doc3.jpeg'}
        alt={`Portrait of Dr. ${doctor.name}`}
        loading="lazy"
        className="w-24 h-24 object-cover rounded-full mb-4 shadow-sm"
      />

      <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>

      {doctor.specialty && (
        <span className="bg-teal-100 text-teal-700 text-xs font-medium px-3 py-1 rounded-full mt-1 mb-2">
          {doctor.specialty}
        </span>
      )}

      {doctor.description?.trim() && (
        <p className="text-gray-600 text-sm mt-2 mb-4">{doctor.description}</p>
      )}

      <div className="w-full text-sm text-gray-700 text-left space-y-4">
        {doctor.available_days?.trim() && (
          <div className="flex items-start gap-2">
            <CalendarDays className="w-4 h-4 text-teal-500 mt-1" />
            <div>
              <h4 className="font-semibold text-teal-600">Available Days:</h4>
              <p>{doctor.available_days}</p>
            </div>
          </div>
        )}

        {Array.isArray(doctor.available_hours) && doctor.available_hours.length > 0 && (
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-teal-500 mt-1" />
            <div>
              <h4 className="font-semibold text-teal-600">Available Hours:</h4>
              <ul className="list-disc ml-5">
                {doctor.available_hours.map((hour) => (
                  <li key={`${doctor.doctor_id}-${hour}`}>{hour}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2">
          <Wallet className="w-4 h-4 text-teal-500 mt-1" />
          <div>
            <h4 className="font-semibold text-teal-600">Payment per Hour:</h4>
            <p>KSh {doctor.payment_per_hour}</p>
          </div>
        </div>
      </div>

      <button
        className="mt-6 w-full bg-teal-600 text-white py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300 font-medium"
        onClick={() => onBook(doctor)}
        aria-label={`Book appointment with Dr. ${doctor.name}`}
      >
        Book Now
      </button>
    </div>
  );
};

export default DoctorCard;
