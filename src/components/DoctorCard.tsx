import type { SanitizedDoctor } from '@/types/doctor';

type DoctorCardProps = {
  doctor: SanitizedDoctor;
  onBook: (doctor: SanitizedDoctor) => void;
};

const DoctorCard = ({ doctor, onBook }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col items-center text-center">
      <img
        src={doctor.image || '/doc3.jpeg'}
        alt={`Portrait of Dr. ${doctor.name}`}
        loading="lazy"
        className="w-24 h-24 object-cover rounded-full mb-4"
      />

      <h3 className="text-teal-600 text-lg font-semibold">{doctor.name}</h3>
      <p className="text-black font-bold text-sm mb-2">{doctor.specialty}</p>

      {doctor.description?.trim() && (
        <p className="text-gray-600 text-sm mb-6">{doctor.description}</p>
      )}

      <div className="w-full text-sm text-gray-700 text-left space-y-3">
        {doctor.available_days?.trim() && (
          <div>
            <h4 className="font-semibold text-teal-600">Available Days:</h4>
            <p>{doctor.available_days}</p>
          </div>
        )}

        {Array.isArray(doctor.available_hours) && doctor.available_hours.length > 0 && (
          <div>
            <h4 className="font-semibold text-teal-600">Available Hours:</h4>
            <ul className="list-disc ml-5">
              {doctor.available_hours.map((hour) => (
                <li key={`${doctor.doctor_id}-${hour}`}>{hour}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-teal-600">Payment per Hour:</h4>
          <p>KSh {doctor.payment_per_hour}</p>
        </div>
      </div>

      <button
        className="mt-6 bg-teal-600 text-white py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300"
        onClick={() => onBook(doctor)}
        aria-label={`Book appointment with Dr. ${doctor.name}`}
      >
        Book Now
      </button>
    </div>
  );
};

export default DoctorCard;
