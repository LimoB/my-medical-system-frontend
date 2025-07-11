const HelpPage = () => {
  return (
    <div 
      className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center py-16 px-6 md:px-12" 
      style={{ backgroundImage: `url('/national-cancer.jpg')` }} // Background image
    >
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-teal-200">Help & Support</h1>
        <p className="text-lg mb-12 max-w-3xl mx-auto text-teal-100">
          If you need assistance or have any questions, please refer to the information below or contact our support team.
        </p>

        <h2 className="text-xl font-semibold text-teal-100 mb-6">Frequently Asked Questions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-teal-700 mb-3">How can I book an appointment?</h3>
            <p className="text-gray-700">You can book an appointment via our online system or by calling our clinic.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-teal-700 mb-3">What services do you offer?</h3>
            <p className="text-gray-700">We offer a wide range of medical services, including dental, orthopedic, cardiology, and more.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-teal-700 mb-3">How do I contact customer support?</h3>
            <p className="text-gray-700">You can reach our support team by email or phone. Details can be found in the contact section.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-teal-700 mb-3">What are your clinic hours?</h3>
            <p className="text-gray-700">Our clinic operates from 8:00 AM to 6:00 PM Monday to Friday, and 9:00 AM to 2:00 PM on Saturdays.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-teal-700 mb-3">Do you accept insurance?</h3>
            <p className="text-gray-700">Yes, we accept a variety of health insurance plans. Please contact us to verify your insurance details.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-teal-700 mb-3">How can I update my personal details?</h3>
            <p className="text-gray-700">You can update your personal information by logging into your account or by contacting our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
