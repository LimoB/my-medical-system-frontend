// import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Your Health In <span className="text-teal-600">Harmony</span> – <br className="hidden md:block" />
          Compassionate Care For <span className="text-yellow-500">Brighter Tomorrow</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          At Harmony Health Clinic, we are committed to providing compassionate, personalized medical care
          to advance your well-being. Book virtual or in-person appointments today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
          <button className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700 transition">
            Appointments
          </button>
          <button className="bg-gray-100 text-teal-700 px-6 py-3 rounded hover:bg-gray-200 transition">
            Watch Video
          </button>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 mt-10 lg:mt-0">
        <img
          src="/doc.jpeg"
          alt="Doctor Hero"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </section>
  );
};

export default HeroSection;
