import { useState, useEffect } from 'react';
import { getDoctors } from '@/services/doctors'; // Import the getDoctors API function
import type { SanitizedDoctor } from '@/types/doctor'; // Import the type for doctor data

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState<SanitizedDoctor[]>([]); // State to hold doctors' data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsData = await getDoctors(); // Fetch doctors from the API
        setDoctors(doctorsData); // Set the fetched data to state
        setLoading(false); // Set loading state to false
      } catch (err) {
        setError('Failed to fetch doctors'); // Handle error if fetching fails
        setLoading(false);
      }
    };

    fetchDoctors(); // Call the function to fetch data on component mount
  }, []); // Empty dependency array to ensure this runs only once when the component mounts

  // If data is loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-teal-700">
          Meet Our Expert Doctors
        </h2>
        <p className="text-gray-600 mb-10 text-lg md:text-xl">
          Our doctors are highly qualified and specialize in different fields of medicine.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doc, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6">
              <img
                src={doc.image || '/doc3.jpeg'} // Fallback image from public if no image is found
                alt={doc.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-teal-600 text-lg font-semibold mb-2">{doc.name}</h3>
              <p className="text-black font-bold text-sm mb-4">{doc.specialty}</p>
              <p className="text-gray-600 text-sm mb-6">{doc.description}</p>

              {/* Available Days */}
              <div className="mb-4">
                <h4 className="text-teal-600 font-semibold">Available Days:</h4>
                <p className="text-gray-600">{doc.available_days}</p>
              </div>

              {/* Available Hours */}
              <div className="mb-4">
                <h4 className="text-teal-600 font-semibold">Available Hours:</h4>
                <ul className="text-gray-600">
                  {doc.available_hours.map((hour: string, index: number) => (
                    <li key={index}>{hour}</li>
                  ))}
                </ul>
              </div>

              {/* Payment per Hour in Kenyan Shillings */}
              <div className="mb-4">
                <h4 className="text-teal-600 font-semibold">Payment per Hour:</h4>
                <p className="text-gray-600">
                  KSh {doc.payment_per_hour} {/* Payment in KES */}
                </p>
              </div>

              {/* Book Now Button */}
              <div className="mt-4">
                <button
                  className="bg-teal-600 text-white py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300"
                  onClick={() => alert('Booking functionality coming soon!')}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
