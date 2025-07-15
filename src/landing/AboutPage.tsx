const AboutPage = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center py-20 px-6 md:px-12"
      style={{ backgroundImage: `url('/Hero/4.jpeg')` }} // Replace with a real clinic background if needed
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content */}
      <div className="relative z-10 text-white max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-200 mb-6">About Harmony Health Clinic</h1>
        <p className="text-lg md:text-xl text-teal-100 mb-10">
          At Harmony Health Clinic, we are committed to delivering compassionate, comprehensive, and innovative medical care tailored to your unique needs. 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left text-gray-200">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">🌿 Our Mission</h2>
            <p>
              To provide high-quality, patient-centered healthcare in a welcoming environment. We aim to promote wellness, prevent illness, and restore health through personalized care and innovation.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">👩‍⚕️ Who We Are</h2>
            <p>
              Harmony Health Clinic is a team of dedicated doctors, nurses, and specialists who bring years of experience, empathy, and professionalism to every patient interaction.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">💡 What Makes Us Different</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>State-of-the-art diagnostic and treatment technology</li>
              <li>Integrated care across multiple specialties</li>
              <li>Patient-first philosophy with personalized treatment plans</li>
              <li>Warm, friendly, and supportive atmosphere</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">🌍 Our Vision</h2>
            <p>
              To be a leading healthcare provider known for clinical excellence, compassionate care, and continuous improvement in health outcomes for our community.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-teal-200 text-lg">
            Learn more about our <a href="/doctors" className="underline hover:text-white">medical team</a> or <a href="/contact" className="underline hover:text-white">get in touch</a> with us today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
