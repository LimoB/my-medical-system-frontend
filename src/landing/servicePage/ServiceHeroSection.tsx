// components/ServiceHeroSection.tsx
const ServiceHeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-between px-6 md:px-12"
      style={{ backgroundImage: `url('/hospital.jpg')` }}
    >
      <div className="flex justify-between w-full items-center">
        <div className="w-full md:w-1/2 text-left text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Where Excellence in Healthcare Feels Personal
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            We focus on the smallest details – because they matter most to your health.
          </p>
          <div className="flex justify-start gap-6">
            <button className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition duration-300">
              Get Quote Now
            </button>
            <button className="bg-white text-teal-600 px-8 py-4 rounded-full border-2 border-teal-600 hover:bg-teal-600 hover:text-white transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* You can now remove the booking form here and instead open <BookingModal /> from other places */}
      </div>
    </section>
  );
};

export default ServiceHeroSection;
