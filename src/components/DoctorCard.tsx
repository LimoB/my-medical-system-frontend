import type { SanitizedDoctor } from '@/types/doctor';
import { CalendarDays, Clock, Wallet } from 'lucide-react';

type DoctorCardProps = {
  doctor: SanitizedDoctor;
  onBook: (doctor: SanitizedDoctor) => void;
};

const DoctorCard = ({ doctor, onBook }: DoctorCardProps) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col items-center text-center px-6 pt-6 pb-8">
      {/* Doctor Image */}
      <img
        src={doctor.image || '/default-doctor.jpg'}
        alt={`Portrait of Dr. ${doctor.name}`}
        loading="lazy"
        className="w-24 h-24 object-cover rounded-full ring-2 ring-white ring-offset-2 ring-offset-teal-500 mb-4 shadow-md transition-transform duration-300 group-hover:scale-105"
      />

      {/* Doctor Name */}
      <h3 className="text-lg font-semibold text-teal-700 mb-1">
        {doctor.name}
      </h3>

      {/* Specialty */}
      {doctor.specialty && (
        <div className="bg-teal-100 text-teal-700 text-xs font-medium inline-block px-3 py-1 rounded-full mb-2">
          {doctor.specialty}
        </div>
      )}

      {/* Description */}
      {doctor.description?.trim() && (
        <p className="text-gray-600 text-sm mb-4 max-w-xs">{doctor.description}</p>
      )}

      <div className="w-full text-sm text-gray-700 text-left space-y-4">
        {/* Available Days */}
        {doctor.available_days?.trim() && (
          <div className="flex items-start gap-2">
            <CalendarDays className="w-4 h-4 text-teal-500 mt-1" />
            <div>
              <h4 className="font-semibold text-teal-600">Available Days:</h4>
              <p>{doctor.available_days}</p>
            </div>
          </div>
        )}

        {/* Available Hours */}
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

        {/* Payment */}
        <div className="flex items-start gap-2">
          <Wallet className="w-4 h-4 text-teal-500 mt-1" />
          <div>
            <h4 className="font-semibold text-teal-600">Payment per Hour:</h4>
            <p>KSh {doctor.payment_per_hour}</p>
          </div>
        </div>
      </div>

      {/* Appointment Button */}
      <button
        className="mt-6 w-full bg-teal-600 text-white py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300 font-medium"
        onClick={() => onBook(doctor)}
        aria-label={`Make appointment with Dr. ${doctor.name}`}
      >
        Make Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
