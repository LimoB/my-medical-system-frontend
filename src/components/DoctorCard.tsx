import type { SanitizedDoctor } from '@/types/doctor';
import { CalendarDays, Clock, Wallet } from 'lucide-react';

type DoctorCardProps = {
  doctor: SanitizedDoctor;
  onBook: (doctor: SanitizedDoctor) => void;
  isFullyBookedToday?: boolean;
  notAvailableToday?: boolean;
};

const DoctorCard = ({
  doctor,
  onBook,
  isFullyBookedToday = false,
  notAvailableToday = false,
}: DoctorCardProps) => {
  const {
    name,
    image,
    specialty,
    description,
    available_days,
    available_hours,
    payment_per_hour,
    doctor_id,
  } = doctor;

  const isDisabled = isFullyBookedToday || notAvailableToday;

  const statusMessage = notAvailableToday
    ? 'Not Available Today'
    : isFullyBookedToday
    ? 'Fully Booked Today'
    : 'Book Appointment';

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col items-center text-center px-6 pt-6 pb-8">
      <img
        src={image || '/default-doctor.jpg'}
        alt={`Portrait of Dr. ${name}`}
        loading="lazy"
        className="w-24 h-24 object-cover rounded-full ring-2 ring-white ring-offset-2 ring-offset-teal-500 mb-4 shadow-md transition-transform duration-300 group-hover:scale-105"
      />

      <h3 className="text-lg font-semibold text-teal-700 mb-1">Dr. {name}</h3>

      {specialty && (
        <div className="bg-teal-100 text-teal-700 text-xs font-medium inline-block px-3 py-1 rounded-full mb-2">
          {specialty}
        </div>
      )}

      {description?.trim() && (
        <p className="text-gray-600 text-sm mb-4 max-w-xs">{description}</p>
      )}

      <div className="w-full text-sm text-gray-700 text-left space-y-4">
        {available_days?.trim() && (
          <div className="flex items-start gap-2">
            <CalendarDays className="w-4 h-4 text-teal-500 mt-1" />
            <div>
              <h4 className="font-semibold text-teal-600">Available Days:</h4>
              <p>{available_days}</p>
            </div>
          </div>
        )}

        {Array.isArray(available_hours) && available_hours.length > 0 && (
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-teal-500 mt-1" />
            <div>
              <h4 className="font-semibold text-teal-600">Available Hours:</h4>
              <ul className="list-disc ml-5">
                {available_hours.map((hour) => (
                  <li key={`${doctor_id}-${hour}`}>{hour}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2">
          <Wallet className="w-4 h-4 text-teal-500 mt-1" />
          <div>
            <h4 className="font-semibold text-teal-600">Payment per Hour:</h4>
            <p>KSh {payment_per_hour}</p>
          </div>
        </div>
      </div>

      <button
        className={`mt-6 w-full py-2 px-6 rounded-full font-medium transition duration-300 ${
          isDisabled
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-teal-600 text-white hover:bg-teal-700'
        }`}
        onClick={() => !isDisabled && onBook(doctor)}
        disabled={isDisabled}
        aria-label={`Book appointment with Dr. ${name}`}
      >
        {statusMessage}
      </button>

      {notAvailableToday && (
        <p className="text-red-500 text-xs mt-2">
          This doctor is <strong>not available today</strong>.<br />
          Please check the calendar to book an upcoming available day.
        </p>
      )}

      {isFullyBookedToday && !notAvailableToday && (
        <p className="text-yellow-600 text-xs mt-2">
          This doctor is <strong>fully booked today</strong>.<br />
          Try booking on another day.
        </p>
      )}
    </div>
  );
};

export default DoctorCard;
